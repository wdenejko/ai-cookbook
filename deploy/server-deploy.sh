#!/usr/bin/env bash
set -Eeuo pipefail

readonly deploy_dir=/root/ai-cookbook/deploy
readonly docker_config_dir=/root/ai-cookbook/.docker-ghcr
readonly image_repository=ghcr.io/wdenejko/ai-cookbook
readonly command_text="${SSH_ORIGINAL_COMMAND:-}"

if [[ ! "$command_text" =~ ^deploy[[:space:]]+([0-9a-f]{40})[[:space:]]+([A-Za-z0-9-]{1,39})$ ]]; then
  echo "Rejected deployment command." >&2
  exit 64
fi

readonly commit_sha="${BASH_REMATCH[1]}"
readonly github_actor="${BASH_REMATCH[2]}"
readonly image_ref="${image_repository}:${commit_sha}"

exec 9>/run/lock/ai-cookbook-deploy.lock
if ! flock -n 9; then
  echo "Another deployment is already running." >&2
  exit 75
fi

install -d -m 0700 "$docker_config_dir"
export DOCKER_CONFIG="$docker_config_dir"
docker login ghcr.io --username "$github_actor" --password-stdin >/dev/null
trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

docker pull "$image_ref"

cd "$deploy_dir"

previous_image_ref=
if [[ -f .env ]]; then
  previous_image_ref="$(sed -n 's/^IMAGE_REF=//p' .env | head -n 1)"
fi

write_image_ref() {
  local value="$1"
  local temporary_file
  temporary_file="$(mktemp "$deploy_dir/.env.XXXXXX")"
  chmod 0600 "$temporary_file"
  printf 'IMAGE_REF=%s\n' "$value" >"$temporary_file"
  mv -f "$temporary_file" "$deploy_dir/.env"
}

write_image_ref "$image_ref"

if ! docker compose up -d --wait --wait-timeout 90; then
  echo "Deployment failed; restoring the previous image." >&2
  if [[ -n "$previous_image_ref" ]]; then
    write_image_ref "$previous_image_ref"
    docker compose up -d --wait --wait-timeout 90
  fi
  exit 1
fi

curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3200/ >/dev/null

if [[ -n "$previous_image_ref" && "$previous_image_ref" != "$image_ref" ]]; then
  printf '%s\n' "$previous_image_ref" >"$deploy_dir/.previous-image"
  chmod 0600 "$deploy_dir/.previous-image"
fi

echo "Deployed ${image_ref}"

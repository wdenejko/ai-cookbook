# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apk add --no-cache libc6-compat

FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://cookbook.denejko.pl
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DEMO_MODE=replay

RUN npm run postinstall && npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]

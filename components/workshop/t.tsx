import { DICT, type MsgKey } from '@/lib/workshop/i18n';

// CSS-toggled translated string, usable in server components. Renders both
// languages; html[data-locale] + CSS shows the active one (see global.css).
export function T({ k }: { k: MsgKey }) {
  return (
    <>
      <span data-lang="en" lang="en">
        {DICT.en[k]}
      </span>
      <span data-lang="pl" lang="pl">
        {DICT.pl[k]}
      </span>
    </>
  );
}

import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/workshops',
        destination: '/docs/chatgpt',
        permanent: true,
      },
      {
        source: '/docs/workshops/chatgpt-3h',
        destination: '/docs/chatgpt',
        permanent: true,
      },
      {
        source: '/docs/workshops/prompt-cards',
        destination: '/docs/chatgpt/prompt-cards',
        permanent: true,
      },
      {
        source: '/docs/workshops/image-generation',
        destination: '/docs/chatgpt/image-generation',
        permanent: true,
      },
      {
        source: '/docs/workshops/participant-checklist',
        destination: '/docs/chatgpt/practice',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);

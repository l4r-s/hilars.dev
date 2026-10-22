const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  output: 'standalone',
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return [
        {
          source: '/_dev/version',  // Deployed commit SHA, polled by CI
          destination: '/api/dev-version',
        },
        {
          source: '/v2e',  // The alias URL
          destination: '/chrome-v2-extension-list',  // The actual page
        },
        {
          source: '/v2el',  // The alias URL
          destination: '/chrome-v2-extension-list-product',  // The actual page
        },
        {
          source: '/v2e1',  // The alias URL
          destination: '/chrome-v2-extension-list',  // The actual page
        },
        {
          source: '/c2e',  // The alias URL used on twitter bio
          destination: '/chrome-v2-extension-list',  // The actual page
        },
        {
          source: '/cv2',  // The alias URL used on twitter bio
          destination: '/chrome-v2-extension-list',  // The actual page
        },
        {
          source: '/blog/how-to-create-custom-short-links-with-referrer-tracking-using-next-js',
          destination: '/blog/how-to-create-custom-short-links-with-referrer-tracking-using-nextjs',
        },
        {
          source: '/blog/my-own-vercel-how-i-deploy-this-websit',
          destination: '/blog/my-own-vercel-how-i-deploy-this-website',
        }
      ]
  },
};

// const withMDX = require('@next/mdx')();
// module.exports = withMDX(nextConfig);
module.exports = nextConfig;
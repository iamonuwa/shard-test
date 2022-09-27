/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    externalDir: true,
  },
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    NEXT_INFURA_IPFS_API_KEY: process.env.NEXT_INFURA_IPFS_API_KEY,
    NEXT_INFURA_IPFS_API_SECRET: process.env.NEXT_INFURA_IPFS_API_SECRET,
    NEXT_CONTRACT_ADDRESS: process.env.NEXT_CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;

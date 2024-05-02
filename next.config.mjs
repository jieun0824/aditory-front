/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
          },
        ],
      },
      // async rewrites() {
      //   return[
      //     {
      //       source: '/:path*',
      //       destination: 'http://localhost:8080/:path*',
      //     }
      //   ]
      // }
};

export default nextConfig;

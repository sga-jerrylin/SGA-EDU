/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/fpa.html",
        destination: "/fpa",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

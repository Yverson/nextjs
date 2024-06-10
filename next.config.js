/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['cdn.pixabay.com'],
    domains: ['efplateforme.s3.eu-west-2.amazonaws.com', 'ef-plateforme.s3.amazonaws.com', 'preef.gaddielsoftware.com'],
},
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

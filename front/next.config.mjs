/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
      domains: ['cdn.intra.42.fr',"images.unsplash.com", "localhost"], // Add your domain here
  },
};


  
export default nextConfig;
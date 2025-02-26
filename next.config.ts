import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "loremflickr.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
  /* config options here */
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*", // Proxy path
//         destination: "https://dztabib.onrender.com/:path*", // Backend API
//       },
//     ];
//   },
// };

// export default nextConfig;

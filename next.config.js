/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf2json"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http://localhost:3000/profile",
        port: "",
        pathname: "../../../public/**",
      },
    ],
  },
};

module.exports = nextConfig;
// // const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     // …
//     serverComponentsExternalPackages: ['@react-pdf/renderer'],
//   },
//   webpack: (config, { webpack }) => {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true,
//     };
//     config.externals.push({
//       sharp: "commonjs sharp",
//       canvas: "commonjs canvas",
//     });
//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         Buffer: ["buffer", "Buffer"],
//         process: "process/browser",
//       })
//     );
//     return config;
//   },
// };
// module.exports = nextConfig

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects.html", destination: "/work", permanent: true },
      { source: "/side-projects", destination: "/work", permanent: true },
      { source: "/side-projects.html", destination: "/work", permanent: true },
      { source: "/cnc", destination: "/cladding", permanent: true },
      { source: "/cnc.html", destination: "/cladding", permanent: true },
      { source: "/cnc-production", destination: "/cladding", permanent: true },
    ];
  },
};

export default nextConfig;
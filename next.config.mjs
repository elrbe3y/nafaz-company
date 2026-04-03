/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
	},
	experimental: {
		optimizePackageImports: ["react-icons"],
	},
};

export default nextConfig;

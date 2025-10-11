/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
		unoptimized: false,
	},
	env: {
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
	},
	// Enable webpack 5 features
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		};
		return config;
	},
};

module.exports = nextConfig;

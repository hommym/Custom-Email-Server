/** @type {import('next').NextConfig} */

module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8000/api/:path*", // Replace with your backend API URL
			},
		];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	images: {
		domains: ["res.cloudinary.com", "procvcreator.s3.eu-north-1.amazonaws.com"],
	},
};

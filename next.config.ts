import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["@node-rs/argon2"],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // منع تحميل الحزمة في المتصفح
            config.resolve.alias = {
                ...config.resolve.alias,
                '@node-rs/argon2': false,
            };
        }
        
        return config;
    },
};

export default nextConfig;
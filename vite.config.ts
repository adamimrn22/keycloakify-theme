import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

import viteTsConfigPaths from "vite-tsconfig-paths";
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            accountThemeImplementation: "none",
            // startKeycloakOptions: {
            //     port: 8081
            // }
        }),
        viteTsConfigPaths({
            projects: ["./tsconfig.json"]
        })
    ]
});

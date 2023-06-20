import { defineConfig } from "vite";
import mkcert from 'vite-plugin-mkcert'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	define: {
    "process.env": process.env,
		// By default, Vite doesn't include shims for NodeJS/
		// necessary for segment analytics lib to work
		global: {},
	},
	resolve: {
		alias: {
			"node-fetch": "isomorphic-fetch",
		},
	},
	plugins: [react(), !process.env.CODESANDBOX_HOST && mkcert()],
});

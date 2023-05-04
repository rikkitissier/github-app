import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

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
	plugins: [react(), !process.env.CODESANDBOX_HOST && basicSsl()],
});

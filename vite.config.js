import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import VueRouter from "unplugin-vue-router/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"
import UnoCSS from "unocss/vite"
import postcssPresetEnv from "postcss-preset-env"

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "")
	// console.log(env)
	return {
		base: "./",
		server: {
			port: env.VITE_PORT || 3005,
			host: true,
			proxy: {
				// 请求代理配置
				"/api": {
					target: env.VITE_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		build: {
			outDir: "dist",
			assetsDir: "assets",
			sourcemap: env.NODE_ENV === "development",
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
			cssCodeSplit: true,
			chunkSizeWarningLimit: 1500,
		},
		plugins: [
			vue(),
			UnoCSS(),
			AutoImport({
				imports: ["vue", VueRouterAutoImports, "pinia", "@vueuse/core"],
				dts: "src/auto-imports.d.ts",
				eslintrc: {
					enabled: true,
				},
				resolvers: [ElementPlusResolver()],
				vueTemplate: true,
			}),
			Components({
				dirs: ["src/components"],
				extensions: ["vue"],
				deep: true, // 搜索子目录
				resolvers: [ElementPlusResolver()], // 解析器
				dts: "src/components.d.ts",
				directoryAsNamespace: true,
			}),
			VueRouter({
				importMode: "async",
				routesFolder: "src/pages",
				extensions: [".vue"],
				dts: "src/router.d.ts",
			}),
			vueDevTools(),
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/variables.scss" as *;`,
				},
			},
			postcss: {
				plugins: [
					postcssPresetEnv({
						stage: 3,
					}),
				],
			},
		},
	}
})

import "@unocss/reset/normalize.css"
import "element-plus/dist/index.css"
import "./styles/main.scss"
import "virtual:uno.css"

import { createApp } from "vue"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import store from "./stores"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

// Register all Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(ElementPlus)
app.use(store)
app.use(router)

// Add a simple directive for copying text to clipboard
app.directive("copyText", {
	mounted(el, binding) {
		el.addEventListener("click", () => {
			const input = document.createElement("textarea")
			input.value = binding.value
			document.body.appendChild(input)
			input.select()
			document.execCommand("copy")
			document.body.removeChild(input)
			ElementPlus.ElMessage.success("已复制到剪贴板")
		})
	},
})

app.mount("#app")

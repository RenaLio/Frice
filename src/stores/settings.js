import { ref } from "vue"
import { defineStore } from "pinia"

export const useSettingsStore = defineStore(
	"settings",
	() => {
		// 是否启用本地存储
		const enableLocalStorage = ref(true)

		// 默认并发数量
		const concurrencyLimit = ref(5)

		// 主题颜色
		const themeColor = ref("#67c23a") // 默认绿色

		return {
			enableLocalStorage,
			concurrencyLimit,
			themeColor,
		}
	},
	{
		persist: true, // 启用持久化存储
	},
)

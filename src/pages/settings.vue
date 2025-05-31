<script setup>
import { ref, onMounted } from "vue"
import { ElNotification } from "element-plus"
import { useSettingsStore } from "../stores/settings"
import { Setting, InfoFilled } from "@element-plus/icons-vue"

defineOptions({
	name: "Settings",
	meta: {
		title: "设置",
	},
})

const settingsStore = useSettingsStore()

// 创建本地响应式副本，以便在保存前可以进行修改
const enableLocalStorage = ref(settingsStore.enableLocalStorage)
const concurrencyLimit = ref(settingsStore.concurrencyLimit)
const themeColor = ref(settingsStore.themeColor)

// 应用设置
const applySettings = () => {
	settingsStore.enableLocalStorage = enableLocalStorage.value
	settingsStore.concurrencyLimit = concurrencyLimit.value
	settingsStore.themeColor = themeColor.value

	ElNotification({
		title: "成功",
		message: "设置已保存",
		type: "success",
		duration: 2000,
	})
}

// 重置设置
const resetSettings = () => {
	enableLocalStorage.value = true
	concurrencyLimit.value = 5
	themeColor.value = "#67c23a"
}

// 颜色预设
const colorPresets = [
	{ name: "绿色", value: "#67c23a" },
	{ name: "蓝色", value: "#1677ff" },
	{ name: "紫色", value: "#722ed1" },
	{ name: "橙色", value: "#f56c6c" },
	{ name: "靛蓝", value: "#2c3e50" },
]
</script>

<template>
	<div class="max-w-800px mx-auto">
		<!-- 页面标题 -->
		<div class="text-center mb-30px">
			<h1 class="text-28px font-600 text-gray-800 mb-10px">设置</h1>
			<p class="text-16px text-gray-600 max-w-600px mx-auto">自定义应用程序的行为和外观</p>
		</div>

		<div class="bg-white rounded-12px shadow-sm border border-gray-100 p-24px mb-24px">
			<!-- 存储设置 -->
			<div class="mb-24px">
				<div class="flex items-center mb-16px">
					<span class="text-20px mr-10px">💾</span>
					<h2 class="text-18px font-500 text-gray-800">存储设置</h2>
				</div>

				<div class="pl-8px">
					<el-switch
						v-model="enableLocalStorage"
						active-text="启用本地存储"
						inactive-text="禁用本地存储"
						class="mb-10px" />

					<div class="flex items-start mt-12px">
						<el-icon class="mt-3px mr-5px text-14px text-blue-500"><InfoFilled /></el-icon>
						<p class="text-13px text-gray-500">
							开启本地存储后，您的API密钥等数据将被保存在浏览器中，便于下次使用。禁用后将不保存任何数据。
						</p>
					</div>
				</div>
			</div>

			<!-- 性能设置 -->
			<div class="mb-24px">
				<div class="flex items-center mb-16px">
					<span class="text-20px mr-10px">⚡</span>
					<h2 class="text-18px font-500 text-gray-800">性能设置</h2>
				</div>

				<div class="pl-8px">
					<div class="mb-16px">
						<div class="text-14px text-gray-700 mb-10px">并发请求数量</div>
						<div class="flex items-center gap-16px">
							<el-slider
								v-model="concurrencyLimit"
								:min="1"
								:max="32"
								:step="1"
								:show-tooltip="true"
								class="w-200px" />
							<div class="text-14px text-gray-600">
								<span class="text-blue-500 font-bold">{{ concurrencyLimit }}</span> 个请求/次
							</div>
						</div>
						<div class="flex items-start mt-8px">
							<el-icon class="mt-3px mr-5px text-14px text-blue-500"><InfoFilled /></el-icon>
							<p class="text-13px text-gray-500">
								设置API密钥检测等功能的并发请求数量。较高的值可能会提高检测速度，但也可能导致请求被限制。
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 主题设置 -->
			<div class="mb-24px">
				<div class="flex items-center mb-16px">
					<span class="text-20px mr-10px">🎨</span>
					<h2 class="text-18px font-500 text-gray-800">主题设置</h2>
				</div>

				<div class="pl-8px">
					<div class="mb-16px">
						<div class="text-14px text-gray-700 mb-10px">主题颜色</div>
						<div class="flex gap-10px mb-10px">
							<div
								v-for="color in colorPresets"
								:key="color.value"
								class="w-30px h-30px rounded-full cursor-pointer color-preset"
								:class="{ 'color-preset-active': themeColor === color.value }"
								:style="{ backgroundColor: color.value }"
								@click="themeColor = color.value"></div>
							<el-color-picker v-model="themeColor" size="small" />
						</div>
					</div>
				</div>
			</div>

			<!-- 操作按钮 -->
			<div class="flex gap-12px justify-end mt-24px">
				<button
					class="px-16px h-36px bg-gray-100 text-gray-600 border-none rounded-6px text-14px font-500 cursor-pointer transition-colors hover:bg-gray-200"
					@click="resetSettings">
					重置默认
				</button>
				<button
					class="px-16px h-36px bg-blue-500 text-white border-none rounded-6px text-14px font-500 cursor-pointer transition-colors hover:bg-blue-600"
					@click="applySettings">
					保存设置
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.color-preset {
	transition: all 0.2s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	border: 2px solid transparent;
}

.color-preset:hover {
	transform: scale(1.1);
}

.color-preset-active {
	border: 2px solid white;
	box-shadow: 0 0 0 2px #666;
}
</style>

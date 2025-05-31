<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { ElNotification } from "element-plus"
import { checkFalApiKey, maskApiKey } from "@/api/falKeyService"
import HcStatus from "@/components/hc/Status.vue"
import { useSettingsStore } from "@/stores/settings"
import {
	Search,
	CircleCheck,
	Warning,
	InfoFilled,
	List,
	Check,
	Close,
	Sort,
	Document,
	Upload,
	CopyDocument,
	DocumentCopy,
	Loading,
} from "@element-plus/icons-vue"
import { useClipboard } from "@vueuse/core"
import pLimit from "p-limit"
import { exportCsv } from "@/utils/cvs"

// 剪贴板
const { copy, copied, isSupported } = useClipboard()

// 从设置中获取并发数量和是否启用本地存储
const settingsStore = useSettingsStore()

defineOptions({
	name: "ApiBalanceChecker",
	meta: {
		title: "Fal 密钥检测",
		parent: "工具集",
	},
})

// 文本框中的API密钥
const apiKeysText = ref("")
// 加载状态
const loading = ref(false)
// 查询结果
const results = ref([])
// 是否显示示例
const showExample = ref(false)
// 当前激活的过滤标签
const activeTab = ref("all")

const numOfKeysInText = computed(() => {
	let list = apiKeysText.value.split("\n")
	list = list.filter((itm) => itm.trim() !== "")
	let sets = new Set(list)
	return sets.size
})

// 示例数据
const exampleText = `userId123:userKey123
userId456:userKey456
userId789:userKey789`

// 从剪贴板粘贴内容
const pasteFromClipboard = async () => {
	try {
		const text = await navigator.clipboard.readText()
		if (text) {
			apiKeysText.value = text
			ElNotification({
				title: "提示",
				message: "已从剪贴板粘贴内容",
				type: "success",
				duration: 1500,
			})
		} else {
			ElNotification({
				title: "提示",
				message: "剪贴板为空",
				type: "warning",
				duration: 1500,
			})
		}
	} catch (error) {
		console.log(error)
		ElNotification({
			title: "提示",
			message: "无法访问剪贴板，请检查浏览器权限",
			type: "error",
			duration: 1500,
		})
	}
}

// 使用示例数据
const useExample = () => {
	apiKeysText.value = exampleText
	showExample.value = false
}

// 进度相关
const progress = ref(0)
const totalKeys = ref(0)
const completedKeys = ref(0)
const showProgress = ref(false)

// 进度条颜色
const progressBarColor = computed(() => {
	if (progress.value < 30) return "#409eff"
	if (progress.value < 70) return "#67c23a"
	return "#67c23a"
})

// 开始查询
const startCheck = async () => {
	if (!apiKeysText.value.trim()) {
		ElNotification({
			title: "提示",
			message: "请输入API密钥",
			type: "warning",
			duration: 3000,
		})
		return
	}

	loading.value = true
	try {
		// 从文本中提取API密钥
		const keys = extractApiKeys(apiKeysText.value)

		if (keys.length === 0) {
			ElNotification({
				title: "提示",
				message: "未找到有效的API密钥",
				type: "warning",
				duration: 3000,
			})
			loading.value = false
			return
		}

		// 重置进度
		totalKeys.value = keys.length
		completedKeys.value = 0
		progress.value = 0
		showProgress.value = true
		results.value = []

		// 直接创建limit实例，使用设置中的并发数量
		const limit = pLimit(settingsStore.concurrencyLimit)

		// 创建任务列表
		const tasks = keys.map((key) => {
			// 返回promise而不是调用limit
			return limit(async () => {
				try {
					const result = await checkFalApiKey(key)
					completedKeys.value++
					progress.value = Math.floor((completedKeys.value / totalKeys.value) * 100)
					return { key, maskedKey: maskApiKey(key), ...result }
				} catch (error) {
					completedKeys.value++
					progress.value = Math.floor((completedKeys.value / totalKeys.value) * 100)
					return {
						key,
						maskedKey: maskApiKey(key),
						success: false,
						status: -1,
						message: error.message || "未知错误",
					}
				}
			})
		})

		// 并发执行所有任务
		results.value = await Promise.all(tasks)
		activeTab.value = "all" // 重置到全部标签
		currentPage.value = 1 // 重置分页

		ElNotification({
			title: "成功",
			message: `成功测试 ${results.value.length} 个API密钥`,
			type: "success",
			duration: 3000,
		})

		// 如果启用了本地存储，则保存结果
		if (settingsStore.enableLocalStorage) {
			localStorage.setItem("fal-api-keys-text", apiKeysText.value)
			localStorage.setItem("fal-api-keys-results", JSON.stringify(results.value))
		}

		// 滚动到结果区域
		setTimeout(() => {
			document
				.querySelector(".result-section")
				?.scrollIntoView({ behavior: "smooth", block: "start" })
		}, 100)
	} catch (error) {
		ElNotification({
			title: "错误",
			message: `查询失败: ${error.message}`,
			type: "error",
			duration: 3000,
		})
	} finally {
		loading.value = false
		showProgress.value = false
	}
}

// 从文本中提取API密钥
const extractApiKeys = (text) => {
	let list = text.split("\n")
	let res = []
	for (const itm of list) {
		if (itm.trim() === "") continue
		res.push(itm.trim())
	}
	return [...new Set(res)] // 去重
}

// 统计数据
const statistics = computed(() => {
	if (!results.value.length) return null

	const total = results.value.length
	const success = results.value.filter((r) => r.success).length
	const failed = total - success
	const errorCount = results.value.filter((r) => r.status === -1).length

	return {
		total,
		success,
		failed,
		errorCount,
	}
})

// 根据激活的标签过滤结果
const filteredResults = computed(() => {
	if (activeTab.value === "all") return results.value
	if (activeTab.value === "valid") return results.value.filter((r) => r.success)
	if (activeTab.value === "invalid") return results.value.filter((r) => !r.success)
	return results.value
})

// 复制API密钥
const copyToClipboard = (text) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			ElNotification({
				title: "成功",
				message: "已复制到剪贴板",
				type: "success",
				duration: 1500,
			})
		})
		.catch(() => {
			ElNotification({
				title: "错误",
				message: "复制失败",
				type: "error",
				duration: 1500,
			})
		})
}

// 导出CSV
const exportCSV = () => {
	if (!results.value.length) return

	const header = ["密钥ID", "状态码", "状态", "信息"]
	const data = [
		header,
		...results.value.map((item) => [
			item.key,
			item.status,
			item.success ? "成功" : "失败",
			item.success ? "API密钥有效" : item.message.replace(/,/g, ";"),
		]),
	]
	exportCsv(data, `fal-api-keys-${new Date().toISOString().slice(0, 10)}.csv`)
}

const desc = ref(false)
// 按返回码排序
const sortByStatusCode = () => {
	desc.value = !desc.value
	results.value = [...results.value].sort((a, b) =>
		desc.value ? b.status - a.status : a.status - b.status,
	)
	currentPage.value = 1
}

const statusMap = new Map([
	["all", ""],
	["valid", "有效"],
	["invalid", "无效"],
])

const copyFunc = async (splitType) => {
	if (!results.value.length) return

	let char = splitType === "comma" ? "," : "\n"
	let label = statusMap.get(activeTab.value)

	const content = filteredResults.value.map((item) => item.key).join(char)

	if (isSupported.value) {
		try {
			console.log("use vue use clipboard")
			await copy(content)
			ElNotification({
				title: "成功",
				message: `已复制所有${label}密钥数据`,
				type: "success",
				duration: 1500,
			})
		} catch (error) {
			ElNotification({
				title: "错误",
				message: "复制失败",
				type: "error",
				duration: 1500,
			})
		}
		return
	}
	ElNotification({
		title: "错误",
		message: "浏览器不支持复制",
		type: "error",
		duration: 1500,
	})
}

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)

// 根据分页和过滤标签获取结果
const paginatedResults = computed(() => {
	const startIndex = (currentPage.value - 1) * pageSize.value
	const endIndex = startIndex + pageSize.value
	return filteredResults.value.slice(startIndex, endIndex)
})

// 总条目数
const totalItems = computed(() => filteredResults.value.length)

// 页面变化处理
const handleCurrentChange = (val) => {
	currentPage.value = val
}

// 屏幕宽度响应式
const isSmallScreen = ref(false)

// 检查屏幕宽度
const checkScreenSize = () => {
	isSmallScreen.value = window.innerWidth < 640
}

// 组件挂载时添加窗口大小监听
onMounted(() => {
	checkScreenSize()
	window.addEventListener("resize", checkScreenSize)

	// 从localStorage加载API密钥，如果启用了本地存储
	if (settingsStore.enableLocalStorage) {
		const savedApiKeys = localStorage.getItem("fal-api-keys-text")
		if (savedApiKeys) {
			apiKeysText.value = savedApiKeys
		}

		// 加载保存的结果
		const savedResults = localStorage.getItem("fal-api-keys-results")
		if (savedResults) {
			try {
				results.value = JSON.parse(savedResults)
				if (results.value.length > 0) {
					// 如果有结果，显示提示
					ElNotification({
						title: "提示",
						message: "已加载上次保存的检测结果",
						type: "info",
						duration: 3000,
					})
				}
			} catch (error) {
				console.error("Failed to parse saved results", error)
			}
		}
	}
})

// 组件卸载时移除监听
onUnmounted(() => {
	window.removeEventListener("resize", checkScreenSize)
})
</script>

<template>
	<div class="max-w-1000px mx-auto">
		<!-- 页面标题 -->
		<div class="text-center mb-30px">
			<h1 class="text-28px font-600 text-gray-800 mb-10px">Fal 密钥检测</h1>
			<p class="text-16px text-gray-600 max-w-600px mx-auto">快速检测多个Fal API密钥的有效性</p>
		</div>

		<div class="flex flex-col gap-24px">
			<!-- 输入区域卡片 -->
			<div class="bg-white rounded-12px shadow-sm border border-gray-100 p-24px">
				<!-- 密钥输入区域 -->
				<div class="mb-20px">
					<div class="flex items-center mb-16px">
						<span class="text-20px mr-10px">🔑</span>
						<h2 class="text-18px font-500 text-gray-800 flex-1">输入API密钥</h2>
						<button
							class="text-blue-500 text-14px border-none bg-transparent cursor-pointer hover:text-blue-600 hover:underline"
							@click="showExample = !showExample">
							{{ showExample ? "隐藏示例" : "查看示例" }}
						</button>
					</div>

					<div
						v-if="showExample"
						class="bg-gray-50 border border-gray-200 rounded-8px p-16px mb-16px">
						<div class="text-14px text-gray-600">
							<p class="mb-10px">粘贴包含API密钥的文本，每行一个密钥。例如：</p>
							<pre class="bg-gray-100 p-10px rounded-4px overflow-x-auto font-mono mb-10px">{{
								exampleText
							}}</pre>
							<div class="flex justify-end mt-10px">
								<button
									class="text-blue-500 text-14px border-none bg-transparent cursor-pointer hover:text-blue-600 hover:underline"
									@click="useExample">
									使用此示例
								</button>
							</div>
						</div>
					</div>

					<div class="mb-10px relative">
						<textarea
							v-model="apiKeysText"
							class="w-full min-h-140px p-14px border border-gray-300 rounded-8px text-14px font-mono transition-all focus:(outline-none border-blue-500 shadow-outline)"
							placeholder="粘贴多个Fal API密钥，每行一个..."></textarea>

						<div class="absolute top-6px right-10px flex gap-8px">
							<el-tooltip content="从剪贴板粘贴" placement="top" effect="light">
								<el-button
									type="info"
									size="small"
									class="paste-button"
									@click="pasteFromClipboard">
									<el-icon><DocumentCopy /></el-icon>
								</el-button>
							</el-tooltip>
						</div>
					</div>

					<div class="flex items-center text-13px text-gray-500 mt-8px">
						<el-icon class="mr-5px text-14px text-blue-500"><InfoFilled /></el-icon>
						<span>每行输入一个API密钥，系统会自动处理空行、重复key</span>
					</div>
				</div>

				<!-- 并发信息提示 -->
				<div class="mb-20px bg-gray-50 p-12px rounded-8px">
					<div class="flex items-center text-14px text-gray-700">
						<el-icon class="mr-8px text-blue-500"><InfoFilled /></el-icon>
						<span
							>当前并发检测数量:
							<strong class="text-blue-500">{{ settingsStore.concurrencyLimit }}</strong> 个请求/次
							(可在 <a href="/settings" class="text-blue-500 hover:underline">设置</a> 中修改)</span
						>
					</div>
				</div>

				<!-- 进度显示 -->
				<div
					v-if="showProgress"
					class="bg-blue-50 rounded-8px p-y-16px p-x-20px mb-20px border border-blue-100">
					<div class="flex items-center justify-between mb-10px">
						<div class="text-14px text-blue-500 font-500 flex items-center">
							<el-icon class="text-18px mr-10px"><Loading class="animate-spin" /></el-icon>
							<span>正在检测 {{ completedKeys }}/{{ totalKeys }} 个API密钥</span>
						</div>
						<div class="text-14px text-blue-500 font-500">{{ progress }}%</div>
					</div>
					<el-progress
						:percentage="progress"
						:stroke-width="8"
						:show-text="false"
						:color="progressBarColor"
						class="progress-bar"
						status="success">
					</el-progress>
				</div>

				<!-- 搜索状态条 -->
				<div
					v-if="numOfKeysInText > 0 && !showProgress"
					class="flex items-center bg-blue-50 rounded-8px p-y-10px p-x-16px mb-20px border border-blue-100">
					<el-icon class="text-18px text-blue-500 mr-10px"><Search /></el-icon>
					<div class="text-14px text-blue-500 font-500">
						检测到 {{ numOfKeysInText }} 个API密钥, 已过滤重复和空行
					</div>
				</div>

				<!-- 查询按钮 -->
				<div class="flex justify-center mt-20px">
					<button
						class="w-full h-48px bg-blue-500 text-white border-none rounded-6px text-16px font-500 cursor-pointer flex items-center justify-center transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
						:class="{ 'opacity-80': loading }"
						@click="startCheck"
						:disabled="loading">
						<el-icon class="mr-8px"><Search /></el-icon>
						{{ loading ? "检测中..." : "开始检测" }}
					</button>
				</div>
			</div>

			<!-- 统计卡片 -->
			<div v-if="results.length > 0" class="bg-transparent">
				<div class="stats-container" v-if="statistics">
					<div
						class="bg-white stat-card rounded-12px shadow-sm border border-gray-100 p-24px flex items-center flex-1">
						<div class="bg-blue-50 text-blue-500 w-12 h-12 flex-center rounded-sm mx-6 box-border">
							<el-icon class="text-16 font-extrabold"><Search /></el-icon>
						</div>
						<div class="h-14 text-start">
							<div class="text-24px font-600 text-blue-500">{{ statistics.total }}</div>
							<div class="text-15px opacity-90 text-gray-500">总查询数</div>
						</div>
					</div>
					<div
						class="bg-white stat-card rounded-12px shadow-sm border border-gray-100 p-24px flex items-center flex-1">
						<div
							class="bg-green-50 text-green-500 w-12 h-12 flex-center rounded-sm mx-6 box-border">
							<el-icon class="text-16 font-extrabold"><CircleCheck /></el-icon>
						</div>
						<div class="h-14 text-start">
							<div class="text-24px font-600 text-green-500">{{ statistics.success }}</div>
							<div class="text-15px opacity-90 text-gray-500">有效密钥</div>
						</div>
					</div>
					<div
						class="bg-white stat-card rounded-12px shadow-sm border border-gray-100 p-24px flex items-center flex-1">
						<div
							class="bg-orange-50 text-orange-500 w-12 h-12 flex-center rounded-sm mx-6 box-border">
							<el-icon class="text-16 font-extrabold"><Warning /></el-icon>
						</div>
						<div class="h-14 text-start">
							<div class="text-24px font-600 text-orange-500">{{ statistics.errorCount }}</div>
							<div class="text-15px opacity-90 text-gray-500">检测失败</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 结果展示 -->
			<div
				v-if="results.length > 0"
				class="bg-white rounded-12px shadow-sm border border-gray-100 p-24px">
				<!-- 标签页和操作区 -->
				<div class="flex justify-between items-center mb-20px flex-wrap gap-16px">
					<div class="flex border-b border-gray-200">
						<div
							class="tab-item"
							:class="{ 'active-tab': activeTab === 'all' }"
							@click="
								() => {
									activeTab = 'all'
									currentPage = 1
								}
							">
							<el-icon class="text-16px"><List /></el-icon>
							<span>全部密钥</span>
							<span
								class="tab-count bg-gray-100 rounded-10px p-x-8px p-y-2px text-12px text-gray-600"
								:class="{ 'bg-blue-100 text-blue-500': activeTab === 'all' }">
								{{ statistics?.total || 0 }}
							</span>
						</div>
						<div
							class="tab-item"
							:class="{ 'active-tab': activeTab === 'valid' }"
							@click="
								() => {
									activeTab = 'valid'
									currentPage = 1
								}
							">
							<el-icon class="text-16px"><Check /></el-icon>
							<span>有效密钥</span>
							<span
								class="tab-count bg-gray-100 rounded-10px p-x-8px p-y-2px text-12px text-gray-600"
								:class="{ 'bg-blue-100 text-blue-500': activeTab === 'valid' }">
								{{ statistics?.success || 0 }}
							</span>
						</div>
						<div
							class="tab-item"
							:class="{ 'active-tab': activeTab === 'invalid' }"
							@click="
								() => {
									activeTab = 'invalid'
									currentPage = 1
								}
							">
							<el-icon class="text-16px"><Close /></el-icon>
							<span>无效密钥</span>
							<span
								class="tab-count bg-gray-100 rounded-10px p-x-8px p-y-2px text-12px text-gray-600"
								:class="{ 'bg-blue-100 text-blue-500': activeTab === 'invalid' }">
								{{ statistics?.failed || 0 }}
							</span>
						</div>
					</div>
					<div class="flex gap-8px flex-wrap">
						<button class="action-btn" @click="sortByStatusCode">
							<el-icon class="text-14px"><Sort /></el-icon>
							<span>按状态排序</span>
						</button>
						<button class="action-btn" @click="copyFunc('comma')">
							<el-icon class="text-14px"><Document /></el-icon>
							<span>逗号分隔复制</span>
						</button>
						<button class="action-btn" @click="copyFunc('line')">
							<el-icon class="text-14px"><Document /></el-icon>
							<span>按行分隔复制</span>
						</button>
						<button class="action-btn" @click="exportCSV">
							<el-icon class="text-14px"><Upload /></el-icon>
							<span>导出CSV</span>
						</button>
					</div>
				</div>

				<!-- 结果表格 -->
				<el-table :data="paginatedResults" style="width: 100%">
					<el-table-column label="密钥ID" min-width="180">
						<template #default="scope">
							<div class="flex items-center justify-between group">
								<span class="font-mono text-gray-800">{{ scope.row.maskedKey }}</span>
								<button
									class="border-none bg-transparent text-blue-500 cursor-pointer transition-opacity opacity-0 hover:text-blue-600 group-hover:opacity-100"
									@click="copyToClipboard(scope.row.key)">
									<el-icon><CopyDocument /></el-icon>
								</button>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="状态码" width="100" align="center">
						<template #default="scope">
							<HcStatus :color="scope.row.success ? 'green' : 'red'" class="pr-2" />
							<span class="font-mono">{{ scope.row.status }}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" width="100" align="center">
						<template #default="scope">
							<el-tooltip
								:content="scope.row.message"
								placement="top"
								effect="light"
								:disabled="scope.row.success">
								<div class="flex items-center gap-6px justify-center">
									<el-tag type="success" v-if="scope.row.success" class="text-13px font-bold">
										<div class="text-13px font-bold">成功</div>
									</el-tag>
									<el-tag type="danger" v-else>
										<div class="text-13px font-bold">失败</div>
									</el-tag>
								</div>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页组件 -->
				<div class="flex justify-center mt-24px">
					<el-pagination
						v-if="totalItems > pageSize"
						background
						layout="total, prev, pager, next, jumper"
						:total="totalItems"
						:page-size="pageSize"
						:current-page="currentPage"
						@current-change="handleCurrentChange"
						:small="isSmallScreen"
						class="pagination-container">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.shadow-outline {
	box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.1);
}

.progress-bar {
	:deep(.el-progress-bar__inner) {
		transition:
			width 0.3s ease,
			background-color 0.5s ease;
	}
}

.stats-container {
	display: flex;
	gap: 22px;
	margin-bottom: 16px;
}

.stat-card {
	flex: 1;
	padding: 16px;
	display: flex;
	// flex-direction: column;
	align-items: center;
	// justify-content: center;
	text-align: center;
	border-radius: 8px;

	.stat-icon-container {
		margin-bottom: 8px;
	}
}

.tab-item {
	padding: 8px 16px;
	cursor: pointer;
	font-size: 14px;
	color: #606266;
	display: flex;
	align-items: center;
	gap: 6px;
	border-bottom: 2px solid transparent;
	transition: all 0.3s;

	&:hover {
		color: #1677ff;
	}

	&.active-tab {
		color: #1677ff;
		border-bottom-color: #1677ff;
	}
}

.action-btn {
	display: flex;
	align-items: center;
	gap: 4px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	padding: 6px 12px;
	font-size: 13px;
	color: #606266;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		color: #1677ff;
		border-color: #1677ff;
		background-color: #f0f5ff;
	}
}

.paste-button {
	opacity: 0.8;
	transition: all 0.2s;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

	&:hover {
		opacity: 1;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}
}

.pagination-container {
	:deep(.el-pagination) {
		justify-content: center;
		margin-top: 10px;
	}
}

@media (max-width: 768px) {
	.stats-container {
		grid-template-columns: repeat(2, 1fr);
	}

	:deep(.el-pagination) {
		.el-pager li {
			min-width: 28px;
		}
	}
}

@media (max-width: 480px) {
	:deep(.el-pagination) {
		.el-pager li {
			min-width: 24px;
			margin: 0 2px;
		}
	}
}
</style>

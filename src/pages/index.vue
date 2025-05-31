<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchQuery = ref("")

const allTools = [
	{
		id: 1,
		name: "Fal 密钥检测",
		icon: "Key",
		description: "快速检测多个Fal API密钥的有效性",
		path: "/tools/api-key-checker",
		badge: "热门",
		tags: ["API", "密钥", "检测"],
	},
	{
		id: 2,
		name: "API密钥验证工具",
		icon: "Key",
		description: "验证您的API密钥是否有效并检查使用权限",
		path: "/tools/api-key-checker",
		badge: "即将推出",
		tags: ["API", "验证", "密钥"],
	},
	{
		id: 3,
		name: "使用量统计分析",
		icon: "DataLine",
		description: "分析API使用情况，优化资源配置与成本",
		path: "/tools/api-key-checker",
		badge: "即将推出",
		tags: ["统计", "分析", "使用量"],
	},
	{
		id: 4,
		name: "开发者助手",
		icon: "UserFilled",
		description: "常用开发工具集合，提高开发效率",
		path: "/tools/api-key-checker",
		badge: "即将推出",
		tags: ["开发", "工具", "助手"],
	},
	{
		id: 5,
		name: "数据转换工具",
		icon: "Operation",
		description: "JSON、CSV、XML等格式相互转换",
		path: "/tools/api-key-checker",
		badge: "即将推出",
		tags: ["数据", "转换", "格式"],
	},
	{
		id: 6,
		name: "字符串处理工具",
		icon: "EditPen",
		description: "编码解码、加密解密、格式化等功能",
		path: "/tools/api-key-checker",
		badge: "即将推出",
		tags: ["字符串", "编码", "加密"],
	},
]

// 过滤工具列表
const filteredTools = computed(() => {
	if (!searchQuery.value) {
		return allTools
	}

	const query = searchQuery.value.toLowerCase()
	return allTools.filter((tool) => {
		return (
			tool.name.toLowerCase().includes(query) ||
			tool.description.toLowerCase().includes(query) ||
			tool.tags.some((tag) => tag.toLowerCase().includes(query))
		)
	})
})

const navigateTo = (path) => {
	router.push(path)
}

// 清空搜索框
const clearSearch = () => {
	searchQuery.value = ""
}

defineOptions({
	name: "HomePage",
	meta: {
		title: "首页",
	},
})
</script>

<template>
	<div class="home-container">
		<!-- 搜索区域 -->
		<div class="search-section">
			<h1 class="search-title">Frice <span class="accent">多功能工具箱</span></h1>
			<p class="search-subtitle">提供多种实用工具，免费使用，助力开发者高效工作</p>

			<div class="search-box-container">
				<div class="search-box">
					<el-icon class="search-icon"><Search /></el-icon>
					<input
						type="text"
						v-model="searchQuery"
						class="search-input"
						placeholder="搜索工具..."
						@keyup.enter="
							searchQuery && filteredTools.length > 0 && navigateTo(filteredTools[0].path)
						" />
					<button v-if="searchQuery" class="clear-button" @click="clearSearch">
						<el-icon><Close /></el-icon>
					</button>
				</div>
			</div>
		</div>

		<!-- 工具展示区 -->
		<div class="tools-section">
			<div class="section-header" v-if="searchQuery">
				<h2 class="section-title">搜索结果</h2>
				<p class="section-subtitle" v-if="filteredTools.length > 0">
					找到 {{ filteredTools.length }} 个工具
				</p>
				<p class="section-subtitle" v-else>未找到匹配的工具，请尝试其他关键词</p>
			</div>
			<div class="section-header" v-else>
				<h2 class="section-title">全部工具</h2>
				<p class="section-subtitle">选择下方工具开始使用</p>
			</div>

			<div class="tools-grid">
				<div
					v-for="tool in filteredTools"
					:key="tool.id"
					class="tool-card"
					:class="{ 'coming-soon': tool.badge === '即将推出' }"
					@click="tool.badge !== '即将推出' ? navigateTo(tool.path) : null">
					<div class="tool-badge" v-if="tool.badge">{{ tool.badge }}</div>
					<div class="tool-header">
						<div class="tool-icon-wrapper">
							<el-icon class="tool-icon"><component :is="tool.icon" /></el-icon>
						</div>
						<h3 class="tool-name">{{ tool.name }}</h3>
					</div>
					<p class="tool-description">{{ tool.description }}</p>
					<div class="tool-tags">
						<span class="tool-tag" v-for="(tag, index) in tool.tags" :key="index">{{ tag }}</span>
					</div>
					<div class="tool-action">
						<button
							class="tool-btn"
							:class="{ disabled: tool.badge === '即将推出' }"
							:disabled="tool.badge === '即将推出'">
							{{ tool.badge === "即将推出" ? "敬请期待" : "立即使用" }}
							<el-icon class="el-icon--right" v-if="tool.badge !== '即将推出'">
								<ArrowRight />
							</el-icon>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 特性介绍 -->
		<div class="features-section">
			<div class="section-header">
				<h2 class="section-title">为什么选择 Frice</h2>
				<p class="section-subtitle">简单、高效、免费的开发工具</p>
			</div>

			<div class="features-grid">
				<div class="feature-card">
					<div class="feature-icon">
						<el-icon><Lightning /></el-icon>
					</div>
					<h3 class="feature-title">高效处理</h3>
					<p class="feature-description">批量处理多个API密钥，提高工作效率</p>
				</div>

				<div class="feature-card">
					<div class="feature-icon">
						<el-icon><Lock /></el-icon>
					</div>
					<h3 class="feature-title">安全可靠</h3>
					<p class="feature-description">所有操作在本地进行，不存储任何密钥信息</p>
				</div>

				<div class="feature-card">
					<div class="feature-icon">
						<el-icon><GoldMedal /></el-icon>
					</div>
					<h3 class="feature-title">完全免费</h3>
					<p class="feature-description">所有工具均免费使用，为开发者节省成本</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.home-container {
	max-width: 1100px;
	margin: 0 auto;
}

/* 搜索区域 */
.search-section {
	padding: 60px 0;
	text-align: center;
}

.search-title {
	font-size: 40px;
	font-weight: 700;
	color: #333;
	margin-bottom: 16px;
	line-height: 1.2;
}

.accent {
	color: #1677ff;
}

.search-subtitle {
	font-size: 18px;
	color: #666;
	margin-bottom: 40px;
	line-height: 1.6;
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
}

.search-box-container {
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
}

.search-box {
	position: relative;
	width: 100%;
	max-width: 600px;
	display: flex;
	align-items: center;
}

.search-icon {
	position: absolute;
	left: 16px;
	font-size: 20px;
	color: #999;
}

.search-input {
	width: 100%;
	height: 56px;
	padding: 0 50px 0 46px;
	border: 1px solid #dcdfe6;
	border-radius: 28px;
	font-size: 16px;
	transition: all 0.3s;
	outline: none;
	background-color: #fff;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
	border-color: #1677ff;
	box-shadow: 0 4px 16px rgba(22, 119, 255, 0.15);
}

.clear-button {
	position: absolute;
	right: 16px;
	background: none;
	border: none;
	color: #999;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color 0.2s;
}

.clear-button:hover {
	color: #666;
}

/* 工具卡片样式 */
.tools-section {
	margin-bottom: 80px;
}

.section-header {
	text-align: center;
	margin-bottom: 40px;
}

.section-title {
	font-size: 32px;
	font-weight: 600;
	color: #333;
	margin-bottom: 12px;
}

.section-subtitle {
	font-size: 16px;
	color: #666;
	max-width: 600px;
	margin: 0 auto;
}

.tools-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 24px;
}

.tool-card {
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	padding: 24px;
	transition: all 0.3s;
	cursor: pointer;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	border: 1px solid #eee;
}

.tool-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
	border-color: #d9e8ff;
}

.tool-card.coming-soon {
	opacity: 0.8;
	cursor: default;
}

.tool-card.coming-soon:hover {
	transform: none;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.tool-badge {
	position: absolute;
	top: 0;
	right: 0;
	background-color: #1677ff;
	color: white;
	font-size: 12px;
	padding: 4px 8px;
	border-bottom-left-radius: 8px;
}

.tool-badge:empty {
	display: none;
}

.tool-card.coming-soon .tool-badge {
	background-color: #faad14;
}

.tool-header {
	display: flex;
	align-items: center;
	margin-bottom: 16px;
}

.tool-icon-wrapper {
	width: 40px;
	height: 40px;
	border-radius: 8px;
	background-color: #f0f5ff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 12px;
}

.tool-icon {
	font-size: 20px;
	color: #1677ff;
}

.tool-name {
	font-size: 18px;
	font-weight: 500;
	color: #333;
	margin: 0;
}

.tool-description {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
	margin-bottom: 16px;
	flex-grow: 1;
}

.tool-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 20px;
}

.tool-tag {
	font-size: 12px;
	color: #666;
	background-color: #f5f7fa;
	border-radius: 4px;
	padding: 4px 8px;
}

.tool-action {
	display: flex;
	justify-content: flex-end;
}

.tool-btn {
	background: none;
	border: none;
	color: #1677ff;
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	padding: 4px 8px;
	border-radius: 4px;
	transition: all 0.2s;
}

.tool-btn:hover {
	background-color: #f0f5ff;
}

.tool-btn.disabled {
	color: #999;
	cursor: not-allowed;
}

.tool-btn.disabled:hover {
	background: none;
}

/* 特性部分 */
.features-section {
	margin-bottom: 80px;
}

.features-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 30px;
}

.feature-card {
	background-color: #fff;
	border-radius: 12px;
	padding: 30px;
	text-align: center;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	transition: all 0.3s;
	border: 1px solid #eee;
}

.feature-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
	border-color: #d9e8ff;
}

.feature-icon {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #f0f5ff;
	color: #1677ff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 20px;
	font-size: 30px;
}

.feature-title {
	font-size: 18px;
	font-weight: 500;
	color: #333;
	margin-bottom: 12px;
}

.feature-description {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
	.search-section {
		padding: 40px 20px;
	}

	.search-title {
		font-size: 32px;
	}

	.search-subtitle {
		font-size: 16px;
		margin-bottom: 30px;
	}

	.search-input {
		height: 50px;
		font-size: 15px;
	}

	.section-title {
		font-size: 28px;
	}

	.tools-grid {
		grid-template-columns: 1fr;
	}
}
</style>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSettingsStore } from "../stores/settings"

const router = useRouter()
const settingsStore = useSettingsStore()
</script>

<template>
	<div class="layout-container">
		<!-- 头部导航 -->
		<header class="header" :style="{ '--theme-color': settingsStore.themeColor }">
			<div class="container">
				<div class="logo-container">
					<div class="logo" @click="router.push('/')">
						<span class="logo-icon">FR</span>
						<span class="logo-text">Frice</span>
					</div>
					<div class="nav-links">
						<a href="/" class="nav-link">首页</a>
						<a href="/about" class="nav-link">关于</a>
						<a href="/settings" class="nav-link">设置</a>
					</div>
				</div>
			</div>
		</header>

		<!-- 主要内容区 -->
		<main class="main-content">
			<div class="container">
				<router-view />
			</div>
		</main>

		<!-- 页脚 -->
		<footer class="footer">
			<div class="container">
				<div class="footer-content">
					<p class="copyright">© {{ new Date().getFullYear() }} Frice - 多功能工具聚合平台</p>
					<div class="footer-links">
						<a href="https://frice.io" target="_blank" class="footer-link">官网</a>
						<a href="https://github.com/frice" target="_blank" class="footer-link">GitHub</a>
						<a href="/about" class="footer-link">关于我们</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.layout-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #f5f7fa;
	color: #333;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	width: 100%;
}

.header {
	background-color: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 12px 0;
	position: sticky;
	top: 0;
	z-index: 100;
}

.logo-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 48px;
}

.logo {
	display: flex;
	align-items: center;
	font-weight: 500;
	cursor: pointer;
	transition: transform 0.2s;
}

.logo:hover {
	transform: translateY(-1px);
}

.logo-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	background-color: var(--theme-color, #67c23a);
	color: white;
	border-radius: 6px;
	font-size: 14px;
	margin-right: 10px;
	font-weight: bold;
}

.logo-text {
	font-size: 18px;
	color: #333;
	letter-spacing: -0.5px;
}

.nav-links {
	display: flex;
	gap: 24px;
}

.nav-link {
	color: #666;
	text-decoration: none;
	font-size: 14px;
	transition: color 0.2s;
	position: relative;
}

.nav-link:hover {
	color: var(--theme-color, #67c23a);
}

.nav-link::after {
	content: "";
	position: absolute;
	bottom: -4px;
	left: 0;
	width: 0;
	height: 2px;
	background-color: var(--theme-color, #67c23a);
	transition: width 0.2s;
}

.nav-link:hover::after {
	width: 100%;
}

.main-content {
	flex: 1;
	padding: 30px 0 60px;
}

.footer {
	padding: 20px 0;
	background-color: #fff;
	border-top: 1px solid #eee;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.copyright {
	color: #999;
	font-size: 14px;
}

.footer-links {
	display: flex;
	gap: 16px;
}

.footer-link {
	color: #666;
	text-decoration: none;
	font-size: 14px;
	transition: color 0.2s;
}

.footer-link:hover {
	color: var(--theme-color, #67c23a);
}

.primary-btn {
	background-color: var(--theme-color, #67c23a);
}

.primary-btn:hover {
	background-color: var(--theme-color, #67c23a);
	opacity: 0.9;
}

@media (max-width: 768px) {
	.logo-container {
		flex-direction: column;
		height: auto;
		align-items: flex-start;
		gap: 12px;
	}

	.nav-links {
		width: 100%;
		justify-content: space-between;
		margin-top: 8px;
	}

	.footer-content {
		flex-direction: column;
		gap: 10px;
	}
}
</style>

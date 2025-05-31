<script setup>
defineOptions({
	name: "AboutPage",
	meta: {
		title: "关于",
	},
})
</script>

<template>
	<div class="about-container">
		<div class="about-header">
			<h1 class="about-title">关于 Frice</h1>
			<p class="about-subtitle">简单、高效、免费的工具聚合平台</p>
		</div>

		<div class="about-section">
			<div class="section-container">
				<div class="section-icon-container">
					<div class="section-icon">
						<el-icon><Aim /></el-icon>
					</div>
				</div>
				<div class="section-content">
					<h2 class="section-title">我们的使命</h2>
					<p class="section-text">
						Frice（Free +
						Rice）致力于为开发者提供一系列高效实用的免费工具，帮助开发者更好地管理资源，
						提高开发效率，降低资源成本。
					</p>
				</div>
			</div>
		</div>

		<div class="about-section alt">
			<div class="section-container reverse">
				<div class="section-icon-container">
					<div class="section-icon">
						<el-icon><SetUp /></el-icon>
					</div>
				</div>
				<div class="section-content">
					<h2 class="section-title">核心功能</h2>
					<div class="feature-list">
						<div class="feature-item">
							<div class="feature-icon">
								<el-icon><MoneyCollect /></el-icon>
							</div>
							<div class="feature-content">
								<h3 class="feature-title">批量账户余额查询</h3>
								<p class="feature-desc">
									快速检索多个API密钥，获取账户余额详细信息，防止因余额不足影响业务
								</p>
							</div>
						</div>

						<div class="feature-item">
							<div class="feature-icon coming-soon">
								<el-icon><Key /></el-icon>
							</div>
							<div class="feature-content">
								<h3 class="feature-title">
									API密钥验证工具 <span class="coming-soon-tag">即将推出</span>
								</h3>
								<p class="feature-desc">验证您的API密钥是否有效，检查使用权限和配额限制</p>
							</div>
						</div>

						<div class="feature-item">
							<div class="feature-icon coming-soon">
								<el-icon><DataLine /></el-icon>
							</div>
							<div class="feature-content">
								<h3 class="feature-title">
									使用量统计分析 <span class="coming-soon-tag">即将推出</span>
								</h3>
								<p class="feature-desc">分析API使用情况，优化资源配置与成本</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="about-section">
			<div class="section-container">
				<div class="section-icon-container">
					<div class="section-icon">
						<el-icon><Medal /></el-icon>
					</div>
				</div>
				<div class="section-content">
					<h2 class="section-title">技术栈</h2>
					<p class="section-text">
						我们使用现代化的前端技术栈构建Frice工具平台，确保用户获得流畅的使用体验。
					</p>
					<div class="tech-tags">
						<div class="tech-tag">
							<el-icon><ElementPlus /></el-icon>
							<span>Vue 3</span>
						</div>
						<div class="tech-tag">
							<el-icon><Connection /></el-icon>
							<span>Vue Router</span>
						</div>
						<div class="tech-tag">
							<el-icon><Box /></el-icon>
							<span>Pinia</span>
						</div>
						<div class="tech-tag">
							<el-icon><SwitchButton /></el-icon>
							<span>Element Plus</span>
						</div>
						<div class="tech-tag">
							<el-icon><Brush /></el-icon>
							<span>UnoCSS</span>
						</div>
						<div class="tech-tag">
							<el-icon><Lightning /></el-icon>
							<span>Vite</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="about-section alt">
			<div class="section-container reverse">
				<div class="section-icon-container">
					<div class="section-icon">
						<el-icon><Message /></el-icon>
					</div>
				</div>
				<div class="section-content">
					<h2 class="section-title">联系我们</h2>
					<p class="section-text">如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们。</p>
					<div class="contact-info">
						<a href="mailto:support@frice.io" class="contact-link">
							<el-icon><Message /></el-icon>
							<span>support@frice.io</span>
						</a>
						<a href="https://frice.io" target="_blank" class="contact-link">
							<el-icon><Link /></el-icon>
							<span>frice.io</span>
						</a>
						<a href="https://github.com/frice" target="_blank" class="contact-link">
							<el-icon><Share /></el-icon>
							<span>GitHub: frice</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.about-container {
	max-width: 1100px;
	margin: 0 auto;
}

.about-header {
	text-align: center;
	margin-bottom: 60px;
}

.about-title {
	font-size: 36px;
	font-weight: 600;
	color: #333;
	margin-bottom: 16px;
}

.about-subtitle {
	font-size: 18px;
	color: #666;
	max-width: 600px;
	margin: 0 auto;
}

.about-section {
	margin-bottom: 80px;
	padding: 40px 0;
}

.about-section.alt {
	background-color: #f8fafc;
	border-radius: 16px;
}

.section-container {
	display: flex;
	gap: 50px;
	align-items: center;
}

.section-container.reverse {
	flex-direction: row-reverse;
}

.section-icon-container {
	flex: 0 0 120px;
}

.section-icon {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: linear-gradient(135deg, #e6f7ff, #f0f5ff);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	color: #1677ff;
	box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.section-content {
	flex: 1;
}

.section-title {
	font-size: 28px;
	font-weight: 600;
	color: #333;
	margin-bottom: 20px;
}

.section-text {
	font-size: 16px;
	color: #666;
	line-height: 1.6;
	margin-bottom: 24px;
}

/* 功能列表 */
.feature-list {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.feature-item {
	display: flex;
	gap: 16px;
}

.feature-icon {
	width: 50px;
	height: 50px;
	border-radius: 10px;
	background-color: #e6f7ff;
	color: #1677ff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	flex-shrink: 0;
}

.feature-icon.coming-soon {
	background-color: #fff7e6;
	color: #faad14;
}

.feature-content {
	flex: 1;
}

.feature-title {
	font-size: 18px;
	font-weight: 500;
	color: #333;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
}

.coming-soon-tag {
	font-size: 12px;
	background-color: #faad14;
	color: #fff;
	padding: 2px 8px;
	border-radius: 12px;
	margin-left: 8px;
	font-weight: normal;
}

.feature-desc {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

/* 技术栈标签 */
.tech-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
}

.tech-tag {
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: #f0f5ff;
	color: #1677ff;
	padding: 8px 16px;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	transition: all 0.2s;
}

.tech-tag:hover {
	background-color: #e6f7ff;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 联系信息 */
.contact-info {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.contact-link {
	display: flex;
	align-items: center;
	gap: 10px;
	color: #1677ff;
	text-decoration: none;
	font-size: 16px;
	transition: all 0.2s;
}

.contact-link:hover {
	color: #0958d9;
	transform: translateX(5px);
}

/* 响应式设计 */
@media (max-width: 768px) {
	.section-container {
		flex-direction: column;
		gap: 30px;
	}

	.section-container.reverse {
		flex-direction: column;
	}

	.section-icon-container {
		flex: none;
	}

	.section-icon {
		margin: 0 auto;
	}

	.about-section {
		margin-bottom: 40px;
		padding: 30px 20px;
	}

	.about-title {
		font-size: 28px;
	}

	.about-subtitle {
		font-size: 16px;
	}

	.section-title {
		font-size: 24px;
		text-align: center;
	}

	.tech-tags {
		justify-content: center;
	}

	.contact-info {
		align-items: center;
	}
}
</style>

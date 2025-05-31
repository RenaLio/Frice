<script setup>
import HcStatus from "../../components/hc/Status.vue"

defineOptions({
	name: "StatusDemo",
	meta: {
		title: "HcStatus 组件演示",
		parent: "组件",
	},
})
</script>

<template>
	<div class="demo-container">
		<h1 class="demo-title">HcStatus 状态指示器</h1>
		<p class="demo-description">用于显示系统状态、连接状态等场景的指示点</p>

		<div class="demo-section">
			<h2 class="section-title">基础用法</h2>
			<div class="demo-item">
				<HcStatus />
				<span class="demo-text">默认状态（绿色）</span>
			</div>
		</div>

		<div class="demo-section">
			<h2 class="section-title">颜色变体</h2>
			<div class="demo-row">
				<div class="demo-item">
					<HcStatus color="green" />
					<span class="demo-text">绿色（正常）</span>
				</div>
				<div class="demo-item">
					<HcStatus color="red" />
					<span class="demo-text">红色（错误）</span>
				</div>
				<div class="demo-item">
					<HcStatus color="yellow" />
					<span class="demo-text">黄色（警告）</span>
				</div>
				<div class="demo-item">
					<HcStatus color="blue" />
					<span class="demo-text">蓝色（信息）</span>
				</div>
				<div class="demo-item">
					<HcStatus color="gray" />
					<span class="demo-text">灰色（禁用）</span>
				</div>
			</div>
		</div>

		<div class="demo-section">
			<h2 class="section-title">大小变体</h2>
			<div class="demo-row">
				<div class="demo-item">
					<HcStatus size="small" />
					<span class="demo-text">小尺寸</span>
				</div>
				<div class="demo-item">
					<HcStatus size="default" />
					<span class="demo-text">默认尺寸</span>
				</div>
				<div class="demo-item">
					<HcStatus size="large" />
					<span class="demo-text">大尺寸</span>
				</div>
			</div>
		</div>

		<div class="demo-section">
			<h2 class="section-title">无脉冲动画</h2>
			<div class="demo-row">
				<div class="demo-item">
					<HcStatus :pulse="false" />
					<span class="demo-text">无动画（绿色）</span>
				</div>
				<div class="demo-item">
					<HcStatus color="red" :pulse="false" />
					<span class="demo-text">无动画（红色）</span>
				</div>
			</div>
		</div>

		<div class="demo-section">
			<h2 class="section-title">使用示例</h2>
			<div class="demo-card">
				<div class="demo-card-row">
					<div class="demo-card-label">系统状态：</div>
					<div class="demo-card-content">
						<HcStatus color="green" /> <span class="status-text">运行中</span>
					</div>
				</div>
				<div class="demo-card-row">
					<div class="demo-card-label">服务器连接：</div>
					<div class="demo-card-content">
						<HcStatus color="red" /> <span class="status-text">已断开</span>
					</div>
				</div>
				<div class="demo-card-row">
					<div class="demo-card-label">备份状态：</div>
					<div class="demo-card-content">
						<HcStatus color="yellow" /> <span class="status-text">进行中</span>
					</div>
				</div>
			</div>
		</div>

		<div class="demo-section">
			<h2 class="section-title">组件属性</h2>
			<table class="props-table">
				<thead>
					<tr>
						<th>属性</th>
						<th>说明</th>
						<th>类型</th>
						<th>可选值</th>
						<th>默认值</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>color</td>
						<td>状态点的颜色</td>
						<td>string</td>
						<td>green/red/yellow/blue/gray</td>
						<td>green</td>
					</tr>
					<tr>
						<td>pulse</td>
						<td>是否开启脉冲动画</td>
						<td>boolean</td>
						<td>true/false</td>
						<td>true</td>
					</tr>
					<tr>
						<td>size</td>
						<td>状态点的大小</td>
						<td>string</td>
						<td>small/default/large</td>
						<td>default</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
.demo-container {
	max-width: 900px;
	margin: 0 auto;
	padding: 20px;
}

.demo-title {
	font-size: 28px;
	font-weight: 600;
	margin-bottom: 12px;
	color: #333;
}

.demo-description {
	color: #666;
	margin-bottom: 30px;
	font-size: 16px;
}

.demo-section {
	margin-bottom: 32px;
	background-color: #fff;
	border-radius: 8px;
	padding: 24px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 18px;
	font-weight: 500;
	margin-bottom: 20px;
	color: #333;
	border-bottom: 1px solid #eee;
	padding-bottom: 12px;
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 32px;
}

.demo-item {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 16px;
}

.demo-text {
	color: #666;
	font-size: 14px;
}

.demo-card {
	background-color: #f9f9f9;
	border-radius: 6px;
	padding: 16px;
	border: 1px solid #eee;
}

.demo-card-row {
	display: flex;
	margin-bottom: 12px;
	line-height: 24px;
}

.demo-card-row:last-child {
	margin-bottom: 0;
}

.demo-card-label {
	width: 120px;
	color: #666;
	font-size: 14px;
}

.demo-card-content {
	display: flex;
	align-items: center;
	gap: 8px;
}

.status-text {
	font-size: 14px;
	color: #333;
}

.props-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;
}

.props-table th,
.props-table td {
	padding: 10px 16px;
	text-align: left;
	border-bottom: 1px solid #eee;
}

.props-table th {
	background-color: #f9f9f9;
	font-weight: 500;
	color: #333;
}

.props-table td {
	color: #666;
}
</style>

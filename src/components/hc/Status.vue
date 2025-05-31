<script setup>
defineProps({
	/**
	 * 状态点的颜色
	 * @values green, red, yellow, blue, gray
	 */
	color: {
		type: String,
		default: "green",
		validator: (value) => ["green", "red", "yellow", "blue", "gray"].includes(value),
	},

	/**
	 * 是否开启脉冲动画
	 */
	pulse: {
		type: Boolean,
		default: true,
	},

	/**
	 * 状态点的大小
	 */
	size: {
		type: String,
		default: "default",
		validator: (value) => ["small", "default", "large"].includes(value),
	},
})
</script>

<template>
	<div class="hc-status">
		<span
			class="status-dot"
			:class="[`status-${color}`, { 'status-pulse': pulse }, `status-${size}`]"></span>
	</div>
</template>

<style scoped>
.hc-status {
	display: inline-flex;
	align-items: center;
}

.status-dot {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: relative;
}

/* 大小变体 */
.status-small {
	width: 6px;
	height: 6px;
}

.status-large {
	width: 12px;
	height: 12px;
}

/* 颜色变体 */
.status-green {
	background-color: #52c41a;
}

.status-red {
	background-color: #f5222d;
}

.status-yellow {
	background-color: #faad14;
}

.status-blue {
	background-color: #1677ff;
}

.status-gray {
	background-color: #bfbfbf;
}

/* 脉冲动画 */
.status-pulse::after {
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	transform: translate(-50%, -50%);
	animation: pulse 1.5s ease-in-out infinite;
}

.status-green.status-pulse::after {
	box-shadow: 0 0 8px 1px rgba(82, 196, 26, 0.8);
}

.status-red.status-pulse::after {
	box-shadow: 0 0 8px 1px rgba(245, 34, 45, 0.8);
}

.status-yellow.status-pulse::after {
	box-shadow: 0 0 8px 1px rgba(250, 173, 20, 0.8);
}

.status-blue.status-pulse::after {
	box-shadow: 0 0 8px 1px rgba(22, 119, 255, 0.8);
}

.status-gray.status-pulse::after {
	box-shadow: 0 0 8px 1px rgba(191, 191, 191, 0.8);
}

@keyframes pulse {
	0% {
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}
	70% {
		width: 200%;
		height: 200%;
		opacity: 0;
	}
	100% {
		width: 200%;
		height: 200%;
		opacity: 0;
	}
}
</style>

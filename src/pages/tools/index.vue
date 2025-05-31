<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

defineOptions({
	name: "ToolsIndex",
	meta: {
		title: "工具集",
	},
})

const router = useRouter()

onMounted(() => {
	// 自动重定向到账户余额查询工具页面
	router.replace("/tools/api-key-checker")
})
</script>

<template>
	<div class="tools-index">
		<el-result icon="info" title="正在加载..." sub-title="页面即将跳转"> </el-result>
	</div>
</template>

/**
 * 检查Fal API Key是否有效
 * @param {string} apiKey - Fal API Key
 * @param {string} cfUrl - Cloudflare Worker URL
 * @returns {Promise<Object>} - 测试结果
 */
export const checkFalApiKey = async (apiKey, cfUrl) => {
	let defaultUrl = "https://fal.run/fal-ai/any-llm/stream"
	if (cfUrl) {
		defaultUrl = cfUrl
	}
	try {
		const response = await fetch(defaultUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Key ${apiKey}`,
				Accept: "*/*",
				Host: "fal.run",
				Connection: "keep-alive",
			},
			body: JSON.stringify({
				model: "anthropic/claude-3.7-sonnet",
				prompt: "hi",
				system_prompt: "",
			}),
		})

		return {
			status: response.status,
			success: response.status >= 200 && response.status < 300,
			statusText: response.statusText,
			message:
				response.status >= 200 && response.status < 300 ? "API密钥有效" : await response.text(),
		}
	} catch (error) {
		return {
			status: -1,
			success: false,
			statusText: "请求失败",
			message: error.message,
		}
	}
}

/**
 * 遮蔽API密钥，只显示最后几位
 * @param {string} key - 完整API密钥
 * @returns {string} - 遮蔽后的API密钥
 */
export const maskApiKey = (key) => {
	if (!key || typeof key !== "string") return ""
	if (key.length <= 8) return key

	// 显示末尾6位，其余用*替代
	return `${key.substring(0, 3)}...${key.substring(key.length - 6)}`
}

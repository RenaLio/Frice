import axios from "axios"
import qs from "qs"

export const paramsSerializer = (params) => qs.stringify(params, { indices: false })

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "",
	timeout: 5000,
	paramsSerializer,
})

// 简化的请求拦截器
const requestSuccessCb = (config) => {
	return config
}

const requestErrorCb = (error) => {
	return Promise.reject(error)
}

// 简化的响应拦截器
const responseSuccessCb = (response) => {
	return response
}

const responseErrorCb = (error) => {
	return Promise.reject(error)
}

apiClient.interceptors.request.use(requestSuccessCb, requestErrorCb)
apiClient.interceptors.response.use(responseSuccessCb, responseErrorCb)

export default apiClient

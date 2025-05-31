import { createRouter, createWebHistory } from "vue-router"
import { routes } from "vue-router/auto-routes"

console.log(routes)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
})

// 前置守卫
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = `${to.meta.title} - Frice`
	} else {
		document.title = "Frice"
	}

	next()
})

// 后置守卫
router.afterEach((to, from) => {
	console.log("后置守卫")
})

export default router

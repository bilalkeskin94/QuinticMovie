// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt'],
	devtools: { enabled: true },
	css: ['@/assets/global.scss'],
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	runtimeConfig: {
		baseURL: 'https://the-one-api.dev/v2',
		apiSecret: process.env.VUE_APP_API_KEY,
	},
});

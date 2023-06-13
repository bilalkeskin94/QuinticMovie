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
		public: {
			baseURL: process.env.BASE_URL || 'https://the-one-api.dev/v2',
			apiSecret: process.env.NUXT_ENV_API_KEY || '',
		},
	},
});

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    baseURL: '/nordhealth/',
  },
  css: ['@nordhealth/css'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-'),
    },
  },
  compatibilityDate: '2025-05-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})

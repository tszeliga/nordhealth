<template>
  <div class="success-page">
    <SuccessPage @start-over="handleStartOver" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const handleStartOver = () => {
  router.push('/')
}

useHead({
  title: 'Account Created Successfully',
})
</script>

<style scoped>
.success-page {
  min-height: 100vh;
}
</style>

<template>
  <div class="signup-page">
    <SignupForm @success="handleSignupSuccess" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const handleSignupSuccess = () => {
  router.push('/success')
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
}
</style>

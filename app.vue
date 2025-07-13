<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Set global page title
useHead({
  title: 'Nord Health Signup Application',
  meta: [
    { name: 'description', content: 'Create your account to get started with Nord Health' },
  ],
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--n-font-family);
  background: var(--n-color-surface);
}

.app {
  min-height: 100vh;
}
</style>

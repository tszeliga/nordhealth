<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">
        <nord-icon
          name="interface-checked"
          size="xl"
          color="var(--n-color-status-success)"
        />
      </div>

      <h1 class="success-title">
        Welcome aboard!
      </h1>
      <p class="success-message">
        Your account has been created successfully. We're excited to have you join our community.
      </p>

      <div class="success-details">
        <p>Your account has been successfully created and is ready to use!</p>
      </div>

      <nord-button
        variant="primary"
        expand
        @click="startOver"
      >
        Create another account
      </nord-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SuccessPageEmits } from '~/types'
import '@nordhealth/components/lib/Button'
import '@nordhealth/components/lib/Icon'

// No props needed anymore

const emit = defineEmits<SuccessPageEmits>()

const startOver = () => {
  emit('startOver')
}
</script>

<style scoped>
.success-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--n-color-surface);
}

.success-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: var(--n-color-surface-raised);
  border-radius: var(--n-border-radius-l);
  box-shadow: var(--n-box-shadow-l);
  text-align: center;
}

.success-icon {
  margin-bottom: 1.5rem;
}

.success-title {
  margin: 0 0 1rem 0;
  color: var(--n-color-text);
  font-size: var(--n-font-size-xl);
  font-weight: var(--n-font-weight-semibold);
}

.success-message {
  margin: 0 0 2rem 0;
  color: var(--n-color-text-weak);
  font-size: var(--n-font-size-s);
  line-height: 1.5;
}

.success-details {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--n-color-surface);
  border-radius: var(--n-border-radius-m);
  text-align: left;
}

.success-details p {
  margin: 0.5rem 0;
  font-size: var(--n-font-size-s);
  color: var(--n-color-text);
}
</style>

<template>
  <div class="signup-form-container">
    <nord-card
      class="signup-form-card"
      padding="l"
    >
      <div slot="header">
        <h1 class="signup-title">
          Create your account
        </h1>
        <p class="signup-subtitle">
          Join us to get started with your journey
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <nord-stack
          direction="vertical"
          gap="m"
        >
          <nord-stack>
            <nord-input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              :error="errors.email"
              :invalid="!!errors.email"
              expand
              @input="clearFieldError('email')"
            />
          </nord-stack>

          <nord-stack>
            <nord-input
              id="password"
              v-model="formData.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              placeholder="Enter your password"
              :error="errors.password"
              :invalid="!!errors.password"
              expand
              @input="clearFieldError('password')"
            >
              <nord-button
                slot="end"
                square
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                aria-describedby="password-tooltip"
                @click.prevent="togglePasswordVisibility"
              >
                <nord-icon
                  :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'"
                  size="s"
                />
              </nord-button>
            </nord-input>
          </nord-stack>
          <nord-stack>
            <nord-checkbox
              id="updates"
              v-model="formData.receiveUpdates"
              name="updates"
              label="I would like to receive occasional product updates and announcements"
              value="updates"
              hint="You can unsubscribe at any time"
            />
          </nord-stack>

          <nord-button
            type="submit"
            variant="primary"
            expand
            :loading="isSubmitting"
            :disabled="isSubmitting"
          >
            Create account
          </nord-button>
        </nord-stack>
      </form>
    </nord-card>
  </div>
</template>

<script setup lang="ts">
// No need to import SignupFormData since we don't pass it anymore
import '@nordhealth/components/lib/Button'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Checkbox'
import '@nordhealth/components/lib/Icon'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Stack'

const emit = defineEmits<{
  success: []
}>()

const {
  formData,
  errors,
  isSubmitting,
  showPassword,
  clearFieldError,
  togglePasswordVisibility,
  submitForm,
} = useSignupForm()

const handleSubmit = async () => {
  await submitForm(() => {
    emit('success')
  })
}
</script>

<style scoped>
.signup-form-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--n-color-surface);
}

.signup-form-card {
  inline-size: 90%;
  max-inline-size: 400px;
  margin: auto;
}

.signup-title {
  color: var(--n-color-text);
  font-size: var(--n-font-size-xl);
  margin: 0
}

.signup-subtitle {
  margin: 0;
  color: var(--n-color-text-weak);
  font-size: var(--n-font-size-s);
  text-align: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const state = ref({
  email: undefined,
  password: undefined,
  remember: false
})
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}
async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <div class="flex w-full h-full">
    <div class="grow p-10 border-r border-gray-700 flex flex-col justify-around">
      <form class="w-[50ch] mx-auto">
        <h2 class="text-4xl font-semibold text-center">Sign in</h2>
        <UForm :validate="validate" :state="state" @submit="submit" class="flex flex-col gap-5">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
          <div class="flex justify-between items-center gap-5">
            <UCheckbox v-model="state.remember" label="Remember me" />
            <UButton variant="link" color="primary">
              Forgot password?
            </UButton>
          </div>
          <UButton type="submit" block>
            Sign up
          </UButton>
        </UForm>
        <div class="flex items-center">
          <p> New here? </p>
          <UButton variant="link" color="primary" size="xl" class="underline" to="/signup">
            Create an account
          </UButton>
        </div>
      </form>
    </div>
    <div class="grow">
      <img src="https://picsum.photos/1500/1500" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

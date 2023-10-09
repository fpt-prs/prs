<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const state = ref({
  email: undefined,
  password: undefined,
  repeatPassword: undefined,
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
  <div class="flex w-screen h-screen">
    <div class="grow p-10 border-r border-gray-700 flex flex-col justify-around">
      <form class="w-full sm:w-[40ch] mx-auto">
        <a href="/">
          <img src="/logo.svg" alt="" class="mx-auto h-8 w-8">
        </a>
        <h2 class="text-4xl font-semibold text-center">Sign up to PRS</h2>
        <UForm :validate="validate" :state="state" @submit="submit" class="flex flex-col gap-5">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
          <UFormGroup label="Repeat Password" name="repeat_password">
            <UInput v-model="state.repeatPassword" type="password" />
          </UFormGroup>
          <UButton type="submit" block>
            Sign in
          </UButton>
        </UForm>
        <div class="flex items-center">
          <p> Already have an account? </p>
          <UButton variant="link" color="primary" size="xl" class="underline" to="/login">
            Login
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const state = ref({
  oldPassword: undefined,
  newPassword: undefined,
  repeatPassword: undefined
})
const validate = (state: any): FormError[] => {
  const errors = [] as any[]
  if (!state.oldPassword) errors.push({ path: 'old_password', message: 'Required' })
  if (!state.newPassword) errors.push({ path: 'new_password', message: 'Required' })
  if (!state.repeatPassword) errors.push({ path: 'repeat_password', message: 'Required' })
  return errors
}
async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>
<template>
  <div class="grow p-10 border-r border-gray-700 flex flex-col justify-around">
    <form class="w-[50ch] mx-auto">
      <h2 class="text-4xl font-semibold text-center">Change password</h2>
      <UForm :validate="validate" :state="state" @submit="submit" class="flex flex-col gap-5">
        <UFormGroup label="Old Password" name="old_password">
          <UInput v-model="state.oldPassword" type="password" />
        </UFormGroup>
        <UFormGroup label="New Password" name="new_password">
          <UInput v-model="state.newPassword" type="password" />
        </UFormGroup>
        <UFormGroup label="Repeat Password" name="repeat_password">
          <UInput v-model="state.repeatPassword" type="password" />
        </UFormGroup>
        <UButton type="submit" block>
          Change password
        </UButton>
      </UForm>
    </form>
  </div>
</template>

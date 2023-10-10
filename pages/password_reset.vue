<script setup>
const state = ref({
  email: undefined,
})
</script>

<template>
  <div class="flex w-screen h-screen justify-center items-center">
    <div class="p-10">
      <a href="/">
        <img src="/logo.svg" alt="" class="mx-auto h-8 w-8">
      </a>
      <h2 class="text-4xl py-2 font-semibold text-center">Reset password</h2>
      <UCard class="w-full sm:w-[40ch] mx-auto">
        <UForm :validate="validate" :state="state" @submit="submit" class="flex flex-col gap-5">
          <UFormGroup label="Enter your user account's email address and we will send you a password reset link." name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UButton type="submit" block>
            Send password reset email
          </UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

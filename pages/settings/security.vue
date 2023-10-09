<script setup>
definePageMeta({ layout: "settings" });
</script>

<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Authentication</p>
      <p class="border-y border-gray-800 px-4 py-3">Change password</p>
      <form action="">
        <div class="space-y-3 p-4 max-w-[50ch]">
          <UFormGroup label="Current password" name="current_password">
            <UInput type="password" color="gray" />
          </UFormGroup>
          <UFormGroup label="New password" name="new_password">
            <UInput type="password" color="gray" />
          </UFormGroup>
          <UFormGroup label="Confirm new password" name="confirm_new_password">
            <UInput color="gray" type="password" />
          </UFormGroup>
          <UButton
            label="Change password"
            color="primary"
            variant="solid"
            size="sm"
            :trailing="false"
          />
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

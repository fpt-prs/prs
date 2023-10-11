<script setup>
import DefaultLayout from '~/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <div class="flex h-full">
      <div class="p-5 border-r border-gray-800 lg:min-w-[20ch]">
        <ul class="flex flex-col">
          <UButton icon="i-heroicons-user-circle" color="gray" variant="ghost" label="Profile"
            exactActiveClass="bg-gray-700" :trailing="false" to="/settings/profile" class="w-full" />
          <UButton icon="i-heroicons-cog-6-tooth" color="gray" variant="ghost" label="Preferences" :trailing="false"
            to="/settings/preferences" class="w-full" />
          <UButton icon="i-heroicons-credit-card" color="gray" variant="ghost" label="Billing" :trailing="false"
            to="/settings/billing" class="w-full" />
        </ul>
      </div>
      <slot />
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "~/layouts/default.vue";
</script>

<template>
  <DefaultLayout>
    <div class="flex h-full">
      <div class="p-5 border-r border-gray-800 lg:min-w-[20ch]">
        <ul class="flex flex-col">
          <UButton
            icon="i-heroicons-building-storefront"
            color="gray"
            variant="ghost"
            label="Products"
            :trailing="false"
            to="/admin/products"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-user-circle"
            color="gray"
            variant="ghost"
            label="Users"
            :trailing="false"
            to="/admin/users"
            class="w-full"
          />
        </ul>
      </div>
      <div class="w-screen overflow-y-auto">
        <slot />
      </div>
    </div>
  </DefaultLayout>
</template>

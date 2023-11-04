<script setup>
import DefaultLayout from "~/layouts/default.vue";
</script>

<template>
  <DefaultLayout>
    <div class="flex h-full">
      <div class="p-5 border-r border-color lg:min-w-[20ch]">
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
          <UButton
            icon="i-heroicons-user-group"
            color="gray"
            variant="ghost"
            label="Roles"
            :trailing="false"
            to="/admin/roles"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-shield-check"
            color="gray"
            variant="ghost"
            label="Permissions"
            :trailing="false"
            to="/admin/permissions"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-globe-alt"
            color="gray"
            variant="ghost"
            label="Crawl"
            :trailing="false"
            to="/admin/crawl"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-bell"
            color="gray"
            variant="ghost"
            label="Notifications"
            :trailing="false"
            to="/admin/notifications"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-currency-dollar"
            color="gray"
            variant="ghost"
            label="Payment"
            :trailing="false"
            to="/admin/payment"
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

<script setup></script>

<template>
  <div class="h-screen flex flex-col dark:bg-gray-900 bg-white">
    <Navbar />
    <div class="grow overflow-x-auto mt-14">
      <div class="flex h-full">
        <div class="p-5 border-r border-color lg:min-w-[20ch]">
          <ul class="flex flex-col">
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
            <UButton
              icon="i-heroicons-banknotes"
              color="gray"
              variant="ghost"
              label="Pricing options"
              :trailing="false"
              to="/admin/options"
              class="w-full"
            />
          </ul>
        </div>
        <div class="w-screen overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.nuxt-link-active {
  font-weight: bold;
}
</style>

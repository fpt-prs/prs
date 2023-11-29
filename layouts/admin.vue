<script setup></script>

<template>
  <div class="min-h-screen flex dark:bg-gray-900 bg-white">
    <div class="">
      <Navbar />
    </div>
    <div class="grow overflow-x-auto ml-56">
      <div class="flex h-full">
        <div class="p-5 border-r border-color lg:min-w-[20ch]">
          <ul class="flex flex-col">
            <UButton
              icon="i-heroicons-user-circle"
              variant="ghost"
              size="lg"
              label="Users"
              :trailing="false"
              to="/admin/users"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-user-group"
              variant="ghost"
              size="lg"
              label="Roles"
              :trailing="false"
              to="/admin/roles"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-shield-check"
              variant="ghost"
              size="lg"
              label="Permissions"
              :trailing="false"
              to="/admin/permissions"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-globe-alt"
              variant="ghost"
              size="lg"
              label="Crawl"
              :trailing="false"
              to="/admin/crawl"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-bell"
              size="lg"
              variant="ghost"
              label="Notifications"
              :trailing="false"
              to="/admin/notifications"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-currency-dollar"
              size="lg"
              variant="ghost"
              label="Payment"
              :trailing="false"
              to="/admin/payment"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-banknotes"
              size="lg"
              variant="ghost"
              label="Subscriptions"
              :trailing="false"
              to="/admin/subsctiptions"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-banknotes"
              size="lg"
              variant="ghost"
              label="Bank accounts"
              :trailing="false"
              to="/admin/accounts"
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

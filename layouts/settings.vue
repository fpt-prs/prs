<script setup></script>

<template>
  <div class="h-screen flex flex-col dark:bg-gray-900 bg-white">
    <Navbar />
    <div class="grow overflow-x-auto mt-14">
      <div class="flex">
        <div class="p-5 border-r border-color lg:min-w-[20ch]">
          <ul class="flex flex-col">
            <UButton
              icon="i-heroicons-user-circle"
              color="gray"
              variant="ghost"
              label="Profile"
              exactActiveClass="bg-gray-700"
              :trailing="false"
              to="/settings/profile"
              class="w-full"
            />
            <UButton
              icon="i-heroicons-credit-card"
              color="gray"
              variant="ghost"
              label="Billing"
              :trailing="false"
              to="/settings/billing"
              class="w-full"
            />
          </ul>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

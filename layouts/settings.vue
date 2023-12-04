<script setup></script>

<template>
  <div class="min-h-screen flex dark:bg-gray-950 bg-white">
    <div class="">
      <Navbar />
    </div>
    <div class="grow overflow-x-auto ml-56">
      <div class="flex min-h-full">
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

<script setup lang="ts">
const settings = ref(false);
const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/75623745?v=4",
      },
      to: "/settings/profile",
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      to: "/settings/security",
    },
  ],
  [
    {
      label: "Help & Feedback",
      icon: "i-heroicons-chat-bubble-left-right",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-on-rectangle",
    },
  ],
];
</script>

<template>
  <div
    class="w-56 xl:w-64 min-w-[14rem] max-w-xl border-r border-gray-200 dark:border-gray-800 flex flex-col"
  >
    <div class="flex items-center justify-between px-4 h-14">
      <a href="/">
        <img src="/logo.svg" alt="" />
      </a>
      <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
        <UAvatar
          size="xs"
          src="https://avatars.githubusercontent.com/u/75623745?v=4"
        />
      </UDropdown>
    </div>
    <div class="flex flex-col px-2">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="gray"
        variant="ghost"
        label="Search"
        to="/"
        :trailing="false"
      />
      <UButton
        icon="i-heroicons-inbox"
        color="gray"
        variant="ghost"
        label="My collections"
        to="/collections"
        :trailing="false"
      />
    </div>
    <Preferences
      :isOpen="settings"
      @update:isOpen="(value) => (settings = value)"
    />
  </div>
</template>

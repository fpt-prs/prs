<script setup lang="ts">
import { DropdownItem } from "@nuxt/ui/dist/runtime/types";

const { getSession, signOut } = useAuth();
const session = await getSession();
const settings = ref(false);
const items: DropdownItem[][] = [
  [
    {
      label: session?.user?.name || "Guest",
      avatar: {
        src: session?.user?.image || "/blank.webp",
      },
      to: "/settings/profile",
      disabled: !session?.user,
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      to: "/settings/profile",
    },
  ],
  [
    {
      label: "Help & Feedback",
      icon: "i-heroicons-chat-bubble-left-right",
      to: "/feedback",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-on-rectangle",
      click: () => {
        signOut({
          callbackUrl: "/",
        });
      },
    },
  ],
];
</script>

<template>
  <div
    class="w-56 xl:w-64 min-w-[14rem] max-w-xl border-r border-gray-200 dark:border-gray-800 flex flex-col"
  >
    <div class="flex items-center justify-between px-4 h-14">
      <a href="/search">
        <img src="/logo.svg" alt="" />
      </a>
      <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
        <UAvatar size="xs" :src="session?.user?.image || '/blank.webp'" />
      </UDropdown>
    </div>
    <div class="flex flex-col px-2">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="gray"
        variant="ghost"
        label="Search"
        to="/search"
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

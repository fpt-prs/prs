<script setup lang="ts">
import { DropdownItem } from "@nuxt/ui/dist/runtime/types";

const { getSession, signOut } = useAuth();
const session = await getSession();
const settings = ref(false);
const items: DropdownItem[][] = [
  [
    {
      label: session?.user?.email || "",
      slot: "account",
      disabled: true,
    },
  ],
  [
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
    class="fixed top-0 h-14 dark:bg-gray-900 bg-white w-full dark:border-b dark:border-gray-800 flex items-center justify-between z-50"
  >
    <div class="flex items-center justify-between px-4 h-14">
      <a href="/search">
        <img src="/logo.svg" alt="" />
      </a>
    </div>
    <div class="flex items-center px-2">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="gray"
        variant="ghost"
        label="HOT products"
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
      <UButton
        icon="i-heroicons-user-group"
        color="gray"
        variant="ghost"
        label="Admin"
        to="/admin/products"
        :trailing="false"
      />
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-end' }"
        class="ml-5"
      >
        <UAvatar :src="session?.user?.image || '/blank.webp'" />
        <template #account="{ item }">
          <div class="text-left w-full z-[99]">
            <p>Signed in as</p>
            <p
              class="w-full truncate font-medium text-gray-900 dark:text-white"
            >
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdown>
    </div>
    <Preferences
      :isOpen="settings"
      @update:isOpen="(value) => (settings = value)"
    />
  </div>
</template>

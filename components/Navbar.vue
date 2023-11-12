<script setup>
const { getSession, signOut } = useAuth();
const session = await getSession();
let theme = useColorMode();
const isDark = computed(() => theme.value === "dark");
const items = [
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

const notifications = ref([]);
onMounted(async () => {
  const response = await fetch("/api/notifications/user");
  const data = await response.json();
  const body = JSON.parse(data.body);
  notifications.value = body;
});
</script>

<template>
  <div
    class="fixed top-0 h-14 dark:bg-gray-900 bg-white w-full border-b border-color flex items-center justify-between z-[999]"
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
      <UPopover>
        <UButton
          color="gray"
          variant="ghost"
          trailing-icon="i-heroicons-bell"
        />

        <template #panel>
          <div class="p-4 space-y-4">
            <div class="border border-color rounded-lg p-4" v-for="notification in notifications">
              <p class="text-sm">{{ notification.header }}</p>
              <p class="text-color text-sm">{{ notification.content }}</p>
            </div>
          </div>
        </template>
      </UPopover>
      <UButton
        :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        color="gray"
        variant="ghost"
        @click="theme.preference = isDark ? 'light' : 'dark'"
        :trailing="false"
      />
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-end' }"
        class="ml-2"
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
  </div>
</template>

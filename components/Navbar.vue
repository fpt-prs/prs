<script setup>
const { getSession, signOut } = useAuth();
const session = await getSession();
const user = session?.user;
let theme = useColorMode();
const isDark = computed(() => theme.value === "dark");
</script>

<template>
  <div
    class="fixed top-0 dark:bg-gray-900 bg-white h-full w-56 border-r border-color justify-between z-[9] p-3 flex flex-col items-start"
  >
    <div class="items-center justify-between">
      <a href="/suggest">
        <img src="/logo.svg" class="p-4" alt="" />
      </a>
      <a
        href="/settings/profile"
        class="block border border-color rounded-lg p-2 w-[12.5rem] my-2 border-dashed hover:border-solid"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <UAvatar :src="user?.image || '/blank.webp'" />
          <div class="text-ellipsis overflow-hidden">
            <p class="">
              {{ user?.name || "" }}
            </p>
            <p class="text-ellipsis overflow-hidden text-color text-sm">
              {{ user?.email || "" }}
            </p>
          </div>
        </div>
      </a>
      <UButton
        icon="i-heroicons-arrow-trending-up"
        variant="ghost"
        label="Hot products"
        to="/suggest"
        :trailing="false"
        size="lg"
        class="w-full"
      />
      <UButton
        icon="i-heroicons-magnifying-glass"
        variant="ghost"
        label="Products"
        to="/products"
        :trailing="false"
        size="lg"
        class="w-full"
      />
      <UButton
        icon="i-heroicons-inbox"
        variant="ghost"
        label="Collections"
        to="/collections"
        :trailing="false"
        size="lg"
        class="w-full"
      />
      <UButton
        icon="i-heroicons-user-group"
        variant="ghost"
        label="Admin"
        to="/admin/users"
        size="lg"
        class="w-full"
        :trailing="false"
        v-if="user?.roles.map((role) => role.name).includes('Admin')"
      />
    </div>
    <div class="w-full">
      <UButton
        icon="i-heroicons-banknotes"
        variant="ghost"
        label="Billing"
        size="lg"
        class="w-full"
        to="/settings/billing"
        :trailing="false"
      />
      <UButton
        icon="i-heroicons-bell"
        variant="ghost"
        label="Notifications"
        size="lg"
        class="w-full"
        to="/notifications"
        :trailing="false"
      />
      <ClientOnly>
        <UButton
        :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        variant="ghost"
        :label="isDark ? 'Light mode' : 'Dark mode'"
        size="lg"
        class="w-full"
        @click="theme.preference = isDark ? 'light' : 'dark'"
        :trailing="false"
        />
      </ClientOnly>
      <UButton
        icon="i-heroicons-arrow-left-on-rectangle"
        variant="ghost"
        label="Logout"
        size="lg"
        class="w-full"
        @click="
          signOut({
            callbackUrl: '/',
          })
        "
        :trailing="false"
      />
    </div>
  </div>
</template>

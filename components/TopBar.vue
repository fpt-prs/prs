<template>
  <div
    class="dark:bg-gray-950 bg-white p-2 h-16 flex justify-between items-center border-b border-color"
  >
    <div class="flex items-center">
      <UButton
        icon="i-heroicons-bars-3"
        variant="ghost"
        label=""
        @click="isSidebarOpen = true"
        size="lg"
        color="black"
        :trailing="false"
      />
      <a href="/suggest">
        <img src="/logo.svg" class="p-4" alt="" />
      </a>
    </div>
    <a href="/settings/profile">
      <img
        :src="user?.image || '/blank.webp'"
        alt=""
        class="w-8 h-8 rounded-full"
      />
    </a>
  </div>
  <USlideover v-model="isSidebarOpen" side="left">
    <UButton
      icon="i-heroicons-bars-3"
      variant="ghost"
      label=""
      @click="isSidebarOpen = false"
      size="lg"
      color="black"
      :trailing="false"
      class="m-5"
    />
    <div class="p-5 flex flex-col gap-2 justify-between grow">
      <div class="">
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
      <div class="">
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
  </USlideover>
</template>

<script setup>
const isSidebarOpen = ref(false);
const { getSession, signOut } = useAuth();
const session = await getSession();
const user = session?.user;
let theme = useColorMode();
const isDark = computed(() => theme.value === "dark");
</script>

<style></style>

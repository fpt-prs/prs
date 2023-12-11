<script setup>
const { getSession, signOut } = useAuth();
const session = await getSession();
const user = session?.user;
let theme = useColorMode();
const isDark = computed(() => theme.value === "dark");
</script>

<template>
  <div
    class="fixed top-0 dark:bg-gray-950 bg-white h-full w-56 border-r border-color justify-between z-[9] p-3 flex flex-col items-start"
  >
    <div class="items-center justify-between">
      <a href="/suggest">
        <svg
          width="26"
          height="21"
          viewBox="0 0 262 217"
          xmlns="http://www.w3.org/2000/svg"
          class="logo"
        >
          <path
            d="M32.3373 9.45201C29.5889 5.77645 26.971 2.8369 23.0827 1.4515C18.6905 -0.507879 13.7622 -0.63449 9.14868 2.00549C7.42314 2.99288 6.27483 3.9091 5.31262 5.00055C-0.0482118 9.93573 -1.65748 17.8706 1.89747 24.5578L1.90916 24.552C2.72319 26.3182 3.52044 27.8226 4.49919 29.6533L50.8333 103.198L71.8931 136.626L80.0305 149.542L114.309 206.154C116.309 209.452 119.184 212.19 122.647 214.094C126.109 215.998 130.036 217 134.034 217C138.031 217 141.959 215.998 145.421 214.094C148.883 212.19 151.758 209.452 153.758 206.154L258.943 32.568C260.944 29.2708 261.998 25.5298 262 21.7211C262.002 17.9125 260.951 14.1705 258.953 10.8716C256.955 7.57275 254.08 4.8333 250.618 2.92875C247.156 1.0242 243.228 0.021766 239.231 0.0222512H160.223C128.919 0.0222512 105.833 13.1223 89.9482 38.6799L85.2906 46.3623L84.1262 48.2829L106.563 79.5229L120.369 56.7349C130.918 40.1523 142.902 34.1106 161.51 34.1106L216.648 34.1223L133.997 170.499L110.557 131.743L110.574 131.712L109.698 130.321L92.7573 102.311L71.3179 69.4096L46.7776 30.4623L32.3373 9.45201Z"
          ></path>
          <path
            d="M18.2142 159.003C17.6588 159.944 17.0052 161.273 16.6581 162.262C14.9674 167.511 16.1196 173.202 19.5767 177.436C19.7473 177.672 19.9266 177.882 20.1151 178.062C21.3446 179.424 22.8273 180.612 24.5433 181.557C32.7288 186.067 43.1377 183.347 47.8601 175.487C48.8306 174.429 49.6949 173.28 50.438 172.054L61.1656 154.34L39.5228 121.854L38.2661 123.927L35.7526 128.073L30.7257 136.364L18.2142 159.003Z"
          ></path>
        </svg>
      </a>
      <a
        href="/settings/profile"
        class="block border border-color rounded-lg p-2 w-[12.5rem] my-2 border-dashed hover:border-solid"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <UAvatar
            :src="user?.image || '/blank.webp'"
            onerror="this.src='/blank.webp'"
          />
          <div class="text-ellipsis overflow-hidden">
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
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

<style>
.dark .logo {
  fill: #fff;
}

.logo {
  fill: #000;
  margin: 1rem 0.5rem;
}
</style>

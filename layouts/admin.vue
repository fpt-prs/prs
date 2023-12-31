<script setup>
const { getSession, signOut } = useAuth();
const session = await getSession();
const user = session?.user;

const isAuthorized = (permission) => {
  return user?.roles[0].permissions
    .map((permission) => permission.name)
    .includes(permission);
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex max-lg:flex-col h-full">
      <div
        class="p-2 lg:border-r border-color overflow-x-auto lg:min-h-screen max-lg:hidden fixed w-44"
      >
        <ul class="flex lg:flex-col">
          <UButton
            icon="i-heroicons-user-circle"
            variant="ghost"
            size="lg"
            label="Users"
            :trailing="false"
            to="/admin/users"
            v-if="isAuthorized('user.read.all')"
          />
          <UButton
            icon="i-heroicons-user-group"
            variant="ghost"
            size="lg"
            label="Roles"
            :trailing="false"
            to="/admin/roles"
            v-if="isAuthorized('role.read.all')"
          />
          <UButton
            icon="i-heroicons-shield-check"
            variant="ghost"
            size="lg"
            label="Permissions"
            :trailing="false"
            to="/admin/permissions"
            v-if="isAuthorized('permission.read.all')"
          />
          <UButton
            icon="i-heroicons-bell"
            size="lg"
            variant="ghost"
            label="Notifications"
            :trailing="false"
            to="/admin/notifications"
            v-if="isAuthorized('notification.read.all')"
          />
          <UButton
            icon="i-heroicons-currency-dollar"
            size="lg"
            variant="ghost"
            label="Payment"
            :trailing="false"
            to="/admin/payment"
            v-if="isAuthorized('payment.read.all')"
          />
          <UButton
            icon="i-heroicons-banknotes"
            size="lg"
            variant="ghost"
            label="Subscriptions"
            :trailing="false"
            to="/admin/subsctiptions"
            v-if="isAuthorized('payment.read.all')"
          />
          <UButton
            icon="i-heroicons-qr-code"
            size="lg"
            variant="ghost"
            label="Bank accounts"
            :trailing="false"
            to="/admin/accounts"
            v-if="isAuthorized('payment.read.all')"
          />
        </ul>
      </div>
      <div
        class="p-5 border-b border-color overflow-x-auto lg:min-w-[20ch] lg:hidden"
      >
        <ul class="flex gap-5">
          <UButton
            icon="i-heroicons-user-circle"
            size="lg"
            label="Users"
            :trailing="false"
            to="/admin/users"
          />
          <UButton
            icon="i-heroicons-user-group"
            size="lg"
            label="Roles"
            :trailing="false"
            to="/admin/roles"
          />
          <UButton
            icon="i-heroicons-shield-check"
            size="lg"
            label="Permissions"
            :trailing="false"
            to="/admin/permissions"
          />
          <UButton
            icon="i-heroicons-globe-alt"
            size="lg"
            label="Crawl"
            :trailing="false"
            to="/admin/crawl"
          />
          <UButton
            icon="i-heroicons-bell"
            size="lg"
            label="Notifications"
            :trailing="false"
            to="/admin/notifications"
          />
          <UButton
            icon="i-heroicons-currency-dollar"
            size="lg"
            label="Payment"
            :trailing="false"
            to="/admin/payment"
          />
          <UButton
            icon="i-heroicons-banknotes"
            size="lg"
            label="Subscriptions"
            :trailing="false"
            to="/admin/subsctiptions"
          />
          <UButton
            icon="i-heroicons-banknotes"
            size="lg"
            label="Bank accounts"
            :trailing="false"
            to="/admin/accounts"
          />
        </ul>
      </div>
      <div class="w-full overflow-y-auto pb-24 lg:ml-44">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.nuxt-link-active {
  font-weight: bold;
}
</style>

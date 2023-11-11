<script setup>
useHead({
  title: "Profile",
});
const { getSession } = useAuth();
const session = await getSession();
const user = session?.user;
</script>

<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Profile</p>
      <p class="border-y border-color px-4 py-3">Profile detail</p>
      <div class="space-y-3 p-4 max-w-[50ch]">
        <div>
          <span>Email:</span>
          <span class="text-color pl-3">{{ user.email }}</span>
        </div>
        <div>
          <span>Name:</span>
          <span class="text-color pl-3">{{ user.name }}</span>
        </div>
        <div class="">
          <span>Active status:</span>
          <span class="text-color pl-3">
            {{ user.isActive ? "Active" : "Inactive" }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

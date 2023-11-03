<script setup>
useHead({
  title: "Profile",
});
const { getSession } = useAuth();
const session = await getSession();

</script>

<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Profile</p>
      <p class="border-y border-color px-4 py-3">Profile detail</p>
      <div class="space-y-3 p-4 max-w-[50ch]">
        <div>
          <span>Email:</span>
          <span class="text-gray-500 pl-3">{{ session?.user.email }}</span>
        </div>
        <div>
          <span>Name:</span>
          <span class="text-gray-500 pl-3">{{ session?.user.name }}</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

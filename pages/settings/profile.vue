<script setup>
useHead({
  title: 'Profile',
})
</script>

<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Profile</p>
      <p class="border-y border-gray-800 px-4 py-3">Profile detail</p>
      <form action="">
        <div class="space-y-3 p-4 max-w-[50ch]">
          <div>
            Email:
            <span class="text-gray-600 pl-3">abcdeafgafa@gmail.com</span>
          </div>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

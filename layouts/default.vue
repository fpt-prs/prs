<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} · PRS`;
  },
});
</script>

<template>
  <div class="h-screen flex flex-col dark:bg-gray-900 bg-white">
    <Sidebar />
    <div class="grow overflow-x-auto mt-14">
      <slot />
    </div>
  </div>
</template>

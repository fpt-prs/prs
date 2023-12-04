<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} · PRS`;
  },
});
</script>

<template>
  <div class="min-h-screen flex dark:bg-gray-950 bg-white">
    <div class="">
      <Navbar />
    </div>
    <div class="grow overflow-x-auto ml-56">
      <slot />
      <a
        href="/"
        target="_blank"
        class="fixed bottom-6 right-6 bg-color rounded-full h-16 w-16 flex justify-center items-center"
      >
        <UIcon
          name="i-heroicons-chat-bubble-left-right-solid"
          color="blue"
          class="h-8 w-8"
        />
      </a>
    </div>
  </div>
</template>

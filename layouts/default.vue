<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} · PRS`;
  },
});
</script>

<template>
  <div class="min-h-screen flex dark:bg-gray-950 bg-white">
    <div class="max-md:hidden">
      <Navbar />
    </div>
    <div class="md:hidden fixed top-0 w-full z-[49]">
      <TopBar />
    </div>
    <div class="grow overflow-x-auto md:ml-56 max-md:mt-16">
      <slot />
      <a
        href="https://m.me/fptprs"
        target="_blank"
        class="fixed bottom-6 right-6 bg-color rounded-full md:h-16 md:w-16 h-10 w-10 flex justify-center items-center"
      >
        <UIcon
          name="i-heroicons-chat-bubble-left-right-solid"
          color="blue"
          class="md:h-8 md:w-8"
        />
      </a>
    </div>
  </div>
</template>

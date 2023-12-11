<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} · PRS`;
  },
});
</script>

<template>
  <div class="min-h-screen flex dark:bg-gray-950 bg-white">
    <div class="max-lg:hidden">
      <Navbar />
    </div>
    <div class="lg:hidden fixed top-0 w-full z-[49]">
      <TopBar />
    </div>
    <div class="grow overflow-x-auto lg:ml-56 max-lg:mt-16">
      <slot />
      <a
        href="https://m.me/fptprs"
        target="_blank"
        class="fixed bottom-6 right-6 bg-color rounded-full lg:h-16 lg:w-16 h-10 w-10 flex justify-center items-center"
      >
        <UIcon
          name="i-heroicons-chat-bubble-left-right-solid"
          color="blue"
          class="lg:h-8 lg:w-8"
        />
      </a>
    </div>
  </div>
</template>

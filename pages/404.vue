<template>
  <div
    class="w-screen h-screen flex flex-col gap-5 justify-center items-center px-5"
  >
    <div class="text-4xl md:text-6xl text-center">What you ask for does not exist</div>
    <UButton
      label="Go back home"
      size="xl"
      color="gray"
      to="/suggest"
    />
  </div>
</template>

<script setup>
useHead({
  title: "404",
  description: "Page not found",
});
</script>

<style></style>

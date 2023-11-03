<template>
  <UButton
    class="absolute top-5 left-5"
    color="gray"
    variant="ghost"
    label="Back"
    icon="i-heroicons-arrow-left"
    @click="$router.back()"
  />

  <div class="w-full h-screen flex flex-col gap-5 items-center justify-center">
    <img
      src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
      alt="hero"
      class="w-52 h-52"
    />

    <p class="text-xl">Amount: {{ amount }} VND</p>

    <p class="text-2xl">Content: AJVADSAIF</p>
  </div>
</template>

<script setup>
// get query
const { query } = useRoute();
const amount = query.amount;
</script>

<style></style>

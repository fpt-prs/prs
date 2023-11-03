<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Billing</p>
      <p class="border-y border-color px-4 py-3">Billing detail</p>
      <div class="px-4 py-3"></div>
      <p class="border-y border-color px-4 py-3">Purchase new views</p>
      <div class="px-4 py-3">
        <div class="grid grid-cols-3 gap-4">
          <UCard
            class="cursor-pointer hover:bg-gray-600"
            as="a"
            href="/purchase?amount=50000"
          >
            <p>50.000 VND</p>
            <p class="text-gray-500">20 views</p>
          </UCard>
          <UCard
            class="cursor-pointer bg-gray-600"
            as="a"
            href="/purchase?amount=100000"
          >
            <p>100.000 VND</p>
            <p class="text-gray-500">50 views</p>
          </UCard>
          <UCard
            class="cursor-pointer bg-gray-600"
            as="a"
            href="/purchase?amount=200000"
          >
            <p>200.000 VND</p>
            <p class="text-gray-500">120 views</p>
          </UCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Billing",
});
</script>

<style></style>

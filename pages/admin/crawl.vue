<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3 border-b border-color">Crawl</p>
    <div class="p-4 space-y-4 max-w-2xl">
      <p class="">Start new crawl</p>
      <UFormGroup label="URL">
        <UInput placeholder="Enter URL" />
      </UFormGroup>
      <UFormGroup label="Limit">
        <UInput placeholder="Enter limit" />
      </UFormGroup>
      <UButton
        trailing-icon="i-heroicons-arrow-right"
        label="Start"
      />
    </div>

    <p class="px-4 py-3">Crawl status</p>
    <p class="px-4 py-3">Crawl history</p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// meta
useHead({
  title: "Crawl Management",
});
</script>

<style></style>

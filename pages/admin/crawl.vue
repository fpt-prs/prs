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
      <UButton trailing-icon="i-heroicons-arrow-right" label="Start" />
    </div>

    <div class="p-4 space-y-4 max-w-2xl">
      <p class="">Crawl status</p>
      <div
        class="px-4 pb-4 border bg-gray-100 dark:bg-gray-800 border-color rounded-xl h-40 overflow-auto"
        ref="logEl"
      >
        <p
          v-for="log in logs"
          :key="log.time.toISOString()"
          class="text-gray-500 dark:text-gray-400 font-mono"
        >
          [{{ log.time.toLocaleString() }}] - {{ log.log }}
        </p>
      </div>
    </div>
    <p class="px-4 py-3">Crawl history</p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// meta
useHead({
  title: "Crawl Management",
});

// log
const logEl = ref();
const logs = Array.from(Array(50).keys()).map((i) => {
  return {
    time: new Date(Date.now() - i * 1000),
    log: "Log " + i,
  };
});
onMounted(() => {
  // scroll to bottom
  logEl.value.scrollTo(0, logEl.value.scrollHeight);
});

</script>

<style></style>

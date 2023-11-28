<template>
  <div>
    <div
      class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
    >
      <UPagination
        v-model="page"
        :total="totalElements"
        :page-count="size"
        color="gray"
      />
    </div>
    <div
      class="grow w-full h-screen text-center flex justify-center items-center"
      v-if="isLoading"
    >
      <UIcon name="i-heroicons-arrow-path" class="animate-spin" size="lg" />
      <p class="text-xl ml-1">Loading...</p>
    </div>
    <div
      class="grow w-full h-full my-20 text-center flex flex-col justify-center items-center"
      v-if="!isLoading && elements?.length === 0"
    >
      <UIcon
        name="i-heroicons-inbox"
        class="text-color w-12 h-12"
        size="xl"
      />
      <p class="text-xl ml-1 text-color">No Item</p>
    </div>
    <slot name="all" :data="elements" />
    <div class="gap-5 p-5 space-y-5" v-if="type === 'item'">
      <slot name="item" :data="element" v-for="element in elements" />
    </div>
    <div
      class="flex justify-between items-center gap-5 p-5 dark:border-t border-color"
    >
      <UPagination
        v-model="page"
        :total="totalElements"
        :page-count="size"
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const page = ref(1);
const totalElements = ref(0);
const elements = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  isLoading.value = true;

  if (!props.loader) {
    return;
  }

  const res = await props.loader(page.value - 1, props.size);
  const response = await res.json();
  let body = "{}";
  if (response) {
    body = response.body;
  }

  const detail = JSON.parse(body);

  elements.value = detail.content;
  totalElements.value = parseInt(detail.totalElements);
  isLoading.value = false;
};

watch(page, fetchData);

const props = defineProps({
  loader: {
    type: Function as PropType<(page: number, size: number) => Promise<any>>,
  },
  size: {
    type: Number,
    default: 5,
  },
  type: {
    type: String,
    default: "item",
  },
});
</script>

<style></style>

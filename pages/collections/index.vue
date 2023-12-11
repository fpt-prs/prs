<script setup>
const currentId = ref(0);

useHead({
  title: "Collections",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const collections = ref([]);
onMounted(async () => {
  await fetchCollection();
  currentId.value = collections.value[0].id;
  await fetchDetail();
});

const fetchCollection = async () => {
  const response = await fetch("/api/collection/list");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body;
};

const collection = ref({});
const products = ref([]);
watch(currentId, async () => {
  await fetchDetail();
});
const fetchDetail = async () => {
  const responseProducts = await fetch(`/api/collection?id=${currentId.value}`);
  const dataProducts = await responseProducts.json();
  const result = JSON.parse(dataProducts.body);
  collection.value = result;
  products.value = result.products;
};

const exportCollection = async () => {
  const response = await fetch(`/api/export?collectionId=${currentId.value}`);
  const data = await response.json();
  const result = data.body;
  const url = window.URL.createObjectURL(
    new Blob([result], { type: "text/csv" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export.csv");
  document.body.appendChild(link);
  link.click();
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex max-lg:flex-col max-w-screen min-h-screen">
      <div class="p-5 border-r border-color max-lg:hidden">
        <ul class="flex flex-col sticky top-0">
          <UButton
            v-for="c in collections"
            :key="c.id"
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            :label="formatDateTime(c.created)"
            :trailing="false"
            @click="currentId = c.id"
            class="whitespace-nowrap"
          />
        </ul>
      </div>
      <div
        class="p-5 border-b border-color lg:hidden flex gap-4 overflow-x-auto"
      >
        <UButton
          v-for="c in collections"
          :key="c.id"
          color="gray"
          variant="solid"
          :label="formatDateTime(c.created)"
          :trailing="false"
          @click="currentId = c.id"
          class="whitespace-nowrap"
        />
      </div>
      <div class="grow min-w-0">
        <div
          class="w-full flex justify-center items-center px-4 py-3 pt-12"
          v-if="!collection.created"
        >
          <p class="text-4xl text-center text-color">
            Select a collection or create a new one to view products
          </p>
        </div>

        <div
          class="w-full flex justify-between px-4 py-3 items-center"
          v-if="collection.created"
        >
          <div class="">
            <p class="text-xl">{{ formatDateTime(collection.created) }}</p>
          </div>
          <UButton
            icon="i-heroicons-arrow-down-on-square"
            color="gray"
            size="lg"
            label="Export"
            :trailing="false"
            class="whitespace-nowrap"
            @click="exportCollection"
          />
        </div>
        <div class="px-4 grid lg:grid-cols-3 gap-4" v-if="collection.created">
          <div class="p-4 border border-color rounded-lg">
            <p class="">Category</p>
            <p class="text-xl text-color">
              {{ collection.category || "None" }}
            </p>
          </div>
          <div class="p-4 border border-color rounded-lg">
            <p class="">Order by</p>
            <p class="text-xl text-color">
              {{ collection.criteria || "None" }}
            </p>
          </div>
          <div class="p-4 border border-color rounded-lg">
            <p class="">Position</p>
            <p class="text-xl text-color">
              {{ collection.ranking || "None" }}
            </p>
          </div>
        </div>
        <div class="space-y-3 p-4 pb-24">
          <div class="flex items-center" v-for="row in products">
            <a class="min-w-0 grow block" :href="`/product/${row.productCode}`">
              <div class="lg:flex">
                <img
                  class="w-full h-full lg:w-36 lg:h-36 mr-4"
                  :src="
                    row.images[0]?.imageUrl || 'https://via.placeholder.com/150'
                  "
                  alt="Product image"
                />
                <div class="break-words p-2 truncate">
                  <p class="truncate">{{ row.name }}</p>
                  <div class="text-gray-500 mt-2">
                    {{ "$" + row.price }}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

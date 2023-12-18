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
});

const fetchCollection = async () => {
  const response = await fetch("/api/collection/list");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body;
};

const collection = ref({});
const products = ref([]);
const isLoading = ref(false);
watch(currentId, async () => {
  await fetchDetail();
});
const fetchDetail = async () => {
  isLoading.value = true;
  const responseProducts = await fetch(`/api/collection?id=${currentId.value}`);
  const dataProducts = await responseProducts.json();
  const result = JSON.parse(dataProducts.body);
  collection.value = result;
  products.value = result.products;
  isLoading.value = false;
};

const deletingId = ref(0);
const deleteCollection = async () => {
  const response = await fetch(`/api/collection?id=${deletingId.value}`, {
    method: "DELETE",
  });
  const status = response.status;
  if (status === 200) {
    await fetchCollection();
    currentId.value = collections.value[0].id;
  }
};

const isExporting = ref(false);
const exportCollection = async () => {
  isExporting.value = true;
  const response = await fetch(`/api/export?collectionId=${currentId.value}`);
  const data = await response.json();
  const result = data.body;
  const url = window.URL.createObjectURL(
    new Blob([result], { type: "text/csv" })
  );
  const link = document.createElement("a");
  link.href = url;
  const today = formatDateTime(new Date()).replace(" ", "_");
  link.setAttribute("download", today + ".csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
  isExporting.value = false;
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
            :variant="currentId === c.id ? 'solid' : 'ghost'"
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
          :variant="currentId === c.id ? 'solid' : 'ghost'"
          :label="formatDateTime(c.created)"
          :trailing="false"
          @click="currentId = c.id"
          class="whitespace-nowrap"
        />
      </div>
      <div class="grow min-w-0">
        <div
          class="w-full flex justify-center items-center px-4 py-3 pt-12"
          v-if="!collection.created && !isLoading"
        >
          <p class="text-4xl text-center text-color">
            Select a collection or create a new one to view products
          </p>
        </div>

        <div
          class="w-full h-full flex justify-center items-center px-4 py-3"
          v-if="isLoading"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="animate-spin text-4xl text-color mr-2"
          />
          <p class="text-3xl text-center text-color">Loading...</p>
        </div>

        <div
          class="w-full md:flex justify-between px-4 py-3 items-center"
          v-if="collection.created && !isLoading"
        >
          <div class="">
            <p class="text-xl py-2">{{ formatDateTime(collection.created) }}</p>
          </div>
          <div class="flex gap-4">
            <ModalConfirmButton
              icon="i-heroicons-trash"
              color="red"
              variant="outline"
              label="Delete"
              class="whitespace-nowrap"
              @start="deletingId = collection.id"
              @confirm="deleteCollection"
            />
            <UButton
              icon="i-heroicons-arrow-down-on-square"
              :loading="isExporting"
              color="gray"
              size="lg"
              label="Export"
              :trailing="false"
              class="whitespace-nowrap"
              @click="exportCollection"
            />
          </div>
        </div>
        <div
          class="px-4 grid lg:grid-cols-3 gap-4"
          v-if="collection.created && !isLoading"
        >
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
            <p class="text-xl text-color break-words">
              {{ collection.ranking || "None" }}
            </p>
          </div>
        </div>
        <div
          class="space-y-3 p-4 pb-24"
          v-if="collection.created && !isLoading"
        >
          <div class="flex items-center" v-for="row in products">
            <a class="min-w-0 grow block" :href="`/product/${row.productCode}`">
              <div class="lg:flex">
                <img
                  class="w-full h-full lg:w-36 lg:h-36 mr-4 rounded"
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

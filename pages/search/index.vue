<script setup>
useHead({
  title: "Search",
});

const products = ref([]);

const fetchData = async () => {
  const response = await fetch(`/api/suggest`);
  const data = await response.json();
  products.value = JSON.parse(data.body);
};

onMounted(async () => {
  await fetchData();
});

const viewMode = ref("list");

await fetchData();
</script>

<template>
  <NuxtLayout name="default">
    <div class="">
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
      >
        <p class="font-semibold text-lg">Trending products</p>
        <UButton
          color="gray"
          label="Export"
          :trailing="false"
          icon="i-heroicons-arrow-down-tray"
        />
      </div>
      <div class="flex mx-5 mt-5">
        <UButton
          color="gray"
          :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
          :trailing="false"
          icon="i-heroicons-squares-2x2"
          @click="viewMode = 'grid'"
        />
        <UButton
          color="gray"
          :variant="viewMode === 'dense' ? 'solid' : 'ghost'"
          :trailing="false"
          icon="i-heroicons-view-columns"
          @click="viewMode = 'dense'"
        />
        <UButton
          color="gray"
          :variant="viewMode === 'list' ? 'solid' : 'ghost'"
          :trailing="false"
          icon="i-heroicons-list-bullet"
          @click="viewMode = 'list'"
        />
      </div>

      <div
        class="w-full h-20 text-center flex justify-center items-center"
        v-if="products?.length === 0"
      >
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" size="lg" />
        <p class="text-xl ml-1">Loading...</p>
      </div>

      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-5 p-5"
        v-if="viewMode === 'grid'"
      >
        <a class="" :href="`/product/${row.productId}`" v-for="row in products">
          <div class="">
            <img
              class="w-full h-80 mr-4"
              :src="
                row.images[0]?.imageUrl || 'https://via.placeholder.com/150'
              "
              loading="lazy"
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
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-5 p-5"
        v-if="viewMode === 'dense'"
      >
        <a class="" :href="`/product/${row.productId}`" v-for="row in products">
          <div class="">
            <img
              class="w-full h-60 mr-4"
              :src="
                row.images[0]?.imageUrl || 'https://via.placeholder.com/550'
              "
              loading="lazy"
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
      <div class="gap-5 p-5 space-y-5" v-if="viewMode === 'list'">
        <a
          class="block"
          :href="`/product/${row.productId}`"
          v-for="row in products"
        >
          <div class="flex">
            <img
              class="w-36 h-36 mr-4"
              :src="
                row.images[0]?.imageUrl || 'https://via.placeholder.com/150'
              "
              loading="lazy"
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
  </NuxtLayout>
</template>

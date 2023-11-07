<script setup>
useHead({
  title: "Search",
});

const router = useRouter();
const route = useRoute();
const { field, order, page: pageStr } = route.query;

const sortCriterias = [
  { name: "Price: Low to High", field: "price", order: "asc" },
  { name: "Price: High to Low", field: "price", order: "desc" },
];
const sortCriteria = ref(
  sortCriterias.find((c) => c.field === field && c.order === order) ||
    sortCriterias[0]
);

const products = ref([]);
const total = ref(0);

watch(sortCriteria, async (newCriteria) => {
  router.push({
    query: {
      field: newCriteria.field,
      order: newCriteria.order,
    },
  });
  await fetchData();
});

const fetchData = async () => {
  const searchParams = new URLSearchParams();
  searchParams.append("field", sortCriteria.value.field);
  searchParams.append("order", sortCriteria.value.order);
  const { data } = await useFetch(`/api/suggest?${searchParams.toString()}`);
  let body = "{}";
  const response = data.value;
  if (response) {
    body = response.body;
  }
  const detail = JSON.parse(body);
  products.value = detail.data;
  total.value = parseInt(detail.total);
};

fetchData();
const collections = ref([]);

onMounted(async () => {
  const response = await fetch(`/api/collection/all`);
  const data = await response.json();
  const result = JSON.parse(data.body);
  collections.value = result.data;
});

const viewMode = ref("list");
</script>

<template>
  <NuxtLayout name="default">
    <div class="">
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
      >
        <p class="font-semibold text-lg">Trending products</p>
        <USelectMenu
          v-model="sortCriteria"
          :options="sortCriterias"
          option-attribute="name"
          color="gray"
        >
          <template #option="{ option: criteria }">
            <span class="">{{ criteria.name }}</span>
          </template>
        </USelectMenu>
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
        v-if="products.length === 0"
      >
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" size="lg" />
        <p class="text-xl ml-1">Loading...</p>
      </div>

      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-5 p-5"
        v-if="viewMode === 'grid'"
      >
        <a
          class=""
          :href="`/product/${row.product_id}`"
          v-for="row in products"
        >
          <div class="">
            <img
              class="w-full h-80 mr-4"
              :src="
                row.image_urls[0]?.image_url.replace('75', '320') ||
                'https://via.placeholder.com/150'
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
        <a
          class=""
          :href="`/product/${row.product_id}`"
          v-for="row in products"
        >
          <div class="">
            <img
              class="w-full h-60 mr-4"
              :src="
                row.image_urls[0]?.image_url.replace('75', '320') ||
                'https://via.placeholder.com/550'
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
      <div class="gap-5 p-5 space-y-5" v-if="viewMode === 'list'">
        <a
          class="block"
          :href="`/product/${row.product_id}`"
          v-for="row in products"
        >
          <div class="flex">
            <img
              class="w-36 h-36 mr-4"
              :src="
                row.image_urls[0]?.image_url.replace('75', '320') ||
                'https://via.placeholder.com/150'
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
  </NuxtLayout>
</template>

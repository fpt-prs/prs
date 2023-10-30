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

const actions = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil",
      action: "edit",
      to: `/product/${row.product_id}/edit`,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash",
      action: "delete",
      click: () => {
        products.value = products.value.filter((p) => p.id !== row.id);
      },
    },
  ],
];

const products = ref([]);
const total = ref(0);
const page = ref(parseInt(pageStr || "1"));

watch(sortCriteria, async (newCriteria) => {
  router.push({
    query: {
      field: newCriteria.field,
      order: newCriteria.order,
      page: "1",
    },
  });
  await fetchData();
});

watch(page, async (newPage) => {
  router.push({
    query: {
      field: sortCriteria.value.field,
      order: sortCriteria.value.order,
      page: newPage.toString(),
    },
  });
  await fetchData();
});

const fetchData = async () => {
  products.value = [];

  const params = new URLSearchParams();
  params.append("field", sortCriteria.value.field);
  params.append("order", sortCriteria.value.order);
  params.append("page", page.value.toString());

  const { data } = await useFetch(`/api/products?${params.toString()}`);

  const response = data.value;
  let body = "{}";
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
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex flex-col h-full">
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
      >
        <p class="font-semibold text-lg">Manage products</p>
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
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
      >
        <UPagination
          v-model="page"
          :total="total"
          :per-page="10"
          color="gray"
        />
      </div>
      <div
        class="grow w-full h-full text-center flex justify-center items-center"
        v-if="products.length === 0"
      >
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" size="lg" />
        <p class="text-xl ml-1">Loading...</p>
      </div>
      <div class="gap-5 p-5 space-y-5">
        <div class="flex items-center" v-for="row in products">
          <a class="flex min-w-0" :href="`/product/${row.product_id}`">
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
          </a>
          <UDropdown
            :items="actions(row)"
            :popper="{ placement: 'bottom-start' }"
          >
            <UButton
              label=""
              trailing-icon="i-heroicons-ellipsis-horizontal"
              color="black"
              variant="ghost"
            />
          </UDropdown>
        </div>
      </div>
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-t border-color"
      >
        <UPagination
          v-model="page"
          :total="total"
          :per-page="10"
          color="gray"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

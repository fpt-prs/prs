<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const query = route.query;
const { field, order, page: pageQ } = query;
const page = ref(parseInt((pageQ as string) || "1"));
const pageSize = 15;
const value = ref("");
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

watch(page, async (newPage: any) => {
  router.push({
    query: {
      page: newPage,
      field: sortCriteria.value.field,
      order: sortCriteria.value.order,
      term: value.value,
    },
  });
  await fetchData();
});

watch(sortCriteria, async (newCriteria: any) => {
  router.push({
    query: {
      page: 1,
      field: newCriteria.field,
      order: newCriteria.order,
      term: value.value,
    },
  });
  page.value = 1;
  await fetchData();
});

watch(value, async (newTerm: any) => {
  router.push({
    query: {
      page: 1,
      field: sortCriteria.value.field,
      order: sortCriteria.value.order,
      term: newTerm,
    },
  });
  page.value = 1;
  await fetchData();
});

const fetchData = async () => {
  const searchParams = new URLSearchParams();
  searchParams.append("field", sortCriteria.value.field);
  searchParams.append("order", sortCriteria.value.order);
  searchParams.append("page", page.value + "");
  searchParams.append("pageSize", pageSize + "");
  searchParams.append("term", value.value);
  const { data } = await useFetch("/api/data?" + searchParams.toString());
  let body = "{}";
  const response = data.value as any;
  if (response) {
    body = response.body;
  }
  const detail = JSON.parse(body);
  products.value = detail.data;
  total.value = parseInt(detail.total);
};

fetchData();

const columns = [
  {
    label: "Detail",
    key: "detail",
  },
  {
    label: "Price",
    key: "price",
  },
  {
    label: "Actions",
    key: "actions",
  },
];

const collections = ["Favourite", "Collections A"];
const selected = ref([]);
</script>

<template>
  <div class="">
    <div class="flex items-center gap-5 p-5 border-b border-gray-800">
      <UInput
        v-model="value"
        size="sm"
        placeholder="Search..."
        class="grow"
        color="gray"
      />
      <USelectMenu
        v-model="sortCriteria"
        :options="sortCriterias"
        option-attribute="name"
        color="gray"
      >
        <template #option="{ option: criteria }">
          <span class="truncate">{{ criteria.name }}</span>
        </template>
      </USelectMenu>
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="primary"
        variant="solid"
        label="Search"
        :trailing="false"
        to="/"
        size="sm"
      />
    </div>
    <div class="">
      <div class="flex justify-center">
        <UPagination
          v-model="page"
          :page-count="pageSize"
          :total="total"
          class="py-5"
        />
      </div>
      <UTable
        :rows="products"
        :columns="columns"
        :ui="{
          wrapper: 'border-y border-gray-800',
          td: {
            base: 'whitespace-normal break-word',
          },
        }"
      >
        <template #detail-data="{ row }">
          <a class="" :href="row.url" target="_blank">
            <div class="break-words text-sm">{{ row.name }}</div>
            <p class="text-gray-500">{{ "#" + row.product_id }}</p>
          </a>
        </template>
        <template #actions-data="{ row }">
          <slot name="actions" :row="row" >
            <div class=""></div>
          </slot>
        </template>
      </UTable>
      <div class="flex justify-center">
        <UPagination
          v-model="page"
          :page-count="pageSize"
          :total="total"
          class="py-5"
        />
      </div>
    </div>
  </div>
</template>

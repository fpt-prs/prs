<script setup lang="ts">
useHead({
  title: "Search",
});

const router = useRouter();
const route = useRoute();
const { field, order, page: pageStr } = route.query;
const page = ref(parseInt((pageStr as string) || "1"));
const pageSize = 15;
const searchTerm = ref("");

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
      term: searchTerm.value,
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
      term: searchTerm.value,
    },
  });
  page.value = 1;
  await fetchData();
});

watch(searchTerm, async (newTerm: any) => {
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
  searchParams.append("term", searchTerm.value);
  const { data } = await useFetch(`/api/data?${searchParams.toString()}`);
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

const collections = ref([] as any);

onMounted(async () => {
  const response = await fetch(`/api/collection/all`);
  const data = await response.json();
  const result = JSON.parse(data.body);
  collections.value = result.data;
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="">
      <div class="flex items-center gap-5 p-5 border-b border-gray-800">
        <UInput
          v-model="searchTerm"
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
        <Products :products="products" :columns="columns">
          <template #actions="{ row }">
            <UPopover>
              <UButton
                color="white"
                variant="ghost"
                label=""
                trailing-icon="i-heroicons-ellipsis-horizontal"
              />
              <template #panel>
                <UCard>
                  <p class="pb-2">Add to Collections</p>
                  <UCheckbox
                    v-for="collection in collections"
                    :name="collection.name"
                    :label="collection.name"
                  />
                </UCard>
              </template>
            </UPopover>
          </template>
        </Products>
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
  </NuxtLayout>
</template>

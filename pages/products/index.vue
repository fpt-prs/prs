<template>
  <NuxtLayout name="default">
    <div class="flex flex-col min-h-full">
      <div
        class="sticky top-0 flex justify-between items-center gap-5 p-5 dark:border-b border-color z-[100] bg-white dark:bg-gray-900"
      >
        <p class="font-semibold text-lg">Manage products</p>
        <div class="flex gap-4">
          <UButton
            color="gray"
            icon="i-heroicons-plus"
            label="New"
            to="/products/new"
            v-if="isAdmin"
          />
          <UInput
            v-model="search"
            @keyup.enter="
              () => {
                router.push({
                  query: {
                    field: sortCriteria.field,
                    order: sortCriteria.order,
                    page: '1',
                    search: search,
                  },
                });
                page = 1;
                fetchData();
              }
            "
            placeholder="Enter to Search..."
            color="gray"
            icon="i-heroicons-magnifying-glass"
          />
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
      </div>
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
      >
        <UPagination
          v-model="page"
          :total="totalElements"
          :per-page="10"
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
        class="grow w-full h-full text-center flex flex-col justify-center items-center"
        v-if="!isLoading && products?.length === 0"
      >
        <UIcon name="i-heroicons-circle-stack-solid" size="xl" />
        <p class="text-xl ml-1 text-color">No Item</p>
      </div>
      <div class="gap-5 p-5 space-y-5">
        <div class="flex items-center" v-for="row in products">
          <a class="flex min-w-0 grow" :href="`/product/${row.productCode}`">
            <img
              class="w-36 h-36 mr-4"
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
          </a>
          <div class="space-y-4 flex flex-col" v-if="isAdmin">
            <UButton
              label="Edit"
              icon="i-heroicons-pencil-square"
              color="blue"
              :to="`/product/${row.productCode}/edit`"
            />
            <ModalConfirmButton
              label="Delete"
              icon="i-heroicons-trash"
              color="red"
              class="w-28"
              v-if="row.isActive"
              @confirm="toggleActiveData(row)"
            />
            <ModalConfirmButton
              label="Active"
              icon="i-heroicons-check"
              color="green"
              class="w-28"
              v-else
              @confirm="toggleActiveData(row)"
            />
          </div>
        </div>
      </div>
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-t border-color"
      >
        <UPagination
          v-model="page"
          :total="totalElements"
          :per-page="10"
          color="gray"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Product Management",
});

const router = useRouter();
const route = useRoute();
const { field, order, page: pageStr, search: searchStr } = route.query;

const sortCriterias = [
  { name: "Price: Low to High", field: "price", order: "asc" },
  { name: "Price: High to Low", field: "price", order: "desc" },
  { name: "Name: A to Z", field: "name", order: "asc" },
  { name: "Name: Z to A", field: "name", order: "desc" },
];
const sortCriteria = ref(
  sortCriterias.find((c) => c.field === field && c.order === order) ||
    sortCriterias[0]
);

const products = ref([]);
const totalElements = ref(0);
const page = ref(parseInt(pageStr || "1"));
const search = ref(searchStr || "");
const isLoading = ref(false);

watch(sortCriteria, async (newCriteria) => {
  router.push({
    query: {
      field: newCriteria.field,
      order: newCriteria.order,
      page: "1",
    },
  });
  page.value = 1;
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
  isLoading.value = true;
  products.value = [];

  const params = new URLSearchParams();
  params.append("field", sortCriteria.value.field);
  params.append("order", sortCriteria.value.order);
  params.append("page", page.value.toString());
  params.append("search", search.value);

  const res = await fetch(`/api/products?${params.toString()}`);
  const response = await res.json();
  let body = "{}";
  if (response) {
    body = response.body;
  }

  const detail = JSON.parse(body);

  products.value = detail.content;
  totalElements.value = parseInt(detail.totalElements);
  isLoading.value = false;
};

onMounted(async () => {
  await fetchData();
});

const toggleActiveData = async (product) => {
  product.isActive = product.isActive === 1 ? 0 : 1;

  const statusChangeRequest = {
    id: product.id,
    isActive: product.isActive,
  };

  const response = await fetch("/api/products/status", {
    method: "PATCH",
    body: JSON.stringify(statusChangeRequest),
  });

  const status = response.status;
  const toast = useToast();

  if (status === 200) {
    toast.add({ title: "Product status updated successfully" });
  } else {
    toast.add({ title: "Error updating product status" });
  }

  await fetchData();
};

const { getSession } = useAuth();
const session = await getSession();
const isAdmin = await isAuthorized(session, "product.write.all");
</script>

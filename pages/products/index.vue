<template>
  <NuxtLayout name="default">
    <div class="flex flex-col min-h-full">
      <div
        class="sticky top-0 lg:flex justify-between items-center gap-5 p-5 dark:border-b border-color z-[48] bg-white dark:bg-gray-950"
      >
        <p class="font-semibold text-lg py-2">Products</p>
        <div class="flex max-lg:flex-col gap-4 lg:items-center">
          <UInput
            v-model="search"
            @keyup.enter="searchByName"
            placeholder="Press enter to search..."
            color="gray"
            icon="i-heroicons-magnifying-glass"
            class="max-lg:w-full"
          />
          <div class="flex max-md:flex-wrap max-lg:items-start gap-4">
            <UButton
              icon="i-heroicons-plus"
              label="New"
              to="/products/new"
              v-if="isAdmin"
            />
            <USelectMenu
              v-model="selectedCategory"
              :options="categories"
              class="cursor-pointer"
              placeholder="Select category"
              color="gray"
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
      </div>
      <div
        class="flex justify-between items-center gap-5 p-5 dark:border-b border-color"
        v-if="products.length > 0"
      >
        <UPagination
          v-model="page"
          :total="totalElements"
          :per-page="10"
          :max="isSmallScreen ? 3 : 5"
          color="gray"
          size="sm"
        />
      </div>
      <div
        class="grow w-full h-full text-center flex justify-center items-center"
        v-if="isLoading"
      >
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" size="lg" />
        <p class="text-xl ml-1">Loading...</p>
      </div>
      <div
        class="grow w-full h-full my-20 text-center flex flex-col justify-center items-center"
        v-if="!isLoading && products?.length === 0"
      >
        <UIcon name="i-heroicons-circle-stack-solid" size="xl" />
        <p class="text-xl ml-1 text-color">No Item</p>
      </div>
      <div
        class="gap-5 p-5 lg:space-y-5 space-y-16"
        v-if="!isLoading && products?.length !== 0"
      >
        <div class="md:flex items-center" v-for="row in products">
          <a class="md:flex min-w-0 grow" :href="`/product/${row.productCode}`">
            <img
              class="md:w-28 md:h-28 w-full h-full mr-4 rounded"
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
          <div
            class="gap-4 flex md:flex-col lg:items-stretch items-center"
            v-if="isAdmin"
          >
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
        v-if="products.length > 0"
      >
        <UPagination
          v-model="page"
          :total="totalElements"
          :per-page="10"
          :max="isSmallScreen ? 3 : 5"
          color="gray"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Products",
});

const router = useRouter();
const route = useRoute();
const {
  field,
  order,
  page: pageStr,
  search: searchStr,
  category: categoryStr,
} = route.query;

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

const categories = ref([]);
const selectedCategory = ref(categoryStr || "");

onMounted(async () => {
  const { data, status } = await fetchJson("/api/products/categories");
  if (status === 200) {
    categories.value = JSON.parse(data.body).filter((cate) => !!cate);
    categories.value.unshift("All");
  } else {
    newToastError("Something went wrong");
  }
});

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
      category: selectedCategory.value,
      page: "1",
    },
  });
  page.value = 1;
  sortCriteria.value = newCriteria;
  await fetchData();
});

watch(page, async (newPage) => {
  router.push({
    query: {
      field: sortCriteria.value.field,
      order: sortCriteria.value.order,
      category: selectedCategory.value,
      page: newPage.toString(),
    },
  });
  page.value = newPage;
  await fetchData();
});

watch(selectedCategory, async (newCategory) => {
  router.push({
    query: {
      field: sortCriteria.value.field,
      order: sortCriteria.value.order,
      category: newCategory,
      page: "1",
    },
  });
  page.value = 1;
  selectedCategory.value = newCategory;
  await fetchData();
});

const searchByName = async () => {
  router.push({
    query: {
      field: sortCriteria.field,
      order: sortCriteria.order,
      page: "1",
      search: search.value,
      category: selectedCategory.value,
    },
  });
  page.value = 1;
  await fetchData();
};

const fetchData = async () => {
  isLoading.value = true;

  const params = new URLSearchParams();
  params.append("field", sortCriteria.value.field);
  params.append("order", sortCriteria.value.order);
  params.append("page", page.value.toString());
  params.append("category", selectedCategory.value);
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
const isSmallScreen = useMedia("(max-width: 768px)");
</script>

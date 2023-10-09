<script setup lang="ts">
const page = ref(1);
const pageCount = 5;
const value = ref("");

const { data } = await useFetch("/api/data");
let body = "";
if (data.value) {
  body = data.value.body;
}
const products = JSON.parse(body);

const productPage = computed(() => {
  return products.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const columns = [
  {
    key: "detail",
    label: "Detail",
  },
  {
    key: "price",
    label: "Price",
  },
];
</script>

<template>
  <div class="">
    <div class="flex items-center gap-5 p-5 border-b border-gray-800">
      <UInput
        v-model="value"
        size="sm"
        placeholder="Search..."
        icon="i-heroicons-magnifying-glass"
        class="grow"
        color="gray"
      />
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
      <div class="">
        <div class="">
          <a
            v-for="product in productPage"
            :href="product.url"
            target="_blank"
            class="flex justify-between gap-4 hover:bg-gray-800 text-sm px-4 py-3 border-b border-gray-800"
          >
            <div class="">
              <div class="break-words text-sm">{{ product.name }}</div>
              <p class="text-gray-500">{{ "#" + product.product_id }}</p>
            </div>
            <div class="text-gray-500">{{ "$" + product.price }}</div>
          </a>
        </div>
      </div>
      <div class="flex justify-center">
        <UPagination
          v-model="page"
          size="xl"
          :page-count="pageCount"
          :total="products.length"
          class="pt-5"
        />
      </div>
    </div>
  </div>
</template>

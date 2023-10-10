<script setup lang="ts">
useHead({
  title: "Home",
});
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
  <NuxtLayout name="default">
    <div class="">
      <div class="flex items-center gap-5 p-5 border-b border-gray-800">
        <UInput
          v-model="value"
          size="sm"
          placeholder="Search..."
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
        <UTable
          :rows="productPage"
          :columns="columns"
          :ui="{
            wrapper: 'border border-gray-800',
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
                    :name="collection"
                    :label="collection"
                  />
                </UCard>
              </template>
            </UPopover>
          </template>
        </UTable>
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
  </NuxtLayout>
</template>

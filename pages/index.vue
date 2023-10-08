<script setup lang="ts">
const page = ref(1)
const pageCount = 5
const value = ref('')

const { data } = await useFetch('/api/data')
let body = ""
if (data.value) {
  body = data.value.body
}
const products = JSON.parse(body)

const productPage = computed(() => {
  return products.slice((page.value - 1) * pageCount, page.value * pageCount)
})

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: "price",
    label: "Price",
  }
]

</script>

<template>
  <div class="p-5">
    <h1 class="text-5xl font-semibold py-5">Search</h1>
    <div class="flex items-center gap-5">
      <UInput v-model="value" size="xl" class="grow" />
      <UButton icon="i-heroicons-magnifying-glass" color="primary" variant="solid" label="Search" :trailing="false" to="/"
        size="lg" />
    </div>
    <div class="py-5">
      <div class="">
        <div class="h-[30rem]">
          <UTable :rows="productPage" :columns="columns" :ui="{ wrapper: 'border border-gray-700 rounded-lg', }">
            <template #name-data="{ row }">
              <div class="break-all">{{ row.name }}</div>
              <a :href="row.url">{{ row.product_id }}</a>
            </template>
          </UTable>
        </div>
        <div class="flex justify-center">
          <UPagination v-model="page" size="xl" :page-count="pageCount" :total="products.length" class="pt-5" />
        </div>
      </div>
    </div>
  </div>
</template>

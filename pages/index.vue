<script setup lang="ts">
const route = useRoute()
const value = ref('')
const products = ref([
  {
    id: 1, name: 'Product 1', price: 100, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  }, {
    id: 2, name: 'Product 2', price: 200, image: 'https://picsum.photos/500/500'
  },
])
</script>

<template>
  <div class="p-5">
    <h1 class="text-5xl font-semibold py-5">Search</h1>
    <UInput v-model="value" size="xl" />
    <div class="py-5">
      <div class="grid grid-cols-2 gap-5">
        <div v-for="product in products" :key="product.id"
          class="border border-gray-400 dark:border-gray-700 overflow-hidden flex rounded-lg">
          <div class="flex justify-center">
            <img :src="product.image" class="w-40 h-40" />
          </div>
          <div class="flex flex-col p-5 justify-between">
            <h1 class="text-2xl font-semibold">{{ product.name }}</h1>
            <h1 class="text-2xl font-semibold">{{ product.price }}</h1>
            <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="View"
              :trailing="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

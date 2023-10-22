<script setup lang="ts">
import { Product } from "~/server/api/data";

export type Column = {
  key: string;
  label: string;
};

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-4 gap-5 px-5">
    <a
      class=""
      :href="`/product/${row.product_id}`"
      v-for="row in products"
    >
      <div class="">
        <img
          class="w-full mr-4"
          :src="row.image_url || 'https://via.placeholder.com/150'"
          alt="Product image"
        />
        <div class="break-words p-2 truncate">{{ row.name }}</div>
      </div>
    </a>
  </div>
</template>

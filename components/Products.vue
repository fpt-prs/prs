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
  <div class="">
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
        <a class="" :href="`/product/${row.product_id}`">
          <div class="break-words text-sm">{{ row.name }}</div>
          <p class="text-gray-500">{{ "#" + row.product_id }}</p>
        </a>
      </template>
      <template #actions-data="{ row }">
        <slot name="actions" :row="row">
          <div class=""></div>
        </slot>
      </template>
    </UTable>
  </div>
</template>

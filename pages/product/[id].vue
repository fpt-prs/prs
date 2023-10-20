<script setup lang="ts">
import { CollectionContains } from "~/server/api/collection/all";
import { type Product } from "~/server/api/product";
const route = useRoute();

useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const product = ref({} as Product);
const collections = ref([] as CollectionContains[]);

onMounted(async () => {
  const response = await fetch("/api/product?id=" + route.params.id);
  const data = await response.json();
  const body = JSON.parse(data.body);
  product.value = body;
  const collectionResponse = await fetch(
    "/api/collection/all?product_order=" + body.id
  );
  const collectionData = await collectionResponse.json();
  const collectionBody = JSON.parse(collectionData.body);
  collections.value = collectionBody;
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="text-3xl p-3 border-b border-gray-200 dark:border-gray-800">
      <UButton
        icon="i-heroicons-arrow-left"
        to="/search"
        variant="link"
        color="white"
        label="Back"
      />
    </div>
    <div class="text-3xl p-3">
      <div class="flex max-w-[60ch] mx-auto">
        <img :src="product.image_url" class="w-80 h-80 mr-3" />
        <div class="">
          <div class="text-2xl font-bold">{{ product.name }}</div>
          <div class="my-4">
            {{ "$" + product.price }}
          </div>
          <UButton
            icon="i-heroicons-arrow-right"
            trailing
            size="lg"
            :to="product.url"
            target="_blank"
            class="mt-3"
            label="View in Amazon"
          />
        </div>
      </div>
      <div v-for="collection in collections" class="">
        {{ JSON.stringify(collection) }}
      </div>
    </div>
  </NuxtLayout>
</template>

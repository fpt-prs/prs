<script setup>
const route = useRoute();

useHead({
  title: "Collections",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const collections = ref([]);

onMounted(async () => {
  const response = await fetch("/api/collection/list");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body;
  const responseProducts = await fetch(`/api/collection?id=${route.params.id}`);
  const dataProducts = await responseProducts.json();
  const result = JSON.parse(dataProducts.body);
  collection.value = result.collection;
  products.value = result.products;
});

const collection = ref({});
const products = ref([]);
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex max-w-screen h-full">
      <div class="p-5 border-r border-color">
        <ul class="flex flex-col">
          <UButton
            v-for="c in collections"
            :key="c.id"
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            :label="c.name"
            :trailing="false"
            :to="`./${c.id}`"
            class="w-full"
          />
        </ul>
      </div>
      <div class="grow">
        <p class="text-xl px-4 py-3">{{ collection.name }}</p>
        <div class="space-y-3 p-4">
          <a
            class="block"
            :href="`/product/${row.product_id}`"
            v-for="row in products"
          >
            <div class="flex">
              <img
                class="w-36 h-36 mr-4"
                :src="
                  row.image_urls[0].image_url ||
                  'https://via.placeholder.com/150'
                "
                alt="Product image"
              />
              <div class="break-words p-2 truncate">
                <p class="truncate">{{ row.name }}</p>
                <div class="text-gray-500 mt-2">
                  {{ "$" + row.price }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

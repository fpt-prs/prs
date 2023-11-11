<script setup>
const currentId = ref(0);

useHead({
  title: "Collections",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const collections = ref([]);

watch(currentId, async () => {
  await fetchDetail();
});

const collection = ref({});
const products = ref([]);

onMounted(async () => {
  await fetchCollection();
  currentId.value = collections.value[0].id;
  await fetchDetail();
});

const fetchCollection = async () => {
  const response = await fetch("/api/collection/list");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body;
};

const fetchDetail = async () => {
  const responseProducts = await fetch(`/api/collection?id=${currentId.value}`);
  const dataProducts = await responseProducts.json();
  const result = JSON.parse(dataProducts.body);
  collection.value = result;
  products.value = result.products;
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex max-w-screen h-full">
      <div class="p-5 border-r border-color">
        <ul class="flex flex-col w-48">
          <UButton
            v-for="c in collections"
            :key="c.id"
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            :label="c.name"
            :trailing="false"
            @click="currentId = c.id"
            class="w-full"
          />
          <NewCollection />
        </ul>
      </div>
      <div class="grow min-w-0">
        <p class="text-xl px-4 py-3">{{ collection.name }}</p>
        <div class="space-y-3 p-4">
          <a
            class="block"
            :href="`/product/${row.productId}`"
            v-for="row in products"
          >
            <div class="flex">
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
            </div>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

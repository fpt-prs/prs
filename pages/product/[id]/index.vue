<script setup>
const route = useRoute();
const baseURL = route.fullPath.replace(route.path, "");

useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const product = ref({});
const collections = ref([]);
const currentImage = ref(0);

const response = await fetch(
  `/api/products/${route.params.id}`
);
const data = await response.json();
const body = JSON.parse(data.body);
product.value = body;
const collectionResponse = await fetch(
  "/api/collection/all?product_order=" + body.id
);
const collectionData = await collectionResponse.json();
const collectionBody = JSON.parse(collectionData.body);
collections.value = collectionBody;

const update = async (c) => {
  const method = c.isExist ? "DELETE" : "PUT";
  const response = await fetch("/api/collection/update", {
    method: method,
    body: JSON.stringify({
      collectionId: c.id,
      productId: product.value.id,
    }),
  });
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="max-w-[80rem] mx-auto px-3">
      <div class="flex py-12">
        <div class="mr-3">
          <img
            v-for="(image, index) in product.image_urls"
            :src="image.image_url.replace('75', '320')"
            class="w-36 aspect-square cursor-pointer my-1"
            :class="
              index === currentImage
                ? 'border-2 border-blue-500'
                : 'brightness-50 hover:brightness-100'
            "
            @click="currentImage = index"
          />
        </div>
        <img
          :src="
            product.image_urls[currentImage]?.image_url.replace('75', '320') ||
            '/no-image.png'
          "
          class="w-80 h-80 mr-3"
        />
        <div class="">
          <div class="text-2xl font-bold">{{ product.name }}</div>
          <div class="my-4">
            {{ "$" + product.price || "" }}
          </div>
          <div class="lg:flex gap-5 pt-3 max-lg:space-y-2">
            <UButton
              icon="i-heroicons-arrow-right"
              trailing
              size="lg"
              :to="product.url"
              target="_blank"
              label="View in Amazon"
            />
            <UPopover>
              <UButton
                color="white"
                size="lg"
                trailing-icon="i-heroicons-chevron-down-20-solid"
                label="Add to Collections"
              />
              <template #panel>
                <UCard>
                  <UCheckbox
                    v-for="collection in collections"
                    :name="collection.name"
                    :label="collection.name"
                    :key="collection.id"
                    v-model="collection.isExist"
                    @click="update(collection)"
                  />
                </UCard>
              </template>
            </UPopover>
          </div>
        </div>
      </div>
      <div class="py-3 border-t border-color">
        <h2 class="text-2xl py-3 font-semibold">Description</h2>
        <p class="whitespace-pre-line">
          {{ product.description }}
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

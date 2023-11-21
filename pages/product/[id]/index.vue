<script setup>
const route = useRoute();
const router = useRouter();
const currentImage = ref(0);

useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const product = ref({});
onMounted(async () => {
  const response = await fetch(`/api/products/${route.params.id}`);
  const status = response.status;
  if (status !== 200) {
    router.push("/404");
  }
  const data = await response.json();
  const body = JSON.parse(data.body);
  product.value = body;
  const collectionResponse = await fetch(
    "/api/collection/all?productId=" + body.id
  );
  const collectionData = await collectionResponse.json();
  const collectionBody = JSON.parse(collectionData.body);
  collections.value = collectionBody;
});

const collections = ref([]);

const update = async (collection) => {
  const response = await fetch("/api/collection", {
    method: "POST",
    body: JSON.stringify({
      collectionId: collection.id,
      productId: product.value.id,
      mode: collection.isProductInCollection ? "remove" : "add",
    }),
  });

  const data = await response.json();
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="max-w-[80rem] mx-auto px-3">
      <div class="flex py-12">
        <div class="mr-3" v-if="product.images">
          <img
            v-for="(image, index) in product.images"
            :src="image.imageUrl"
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
          v-if="product.images"
          :src="product.images[currentImage]?.imageUrl || '/no-image.png'"
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
                    v-model="collection.isProductInCollection"
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

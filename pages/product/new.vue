<script setup>
useHead({
  title: "New product",
});

const newImage = ref("");
const product = ref({});

const addImage = () => {
  if (!newImage) {
    return;
  }
  product.value.image_urls.push({
    image_url: newImage.value,
  });
};

const removeImage = (image_url) => {
  if (!product.value.image_urls) {
    return;
  }
  product.value.image_urls = product.value.image_urls.filter(
    (image) => image.image_url !== image_url
  );
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="text-3xl p-3 dark:border-b border-color">
      <BackButton />
    </div>
    <div class="text-3xl p-3 dark:border-b border-color">
      <p class="text-xl px-4 py-3">New product</p>
    </div>
    <div class="max-w-[80rem] mx-auto px-4 py-3 space-y-4">
      <UFormGroup label="Name">
        <UTextarea
          autoresize
          v-model="product.name"
          placeholder="Name"
          type="text"
          name="name"
        />
      </UFormGroup>
      <UFormGroup label="Description">
        <UTextarea
          autoresize
          v-model="product.description"
          placeholder="Description"
          type="text"
          name="description"
        />
      </UFormGroup>
      <!-- price -->
      <UFormGroup label="Price">
        <UInput
          v-model="product.price"
          placeholder="Price"
          type="number"
          name="price"
        />
      </UFormGroup>
      <UFormGroup label="Images">
        <div
          class="flex items-center gap-5 pb-5"
          v-for="image in product.image_urls"
        >
          <UInput
            v-model="image.image_url"
            placeholder="Images"
            type="text"
            size="lg"
            class="grow"
            name="images"
          />
          <UButton
            label="Remove"
            color="red"
            @click="removeImage(image.image_url)"
          />
          <img
            :src="image.image_url"
            onerror="this.src='https://via.placeholder.com/150'"
            class="w-36 aspect-square"
            alt=""
          />
        </div>
        <div class="flex items-center gap-5 pb-5">
          <UInput
            size="lg"
            placeholder="Images"
            type="text"
            class="grow"
            name="images"
            v-model="newImage"
          />
          <UButton
            label="Add image URL"
            size="lg"
            color="green"
            :disabled="!newImage"
            @click="addImage"
          />

          <img
            :src="newImage || ''"
            class="w-36 aspect-square"
            onerror="this.src='https://via.placeholder.com/150'"
            alt=""
          />
        </div>
      </UFormGroup>
      <UButton size="lg" type="submit"> Create </UButton>
    </div>
  </NuxtLayout>
</template>

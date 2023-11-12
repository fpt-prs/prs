<script setup>
useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const route = useRoute();
const newImage = ref("");

const addImage = () => {
  if (!newImage) {
    return;
  }
  product.value.images.push({
    imageUrl: newImage.value,
  });
};

const product = ref({});
onMounted(async () => {
  const response = await fetch(`/api/products/${route.params.id}`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  product.value = {
    ...body,
    images: body.images.map((image) => ({
      imageUrl: image.imageUrl,
    })),
  };
});

const removeImage = (imageUrl) => {
  if (!product.value.imageUrls) {
    return;
  }
  product.value.imageUrls = product.value.imageUrls.filter(
    (image) => image.imageUrl !== imageUrl
  );
};

const update = async (c) => {
  const productUpdateRequest = {
    id: product.value.id,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    url: product.value.url,
    category: product.value.category,
    images: product.value.images.map((image) => image.imageUrl),
  };
  const response = await fetch("/api/products/update", {
    method: "POST",
    body: JSON.stringify(productUpdateRequest),
  });

  const status = response.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Product updated successfully" });
  } else {
    toast.add({ title: "Error updating product" });
  }
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="text-3xl p-3 dark:border-b border-color">
      <BackButton />
    </div>
    <div class="text-3xl p-3 dark:border-b border-color">
      <p class="text-xl px-4 py-3">Edit Product</p>
    </div>
    <div class="max-w-[80rem] mx-auto px-4 py-3 space-y-4 pb-32">
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
          v-for="image in product.images"
        >
          <UInput
            v-model="image.imageUrl"
            placeholder="Images"
            type="text"
            size="lg"
            class="grow"
            name="images"
          />
          <UButton
            label="Remove"
            color="red"
            @click="removeImage(image.imageUrl)"
          />
          <img
            :src="image.imageUrl"
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
      <UButton size="lg" @click="update"> Update </UButton>
    </div>
  </NuxtLayout>
</template>

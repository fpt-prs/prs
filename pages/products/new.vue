<script setup>
useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const route = useRoute();
const newImage = ref("");
const product = ref({
  images: [],
});

const addImage = () => {
  if (!newImage) {
    return;
  }
  product.value.images.push({
    imageUrl: newImage.value,
  });
};

const removeImage = (imageUrl) => {
  if (!product.value.imageUrls) {
    return;
  }
  product.value.imageUrls = product.value.imageUrls.filter(
    (image) => image.imageUrl !== imageUrl
  );
};

const create = async (c) => {
  const productCreateRequest = {
    productCode: product.value.productCode,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    url: product.value.url,
    category: product.value.category,
    isActive: product.value.isActive,
    images: product.value.images.map((image) => image.imageUrl),
  };
  const response = await fetch("/api/products", {
    method: "PUT",
    body: JSON.stringify(productCreateRequest),
  });

  const status = response.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Product created successfully" });
  } else {
    toast.add({ title: "Error creating product" });
  }
  const router = useRouter();
  router.push("/admin/products/" + product.value.productCode);
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="text-3xl p-3 dark:border-b border-color">
      <BackButton />
    </div>
    <div class="text-3xl p-3 dark:border-b border-color">
      <p class="text-xl px-4 py-3">Create Product</p>
    </div>
    <div class="max-w-[80rem] mx-auto px-4 py-3 space-y-4 pb-32">
      <UCheckbox
        :checked="product.isActive === 1"
        @change="product.isActive = product.isActive ? 0 : 1"
        label="Active"
        type="checkbox"
        name="active"
      />
      <UFormGroup label="Product ID">
        <UInput
          autoresize
          v-model="product.productCode"
          placeholder="Product Code"
          type="text"
          name="productCode"
        />
      </UFormGroup>
      <UFormGroup label="URL">
        <UTextarea
          autoresize
          v-model="product.url"
          placeholder="Product URL"
          type="text"
          name="url"
        />
      </UFormGroup>
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
      <UFormGroup label="Category">
        <UTextarea
          autoresize
          v-model="product.category"
          placeholder="Category"
          type="text"
          name="category"
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
      <UButton size="lg" @click="create"> Update </UButton>
    </div>
  </NuxtLayout>
</template>

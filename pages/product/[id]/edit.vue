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

const validate = () => {
  const errors = [];
  if (!product.value.productCode) {
    errors.push({ path: "productCode", message: "Required" });
  }
  if (!product.value.name) {
    errors.push({ path: "name", message: "Required" });
  }
  if (!product.value.price) {
    errors.push({ path: "price", message: "Required" });
  }
  if (!product.value.url) {
    errors.push({ path: "url", message: "Required" });
  }
  if (!product.value.category) {
    errors.push({ path: "category", message: "Required" });
  }
  return errors;
};

const removeImage = (imageUrl) => {
  if (!product.value.imageUrls) {
    return;
  }
  product.value.imageUrls = product.value.imageUrls.filter(
    (image) => image.imageUrl !== imageUrl
  );
};

const isUpdating = ref(false);
const update = async (c) => {
  isUpdating.value = true;
  const productUpdateRequest = {
    id: product.value.id,
    name: product.value.name,
    description: product.value.description,
    price: product.value.price,
    url: product.value.url,
    category: product.value.category,
    isActive: product.value.isActive,
    images: product.value.images.map((image) => image.imageUrl),
  };
  const response = await fetch("/api/products/update", {
    method: "POST",
    body: JSON.stringify(productUpdateRequest),
  });

  const status = response.status;
  const toast = useToast();
  isUpdating.value = false;
  if (status === 200) {
    toast.add({ title: "Product updated successfully" });
    const router = useRouter();
    router.push("/product/" + product.value.productCode);
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
    <div
      class="text-3xl sm:flex items-center justify-between p-3 dark:border-b border-color"
    >
      <p class="text-xl">Edit Product</p>
      <UButton @click="update" color="green" :loading="isUpdating">
        Update
      </UButton>
    </div>
    <div class="max-w-[80rem] mx-auto px-4 py-3 space-y-4 pb-32">
      <UCheckbox
        :checked="product.isActive === 1"
        @change="product.isActive = product.isActive ? 0 : 1"
        label="Active"
        type="checkbox"
        name="active"
      />
      <UForm :validate="validate" :state="product" class="space-y-4">
        <UFormGroup label="URL" name="url">
          <UTextarea
            autoresize
            v-model="product.url"
            placeholder="Product URL"
            type="text"
          />
        </UFormGroup>
        <UFormGroup label="Name" name="name">
          <UTextarea
            autoresize
            v-model="product.name"
            placeholder="Name"
            type="text"
            name="name"
          />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea
            autoresize
            v-model="product.description"
            placeholder="Description"
            type="text"
            name="description"
          />
        </UFormGroup>
        <!-- price -->
        <UFormGroup label="Price (USD)" name="price">
          <UInput
            v-model="product.price"
            placeholder="Price"
            type="number"
            name="price"
          />
        </UFormGroup>
        <UFormGroup label="Category" name="category">
          <UInput
            v-model="product.category"
            placeholder="Category"
            type="text"
            name="category"
          />
        </UFormGroup>
        <UFormGroup label="Images">
          <div
            class="flex max-lg:flex-col lg:items-center gap-5 pb-5 max-lg:pb-10"
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
              class="lg:w-36 w-full aspect-square rounded"
              alt=""
            />
            <hr class="lg:hidden border-color" />
          </div>
          <div class="flex max-lg:flex-col lg:items-center gap-5 pb-5">
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
              class="lg:w-36 w-full aspect-square rounded"
              onerror="this.src='https://via.placeholder.com/150'"
              alt=""
            />
          </div>
        </UFormGroup>
      </UForm>
      <UButton size="lg" color="green" @click="update" :loading="isUpdating">
        Update
      </UButton>
    </div>
  </NuxtLayout>
</template>

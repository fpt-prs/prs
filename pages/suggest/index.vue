<script setup>
useHead({
  title: "Hot products",
});
const toast = useToast();
const router = useRouter();

const newToastError = (description) => {
  toast.add({
    title: "Error",
    description: description,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

const categories = ref([]);
const selectedCategory = ref(null);

onMounted(async () => {
  const { data, status } = await fetchJson("/api/products/categories");
  if (status === 200) {
    categories.value = JSON.parse(data.body).filter((cate) => !!cate);
    categories.value.unshift("All");
  } else {
    newToastError("Something went wrong");
  }
});

const categoryCount = ref(-1);
watch(selectedCategory, async (newCate, val) => {
  if (!newCate) {
    return;
  }
  const escapedCategory = newCate.replace(/ /g, "%20").replace(/&/g, "%26");
  const { data, status } = await fetchJson(
    `/api/products/count?category=${escapedCategory}`
  );
  if (status === 200) {
    categoryCount.value = parseInt(data.body);
  } else {
    newToastError("Something went wrong");
  }
});

const criterias = ["Rating", "Comment"];
const selectedCriteria = ref(null);

const scoreRange = ref({
  min: 0,
  max: 0,
});
watch(
  [selectedCategory, selectedCriteria],
  async ([newCategory, newCriteria]) => {
    if (!newCriteria || !newCategory) {
      return;
    }
    const escapedCategory = newCategory
      .replace(/ /g, "%20")
      .replace(/&/g, "%26");
    const { data, status } = await fetchJson(
      `/api/products/score?category=${escapedCategory}&criteria=${newCriteria}`
    );
    if (status === 200) {
      scoreRange.value = JSON.parse(data.body);
    } else {
      newToastError("Something went wrong");
    }
  }
);

const positions = [
  { label: "Top 10", action: "export.top.1.to.10" },
  { label: "Top 11 to 20", action: "export.top.11.to.20" },
  { label: "Top 21 to 30", action: "export.top.21.to.30" },
  { label: "Top 31 to 40", action: "export.top.31.to.40" },
  { label: "Top 41 to 50", action: "export.top.41.to.50" },
];
const selectedPosition = ref({
  label: null,
  action: null,
});

const currentSubDetail = ref(null);
onMounted(async () => {
  const response = await fetch(`/api/profile/sub`);
  const data = await response.json();
  if (!data.value) {
    return;
  }
  currentSubDetail.value = data.value;
});

const price = ref(0);
watch(selectedPosition, async (newPosition, val) => {
  if (!newPosition) {
    return;
  }
  const response = await fetch(
    `/api/products/actions?action=${newPosition.action}`
  );
  const data = await response.json();
  const status = response.status;
  if (status === 200) {
    price.value = data.body;
  } else {
    newToastError(data.body);
  }
});

const confirm = async () => {
  let command = {
    category: selectedCategory.value,
    criteria: selectedCriteria.value,
    action: selectedPosition.value.action,
  };

  const res = await fetch(`/api/export`, {
    method: "POST",
    body: JSON.stringify(command),
  });

  const data = res.json();
  const status = res.status;

  if (status === 200) {
    router.push("/collections");
  } else {
    newToastError(data.body);
  }
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="">
      <div class="flex flex-col min-w-0 gap-5 p-5 border-b border-color">
        <h1 class="text-2xl font-semibold">Trending products</h1>
      </div>
      <div class="flex flex-col min-w-0 items-start gap-5 p-5">
        <p class="text-color">First, select the category...</p>
        <USelectMenu
          v-model="selectedCategory"
          :options="categories"
          size="xl"
          class="cursor-pointer w-60"
          placeholder="Select category"
        />
        <p>
          <span class="" v-if="selectedCategory">
            We have currently crawled
            {{ categoryCount >= 0 ? categoryCount : "---" }} products in this
            category.
          </span>
        </p>
        <p class="text-color" v-if="selectedCategory">
          Then select the criteria...
        </p>
        <USelectMenu
          v-model="selectedCriteria"
          :options="criterias"
          size="xl"
          class="cursor-pointer w-60"
          placeholder="Select criteria"
          v-if="selectedCategory"
        />
        <p class="" v-if="scoreRange.min && scoreRange.max">
          The score range is from {{ scoreRange.min.toFixed(2) }} to
          {{ scoreRange.max.toFixed(2) }}.
        </p>
        <p class="text-color" v-if="selectedCriteria && selectedCategory">
          Finally, select the position...
        </p>
        <USelectMenu
          v-model="selectedPosition"
          :options="positions"
          size="xl"
          class="cursor-pointer w-60"
          placeholder="Select position"
          v-if="selectedCriteria && selectedCategory"
        >
          <template #label>
            {{ selectedPosition.label || "Select position" }}
          </template>
        </USelectMenu>
        <p class="" v-if="selectedPosition.label && !currentSubDetail">
          You are currently not subscribed to any plan. The fee will be deducted
          from your balance.
        </p>
        <p class="" v-if="selectedPosition.label && !currentSubDetail">
          The price is
          <span class="font-semibold">{{ price }}</span> VND.
        </p>
        <p v-if="selectedPosition.label">Do you want to continue?</p>
        <UButton
          label="Continue"
          size="xl"
          color="primary"
          v-if="selectedPosition.label"
          @click="confirm"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

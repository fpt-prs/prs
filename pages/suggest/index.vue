<script setup>
useHead({
  title: "Hot products",
});
const toast = useToast();

const categories = ref([]);
const selectedCategory = ref(null);

onMounted(async () => {
  const cateFetch = await fetch("/api/products/categories");
  const cateData = await cateFetch.json();
  const status = cateFetch.status;
  if (status === 200) {
    categories.value = JSON.parse(cateData.body).filter((cate) => !!cate);
    categories.value.unshift("All");
  } else {
    toast.add({
      title: "Error",
      description: "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
});

const categoryCount = ref(-1);
watch(selectedCategory, async (newCate, val) => {
  if (!newCate) {
    return;
  }
  const countFetch = await fetch(
    `/api/products/count?category=${newCate
      .replace(/ /g, "%20")
      .replace(/&/g, "%26")}`
  );
  const countData = await countFetch.json();
  const status = countFetch.status;
  if (status === 200) {
    categoryCount.value = parseInt(countData.body);
  } else {
    toast.add({
      title: "Error",
      description: "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
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
    const scoreFetch = await fetch(
      `/api/products/score?category=${escapedCategory}&criteria=${newCriteria}`
    );
    const scoreData = await scoreFetch.json();
    const status = scoreFetch.status;
    if (status === 200) {
      scoreRange.value = JSON.parse(scoreData.body);
    } else {
      toast.add({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
);

const positions = [
  {
    label: "Top 10",
    action: "export.top.1.to.10",
  },
  {
    label: "Top 11 to 20",
    action: "export.top.11.to.20",
  },
  {
    label: "Top 21 to 30",
    action: "export.top.21.to.30",
  },
  {
    label: "Top 31 to 40",
    action: "export.top.31.to.40",
  },
  {
    label: "Top 41 to 50",
    action: "export.top.41.to.50",
  },
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
    `/api/products/actions?actions=${newPosition.action}`
  );
  const data = await response.json();
  const status = response.status;
  if (status === 200) {
    price.value = data.body;
  } else {
    toast.push({
      title: "Error",
      description: data.body,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
});
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
          <span class="" v-if="categoryCount >= 0">
            We have currently crawled {{ categoryCount }} products in this
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
          The price is <span class="font-semibold">{{ price }}</span> VND.
        </p>
        <p v-if="selectedPosition.label">
          Do you want to continue?
        </p>
        <UButton
          label="Continue"
          size="xl"
          color="primary"
          v-if="selectedPosition.label"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

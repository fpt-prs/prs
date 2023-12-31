<script setup>
import { LineChart } from "vue-chart-3";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
const route = useRoute();
const router = useRouter();
const currentImage = ref(0);
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement
);

useHead({
  title: "Product",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const product = ref({});
const description = computed(
  () =>
    product.value.description
      ?.trim()
      .replaceAll("     ", "\n")
      .replaceAll(/\n+\s\n+/g, "\n") || "No description"
);
let graph = {
  labels: [],
  datasets: [
    {
      label: "Popularity",
      backgroundColor: "#3B82F6",
      data: [],
    },
  ],
};

onMounted(async () => {
  const response = await fetch(`/api/products/${route.params.id}`);
  const status = response.status;
  if (status !== 200) {
    router.push("/404");
  }
  const data = await response.json();
  const body = JSON.parse(data.body);
  product.value = body;
});

const graphComputed = computed(() => {
  if (!product.value.scores) {
    return graph;
  }

  return {
    labels: product.value.scores.map((p) => p.date).reverse(),
    datasets: [
      {
        label: "Popularity",
        backgroundColor: "#3B82F6",
        data: product.value.scores.map((p) => p.rating).reverse(),
      },
      {
        label: "Comment score",
        backgroundColor: "#fff000",
        data: product.value.scores.map((p) => p.comment).reverse(),
      },
    ],
  };
});

const { getSession } = useAuth();
const session = await getSession();
const isAdmin = await isAuthorized(session, "product.write.all");

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="max-w-[80rem] mx-auto px-3">
      <div class="lg:flex py-12">
        <div
          class="max-lg:flex gap-4 max-lg:mb-4 lg:mr-3 overflow-x-auto"
          v-if="product.images"
        >
          <img
            v-for="(image, index) in product.images"
            :src="image.imageUrl"
            class="w-24 aspect-square cursor-pointer my-1"
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
          <div class="text-2xl font-bold">
            {{ product.name || "Loading..." }}
          </div>
          <div class="my-4">
            {{ "$" + (product.price !== undefined ? product.price : "") }}
          </div>
          <div class="flex max-lg:flex-col gap-5 pt-3 max-lg:space-y-2">
            <UButton
              icon="i-heroicons-arrow-right"
              trailing
              size="lg"
              :to="product.url"
              target="_blank"
              label="View in Amazon"
            />
            <UButton
              color="gray"
              icon="i-heroicons-pencil"
              size="lg"
              label="Edit"
              :to="`/product/${product.productCode}/edit`"
              v-if="isAdmin"
            />
          </div>
        </div>
      </div>
      <div
        class="py-3 border-t border-color"
        v-if="product.scores && product.scores.length > 0"
      >
        <h2 class="text-2xl py-3 font-semibold">Popularity graph</h2>
        <div class="w-full px-5 bg-white rounded-lg">
          <LineChart
            v-if="product"
            id="popularity-graph"
            :chartData="graphComputed"
            :options="chartOptions"
          />
        </div>
      </div>
      <div class="py-3 border-t border-color mb-10">
        <h2 class="text-2xl py-3 font-semibold">Description</h2>
        <div class="whitespace-pre-wrap">
          {{ description }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

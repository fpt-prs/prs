<script setup lang="ts">
import { Collection } from '~/server/api/collection/all';
const route = useRoute()

useHead({
  title: "Collections",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const collections = ref([] as Collection[]);

onMounted(async () => {
  const response = await fetch("/api/collection/all");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body.data;
});

const collection = ref([] as any);

onMounted(async () => {
  const response = await fetch(`/api/collection?id=${route.params.id}`);
  const data = await response.json();
  const result = JSON.parse(data.body);
  collection.value = result.data;
});

</script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full">
      <div class="p-5 border-r border-gray-800">
        <ul class="flex flex-col">
          <UButton
            icon="i-heroicons-user-circle"
            color="gray"
            variant="ghost"
            label="Favorites"
            exactActiveClass="bg-gray-700"
            :trailing="false"
            to="/collections/favourite"
            class="w-full"
          />
          <UButton
            v-for="c in collections"
            :key="c.id"
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            :label="c.name"
            :trailing="false"
            :to="`collections/${c.id}`"
            class="w-full"
          />
        </ul>
      </div>
      <div class="grow">
        <p class="text-xl px-4 py-3">Favourites</p>
        <div class="space-y-3 p-4 max-w-[50ch]">
          {{collection}}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

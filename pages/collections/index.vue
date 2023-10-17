<script setup>
useHead({
  title: "Collections",
  meta: [
    { hid: "description", name: "description", content: "Collections page" },
  ],
});

const collections = ref([]);

onMounted(async () => {
  const response = await fetch("/api/collection");
  const data = await response.json();
  const body = JSON.parse(data.body);
  collections.value = body.data;
  console.log(collections.value);
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
            v-for="collection in collections"
            :key="collection.id"
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            :label="collection.name"
            :trailing="false"
            :to="`collections/${collection.id}`"
            class="w-full"
          />
        </ul>
      </div>
      <div class="grow">
        <p class="text-xl px-4 py-3">Favourites</p>
        <div class="space-y-3 p-4 max-w-[50ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores
          iure velit sint explicabo ratione pariatur enim corporis, eum incidunt
          adipisci cupiditate, obcaecati iste, quo eius modi suscipit?
          Consequuntur, minus?
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

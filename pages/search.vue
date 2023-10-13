<script setup lang="ts">
import { Collection } from '~/server/api/collection';

useHead({
  title: "Search",
});
const collections: Collection[] = await fetch("http://localhost:3000/api/collection")
  .then((res) => res.json())
  .then((data) => data.body)
  .then((data) => JSON.parse(data).data);

</script>

<template>
  <NuxtLayout name="default">
    <Products>
      <template #actions="{ row }">
        <UPopover>
          <UButton
            color="white"
            variant="ghost"
            label=""
            trailing-icon="i-heroicons-ellipsis-horizontal"
          />
          <template #panel>
            <UCard>
              <p class="pb-2">Add to Collections</p>
              <UCheckbox
                v-for="collection in collections"
                :name="collection.name"
                :label="collection.name"
              />
            </UCard>
          </template>
        </UPopover>
      </template>
    </Products>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Search",
});
const collections = ["Favourite", "Collections A"];
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
                :name="collection"
                :label="collection"
              />
            </UCard>
          </template>
        </UPopover>
      </template>
    </Products>
  </NuxtLayout>
</template>

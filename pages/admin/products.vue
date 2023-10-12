<script setup>
useHead({
  title: "Product Management",
});

const items = [[
  {
    label: "Edit",
    icon: "i-heroicons-pencil-20-solid",
  },
  {
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
  },
]];

</script>

<template>
  <NuxtLayout name="admin">
    <Products>
      <template #actions="{ row }">
        <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
          <UButton
            color="white"
            label="Options"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </template>
    </Products>
  </NuxtLayout>
</template>

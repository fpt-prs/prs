<template>
  <UButton
    icon="i-heroicons-plus"
    color="gray"
    label="Create"
    :trailing="false"
    @click="isCreate = true"
    class="w-full"
  />

  <UModal v-model="isCreate" @close="isCreate = false">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <p>Create new collection</p>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            @click="isCreate = false"
          />
        </div>
      </template>
      <UFormGroup label="Collection name">
        <UInput placeholder="Collection name" v-model="newCollection" />
      </UFormGroup>
      <template #footer>
        <UButton
          label="Create"
          @click="
            () => {
              emit('create', newCollection);
              isCreate = false;
            }
          "
        />
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
const isCreate = ref(false);
const newCollection = ref("");
const emit = defineEmits(["create"]);
</script>

<style></style>

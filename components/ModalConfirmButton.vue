<template>
  <UButton
    :label="label"
    :color="color"
    @click="confirm = true"
    :variant="variant"
    :icon="icon"
    :class="class"
  />
  <UModal v-model="confirm" @close="confirm = false">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <p>Confirm</p>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            @click="confirm = false"
          />
        </div>
      </template>
      <div>Confirm {{ label }} ?</div>
      <template #footer>
        <div class="space-x-4">
          <UButton label="Cancel" color="gray" @click="confirm = false" />
          <UButton
            label="Confirm"
            variant="ghost"
            :color="color"
            @click="confirmEvent()"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
// props
const props = defineProps({
  label: {
    type: String,
    default: "Confirm",
  },
  color: {
    type: String,
    default: "green",
  },
  variant: {
    type: String,
    default: "ghost",
  },
  icon: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
});

// confirm state
const confirm = ref(false);

// confirm event
const emit = defineEmits(["confirm"]);
const confirmEvent = () => {
  emit("confirm");
  confirm.value = false;
};
</script>

<style></style>

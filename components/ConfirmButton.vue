<template>
  <UButton
    :label="buttonLabel"
    :color="color"
    @click="confirmEvent()"
  />
</template>

<script setup>
// props
const props = defineProps({
  defaultLabel: {
    type: String,
    default: "Confirm",
  },
  color: {
    type: String,
    default: "green",
  },
});

// confirm state
const confirm = ref(false);
const buttonLabel = computed(() => {
  if (confirm.value) {
    return "Confirm ?";
  } else {
    return props.defaultLabel;
  }
});

// confirm event
const emit = defineEmits(["confirm"]);
const confirmEvent = () => {
  if (confirm.value) {
    emit("confirm");
  }
  confirm.value = !confirm.value;
};
</script>

<style></style>

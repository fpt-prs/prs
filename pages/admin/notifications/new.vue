<template>
  <NuxtLayout name="admin">
    <div class="px-4 py-3 border-b border-color">
      <UButton
        to="/admin/notifications"
        color="black"
        variant="link"
        label="Back"
        icon="i-heroicons-arrow-left"
      />
    </div>
    <div class="px-4 py-3">
      <p class="text-2xl font-semibold">New notification</p>
    </div>
    <UForm
      :validate="validate"
      :state="notification"
      @submit="submit"
      class="w-full flex gap-4 px-4 py-3"
    >
      <div class="grow space-y-5">
        <UFormGroup label="Title" name="title" :error="notification.title">
          <UInput v-model="notification.title" />
        </UFormGroup>
        <UFormGroup
          label="Message"
          name="message"
          :error="notification.message"
        >
          <UTextarea v-model="notification.message" />
        </UFormGroup>
        <UButton type="submit" label="Send" />
      </div>
      <div class="grow py-3">
        <UCheckbox v-for="role of roles" :key="role.id" :label="role.name" />
      </div>
    </UForm>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "New notification",
});

const notification = ref({});

const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});

const submit = async (event) => {};

const validate = () => {
  return true;
};
</script>

<style></style>

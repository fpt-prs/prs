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
      <p class="text-2xl font-semibold">Edit notification</p>
    </div>
    <UForm
      :state="notification"
      @submit="submit"
      class="w-full flex gap-4 px-4 py-3"
      v-if="notification != {}"
    >
      <div class="grow space-y-5">
        <UFormGroup label="Title" name="title">
          <UInput v-model="notification.header" />
        </UFormGroup>
        <UFormGroup label="Message" name="message">
          <UTextarea v-model="notification.content" />
        </UFormGroup>
        <UButton type="submit" label="Send" />
      </div>
      <div class="grow py-3">
        <UCheckbox
          v-for="role of roles"
          :key="role.id"
          :label="role.name"
          :checked="notification.roles.map((r) => r.id).includes(role.id)"
        />
      </div>
    </UForm>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "New notification",
});

const router = useRoute();
const id = router.params.id;

const notification = ref({});
onMounted(async () => {
  const response = await fetch(`/api/notifications/${id}`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  notification.value = body;
});

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

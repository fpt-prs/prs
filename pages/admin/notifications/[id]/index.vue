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
      <p class="text-2xl font-semibold">View notification</p>
    </div>
    <div class="w-full lg:flex gap-4 px-4 py-3 max-w-[60rem]">
      <div class="grow space-y-5 pb-5 max-lg:border-b border-color">
        <p class="text-xl font-medium">Header</p>
        <p class="">
          {{ notification.header }}
        </p>
        <hr class="border-color" />
        <p class="text-xl font-medium">Content</p>
        <p>
          {{ notification.content || "---" }}
        </p>
        <hr class="border-color" />
        <p class="text-xl font-medium">Created</p>
        <p>
          {{ formatDate(parseDateTime(notification.created)) || "---" }}
        </p>
      </div>
      <div class="grow py-3">
        <p>Visible to:</p>
        <UCheckbox
          v-for="role of roles"
          :key="role.id"
          :label="role.name"
          :model-value="isVisible(notification.roles, role)"
          disabled
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "New notification",
});
const route = useRoute();
const id = route.params.id;

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

const isVisible = (roles, role) => {
  return roles.map((r) => r.id).includes(role.id);
};
</script>

<style></style>

<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <div class="px-4 py-3 flex justify-between items-center">
        <p class="text-2xl px-4 py-3">Notifications</p>
        <UButton
          icon="i-heroicons-plus"
          label="New notification"
          to="/admin/notifications/new"
        />
      </div>
      <div class="border border-color rounded-lg mx-4">
        <table class="w-full">
          <thead class="border-b border-color">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="notification of notifications"
              :key="notification.id"
            >
              <tr class="">
                <td class="px-4 py-3">{{ notification.id }}</td>
                <td class="px-4 py-3">{{ notification.header }}</td>
                <td class="px-4 py-3">{{ notification.content }}</td>
                <td class="px-4 py-3">
                  {{ formatDateTime(notification.created) }}
                </td>
                <td class="px-4 py-3">
                  <UDropdown
                    :items="actions(notification)"
                    :popper="{ placement: 'bottom-end' }"
                  >
                    <UButton
                      color="white"
                      variant="ghost"
                      label=""
                      trailing-icon="i-heroicons-ellipsis-horizontal"
                    />
                  </UDropdown>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Notifications",
});

const notifications = ref([]);

// table display
const columns = [
  { key: "id", label: "ID" },
  { key: "header", label: "Header" },
  { key: "content", label: "Content" },
  { key: "created", label: "Created" },
];

const actions = (notification) => [
  [
    {
      label: "View",
      icon: "i-heroicons-eye",
      to: `/admin/notifications/${notification.id}`,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {},
    },
  ],
];

const formatDateTime = (date) => {
  if (!date) {
    return "Undefined";
  }

  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

onMounted(async () => {
  const res = await fetch("/api/notifications");
  const json = await res.json();
  const body = JSON.parse(json.body);
  if (body) {
    notifications.value = body;
  }
});
</script>

<style></style>

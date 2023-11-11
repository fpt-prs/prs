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
                  {{ formatDate(notification.created) }}
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
    <UModal v-model="isEditing">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Edit Notification</h3>
            <UButton
              label=""
              variant="ghost"
              size="lg"
              trailing-icon="i-heroicons-x-mark"
              @click="isEditing = false"
            />
          </div>
        </template>
        <UFormGroup label="Name" class="mb-3">
          <UInput
            placeholder="Name"
            size="lg"
            class="w-full"
            v-model="editingNotification.header"
          />
        </UFormGroup>
        <UFormGroup label="Permissions">
          <UTextarea
            placeholder="Name"
            size="lg"
            class="w-full"
            v-model="editingNotification.content"
          />
        </UFormGroup>
      </UCard>
    </UModal>
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
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      to: `/admin/notifications/${notification.id}/edit`,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {},
    },
  ],
];

// edit
const isEditing = ref(false);
const editingNotification = ref({});

// remove notification
const removeNotification = (notification) => {
  notifications.value = notifications.value.filter(
    (r) => r.id !== notification.id
  );
};

const formatDate = (date) => {
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

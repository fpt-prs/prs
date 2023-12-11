<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <div class="px-4 py-3 lg:flex justify-between items-center">
        <p class="text-2xl lg:px-4 py-3">Notifications</p>
        <UButton
          icon="i-heroicons-plus"
          label="New notification"
          to="/admin/notifications/new"
        />
      </div>
      <Paginator :loader="loadNotification" type="all">
        <template #all="{ data: notifications }">
          <table class="w-full">
            <thead class="border-b border-color">
              <tr class="text-left">
                <th class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950">
                  ID
                </th>
                <th class="px-4 py-3">Header</th>
                <th class="px-4 py-3">Content</th>
                <th class="px-4 py-3">Created</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tr class="" v-for="notification in notifications">
              <td
                class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950 border-r border-color"
              >
                {{ notification.id }}
              </td>
              <td class="px-4 py-3">{{ notification.header }}</td>
              <td class="px-4 py-3">
                {{
                  (notification.content?.length > 50
                    ? notification.content.substring(0, 50) + "..."
                    : notification.content) || "Undefined"
                }}
              </td>
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
          </table>
        </template>
      </Paginator>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Notifications",
});
const router = useRouter();
const { getSession } = useAuth();
const session = await getSession();

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

const loadNotification = async (page, size) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  return await fetch(`/api/notifications?${params.toString()}`);
};
</script>

<style></style>

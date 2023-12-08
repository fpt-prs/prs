<template>
  <NuxtLayout name="default">
    <div class="grow">
      <p class="text-xl px-4 py-3">Notifications</p>

      <Paginator :loader="loadNotifications" :size="5">
        <template #item="{ data: notification }">
          <div class="">
            <div
              class="border border-color p-4 rounded-xl md:flex justify-between items-center"
            >
              <div class="">
                <p class="text-xl text-medium">
                  {{ notification.header }}
                </p>
                <p class="text-color">
                  {{ notification.content }}
                </p>
              </div>
              <div class="">
                <p class="text-color">
                  {{ formatDateTime(parseDateTime(notification.created)) }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </Paginator>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Notifications",
});

const loadNotifications = async (page, size) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  return await fetch(`/api/notifications/user?${params.toString()}`);
};
</script>

<style></style>

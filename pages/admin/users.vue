<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <p class="text-xl px-4 py-3 border-b border-color">Users</p>
      <UTable :rows="users" :columns="colums">
        <template #actions-data="{ row }">
          <div class="flex gap-4">
            <UButton :to="`/admin/user/${row.userId}`" label="Detail" />
            <ConfirmButton
              v-if="row.isActive === 1"
              color="red"
              default-label="Deactive"
              @confirm="disableUser(row.id)"
              class="w-20"
            />
            <ConfirmButton
              v-else
              color="green"
              default-label="Active"
              @confirm="enableUser(row.id)"
              class="w-20"
            />
          </div>
        </template>
      </UTable>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "User Management",
});

// users data
const users = ref([]);
onMounted(async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  const body = JSON.parse(data.body);
  users.value = body.content;
});

// table
const colums = [
  { key: "id", label: "ID" },
  { key: "userId", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "actions", label: "Actions" },
];

// actions
const disableUser = async (id) => {
  users.value = users.value.map((user) => {
    if (user.id === id) {
      user.isActive = 0;
    }
    return user;
  });

  const status = await fetch(`/api/users/status`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
      isActive: 0,
    }),
  });
};

const enableUser = async (id) => {
  users.value = users.value.map((user) => {
    if (user.id === id) {
      user.isActive = 1;
    }
    return user;
  });

  const status = await fetch(`/api/users/status`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
      isActive: 1,
    }),
  });
};
</script>

<script setup>
useHead({
  title: "Permission Management",
});

const newPermissionName = ref("");
const isEditing = ref(false);
const editingPermission = ref({});

const permissions = ref([]);

onMounted(async () => {
  const response = await fetch("/api/permissions");
  const data = await response.json();
  const body = JSON.parse(data.body);
  permissions.value = body;
});

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "actions", label: "Actions" },
];

const actions = (permission) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      click: () => {
        isEditing.value = true;
        editingPermission.value = permission;
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removePermission(permission);
      },
    },
  ],
];

const addPermission = async () => {
  const addRes = await fetch(
    `/api/permissions?name=${newPermissionName.value}`,
    {
      method: "PUT",
    }
  );

  const data = await addRes.json();
  const saved = JSON.parse(data.body);

  const maxId = Math.max(
    ...permissions.value.map((permission) => permission.id),
    0
  );
  const newPermission = {
    id: saved.id || maxId + 1,
    name: newPermissionName.value,
  };
  permissions.value.push(newPermission);
  newPermissionName.value = "";
};

const removePermission = async (permission) => {
  permissions.value = permissions.value.filter((r) => r.id !== permission.id);

  // push to server
  const updateRes = await fetch(`/api/permissions?id=${permission.id}`, {
    method: "DELETE",
  });
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Permissions</p>
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
          <tr v-for="permission of permissions" :key="permission.id">
            <td class="px-4 py-3">{{ permission.id }}</td>
            <td class="px-4 py-3">{{ permission.name }}</td>
            <td class="px-4 py-3">
              <UDropdown
                :items="actions(permission)"
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
          <tr>
            <td></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Name"
                size="lg"
                class="w-full"
                v-model="newPermissionName"
                @keydown.enter="addPermission"
              />
            </td>
            <td class="px-4 py-3">
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-plus-20-solid"
                :disabled="!newPermissionName"
                @click="addPermission"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <UModal v-model="isEditing">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Edit Permission</h3>
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-x-mark"
                @click="isEditing = false"
              />
            </div>
          </template>
          <UFormGroup label="Name">
            <UInput
              placeholder="Name"
              size="lg"
              class="w-full"
              v-model="editingPermission.name"
            />
          </UFormGroup>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

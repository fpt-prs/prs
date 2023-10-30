<script setup>
useHead({
  title: "Role Management",
});

const newRoleName = ref("");
const isEditing = ref(false);
const editingRole = ref({});

const roles = ref([
  { id: 1, name: "Admin" },
  { id: 2, name: "Dropshipper" },
  { id: 3, name: "Collaborator" },
]);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "actions", label: "Actions" },
];

const actions = (role) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      click: () => {
        isEditing.value = true;
        editingRole.value = role;
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removeRole(role);
      },
    },
  ],
];

const addRole = () => {
  const maxId = Math.max(...roles.value.map((role) => role.id), 0);
  const newRole = {
    id: maxId + 1,
    name: newRoleName,
  };
  roles.value.push(newRole);
  newRoleName.value = "";
};

const removeRole = (role) => {
  roles.value = roles.value.filter((r) => r.id !== role.id);
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Roles</p>
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
          <tr v-for="role of roles" :key="role.id">
            <td class="px-4 py-3">{{ role.id }}</td>
            <td class="px-4 py-3">{{ role.name }}</td>
            <td class="px-4 py-3">
              <UDropdown
                :items="actions(role)"
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
                v-model="newRoleName"
              />
            </td>
            <td class="px-4 py-3">
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-plus-20-solid"
                :disabled="!newRoleName"
                @click="addRole"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <UModal v-model="isEditing">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Edit Role</h3>
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
              v-model="editingRole.name"
            />
          </UFormGroup>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

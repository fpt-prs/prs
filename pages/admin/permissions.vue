<script setup>
useHead({
  title: "Permission Management",
});

const newPermissionName = ref("");
const isEditing = ref(false);
const editingPermission = ref({});
const toast = useToast();

const permissions = ref([]);
const fetchPer = async () => {
  const response = await fetch("/api/permissions");
  const data = await response.json();
  const body = JSON.parse(data.body);
  permissions.value = body;
};
onMounted(fetchPer);

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
        editingPermission.value = { ...permission };
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removingPermission.value = permission;
        isConfirmRemove.value = true;
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

const isConfirmRemove = ref(false);
const removingPermission = ref({});
const removePermission = async () => {
  isConfirmRemove.value = false;
  // push to server
  const updateRes = await fetch(
    `/api/permissions?id=${removingPermission.value.id}`,
    {
      method: "DELETE",
    }
  );

  const status = updateRes.status;
  if (status === 200) {
    toast.add({ title: "Role deleted successfully" });
    await fetchPer();
  } else {
    toast.add({ title: "Error deleting role" });
  }
};

const updatePermission = async () => {
  const updatePermissionReq = {
    id: editingPermission.value.id,
    name: editingPermission.value.name,
  };

  const updateRes = await fetch(`/api/permissions`, {
    method: "POST",
    body: JSON.stringify(updatePermissionReq),
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Permission updated successfully" });
    await fetchPer();
  } else {
    toast.add({ title: "Error updating permission" });
  }

  isEditing.value = false;
  editingPermission.value = {};
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Permissions</p>
    <div class="border border-color rounded-lg mx-4 overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-color">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider first:sticky left-0 bg-white dark:bg-gray-950 rounded-2xl"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission of permissions" :key="permission.id">
            <td class="px-4 py-3 sticky -left-1 bg-white dark:bg-gray-950">
              {{ permission.id }}
            </td>
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
                placeholder="Enter new permission name"
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
          <template #footer>
            <div class="space-x-4">
              <UButton label="Cancel" @click="isEditing = false" color="gray" />
              <UButton
                label="Update"
                variant="soft"
                @click="updatePermission"
                color="green"
              />
            </div>
          </template>
        </UCard>
      </UModal>
      <UModal v-model="isConfirmRemove">
        <UCard>
          <template #header>
            <div class="flex justify-between">
              <p>Confirm</p>
              <UButton
                icon="i-heroicons-x-mark"
                color="gray"
                variant="ghost"
                @click="isConfirmRemove = false"
              />
            </div>
          </template>
          <div>Confirm delete ?</div>
          <template #footer>
            <div class="space-x-4">
              <UButton
                label="Cancel"
                color="gray"
                @click="isConfirmRemove = false"
              />
              <UButton
                label="Confirm"
                variant="ghost"
                color="red"
                @click="removePermission"
              />
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

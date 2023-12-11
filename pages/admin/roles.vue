<script setup>
useHead({
  title: "Role Management",
});
const toast = useToast();

// roles data
const roles = ref([]);
const loadRoles = async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
};

// table display
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
        editingRole.value = role;
        isEditing.value = true;
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removingRole.value = role;
        isConfirmRemove.value = true;
      },
    },
  ],
];

// add role
const newRoleName = ref("");
const addRole = async () => {
  const maxId = Math.max(...roles.value.map((role) => role.id), 0);
  const newRole = {
    id: maxId + 1,
    name: newRoleName.value,
  };
  roles.value.push(newRole);
  newRoleName.value = "";

  // push to server
  const addRes = await fetch("/api/roles", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRole),
  });

  const status = addRes.status;
  if (status === 200) {
    toast.add({ title: "Role added successfully" });
    await loadRoles();
  } else {
    toast.add({ title: "Error adding role" });
  }
};

// edit role
const isEditing = ref(false);
const editingRole = ref({});

const updateRole = async () => {
  isEditing.value = false;

  // push to server
  const updateRes = await fetch("/api/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editingRole.value),
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Role updated successfully" });
    await loadRoles();
  } else {
    toast.add({ title: "Error updating role" });
  }
};

// remove role
const isConfirmRemove = ref(false);
const removingRole = ref({});
const removeRole = async () => {
  isConfirmRemove.value = false;
  // push to server
  const updateRes = await fetch(`/api/roles?id=${removingRole.value.id}`, {
    method: "DELETE",
  });

  const status = updateRes.status;
  if (status === 200) {
    toast.add({ title: "Role deleted successfully" });
    await loadRoles();
  } else {
    toast.add({ title: "Error deleting role" });
  }
};

// permissions data
const permissions = ref([]);
const loadPermissions = async () => {
  const response = await fetch("/api/permissions");
  const data = await response.json();
  const body = JSON.parse(data.body);
  permissions.value = body;
};

// permission logic
const isPermitted = (role, permission) => {
  return role.permissions.map((p) => p.id).includes(permission.id);
};

const togglePermission = (role, permission) => {
  if (isPermitted(role, permission)) {
    role.permissions = role.permissions.filter((p) => p.id !== permission.id);
  } else {
    role.permissions.push(permission);
  }
};

// onMount
onMounted(() => {
  loadRoles();
  loadPermissions();
});
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Roles</p>
    <div class="border border-color rounded-lg mx-4 overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-color">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider first:sticky left-0 bg-white dark:bg-gray-950 rounded-lg"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="role of roles" :key="role.id">
            <tr class="">
              <td class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950">
                {{ role.id }}
              </td>
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
          </template>
          <tr>
            <td
              class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950 z-10"
            ></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="New role name"
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
          <UFormGroup label="Name" class="mb-3">
            <UInput
              placeholder="Name"
              size="lg"
              class="w-full"
              v-model="editingRole.name"
            />
          </UFormGroup>
          <UFormGroup label="Permissions">
            <div v-for="permission of permissions" :key="permission">
              <input
                type="checkbox"
                class="mr-2 cursor-pointer"
                :id="editingRole.id + '-' + permission.id"
                :checked="isPermitted(editingRole, permission)"
                @change="togglePermission(editingRole, permission)"
              />
              <label
                :for="editingRole.id + '-' + permission.id"
                class="mr-2 cursor-pointer"
              >
                {{ permission.name }}
              </label>
              <br />
            </div>
          </UFormGroup>
          <template #footer>
            <UButton
              label="Save"
              @click="updateRole"
              :disabled="!editingRole.name"
            />
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
                @click="removeRole"
              />
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <p class="text-xl px-4 py-3 border-b border-color">Users</p>
      <UTable :rows="users" :columns="colums">
        <template #actions-data="{ row }">
          <div class="flex gap-4">
            <UButton :to="`/user/${row.userCode}`" label="Detail" />
            <UPopover :popper="{ placement: 'bottom-end' }">
              <UButton
                color="gray"
                trailing-icon="i-heroicons-ellipsis-horizontal"
              />
              <template #panel>
                <div class="p-2 flex flex-col">
                  <ModalConfirmButton
                    v-if="row.isActive === 1"
                    variant="ghost"
                    color="red"
                    label="Deactive user..."
                    @confirm="disableUser(row.id)"
                  />
                  <ModalConfirmButton
                    v-else
                    variant="ghost"
                    color="green"
                    label="Active user..."
                    @confirm="enableUser(row.id)"
                  />
                  <UButton
                    variant="ghost"
                    color="gray"
                    label="Change role..."
                    @click="startAssignUser(row)"
                  />
                  <UModal v-model="isChangingRole">
                    <div class="rounded-lg bg-color">
                      <div class="px-3 pt-2 flex justify-between items-center">
                        <p class="text-sm font-semibold">
                          Change the role of {{ editingUser.name }} ?
                        </p>
                        <UButton
                          icon="i-heroicons-x-mark"
                          color="gray"
                          variant="ghost"
                          @click="isChangingRole = false"
                        />
                      </div>
                      <div class="p-4">
                        <div class="p-2">
                          <p class="pb-4">Select role</p>
                          <URadio
                            v-for="role of roles"
                            :key="role.id"
                            v-model="selectedRoles"
                            :value="role.id"
                            :label="role.name"
                          />
                        </div>
                      </div>
                      <hr class="text-color border-color m-4" />
                      <div class="mx-4 mt-4 mb-8">
                        <UButton
                          label="Change role"
                          variant="outline"
                          color="red"
                          @click="changeRole(row.id)"
                        />
                      </div>
                    </div>
                  </UModal>
                </div>
              </template>
            </UPopover>
          </div>
        </template>
      </UTable>
    </div>
  </NuxtLayout>
</template>

<script setup>
import user from "~/server/api/bills/user";

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
  { key: "userCode", label: "User ID" },
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
      roleIds: user.roles.map((role) => role.id),
    }),
  });
};

const isChangingRole = ref(false);
const editingUser = ref({});
const startAssignUser = (user) => {
  editingUser.value = user;
  isChangingRole.value = true;
};
const selectedRoles = ref([]);
const changeRole = async (user) => {
  const updateRes = await fetch(`/api/users/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user,
      isActive: 1,
      roleIds: selectedRoles.value,
    }),
  });
};

// roles
const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});
</script>

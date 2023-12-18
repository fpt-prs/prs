<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <p class="text-xl px-4 py-3 border-b border-color">Users</p>
      <Paginator :loader="fetchUser" :size="5" type="all">
        <template #all="{ data }">
          <UTable :rows="data" :columns="colums">
            <template #actions-data="{ row }">
              <div class="flex gap-4">
                <UButton :to="`/user/${row.userCode}`" label="Detail" />
                <UPopover
                  :popper="{ placement: 'bottom-end' }"
                  v-if="row.roles[0].name.toLowerCase() !== 'admin' && isUpdatable"
                >
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
                        @confirm="disableUser(row)"
                      />
                      <ModalConfirmButton
                        v-else
                        variant="ghost"
                        color="green"
                        label="Active user..."
                        @confirm="enableUser(row)"
                      />
                      <UButton
                        variant="ghost"
                        color="gray"
                        label="Change role..."
                        @click="startAssignUser(row)"
                      />
                      <UModal v-model="isChangingRole">
                        <div class="rounded-lg bg-color">
                          <div
                            class="px-3 pt-2 flex justify-between items-center"
                          >
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
                              @click="changeRole(row)"
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
        </template>
      </Paginator>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "User Management",
});
const toast = useToast();
const { getSession } = useAuth();
const session = getSession();
const isUpdatable = isAuthorized(session, "user.write.all");

const fetchUser = async (page, size) => {
  return await fetch(`/api/users?page=${page}&size=${size}`);
};

// table
const colums = [
  { key: "id", label: "ID" },
  { key: "userCode", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "actions", label: "Actions" },
];

// actions
const disableUser = async (user) => {
  const res = await fetch(`/api/users/status`, {
    method: "POST",
    body: JSON.stringify({
      id: user.id,
      isActive: 0,
      roleIds: user.roles.map((role) => role.id),
    }),
  });

  const status = res.status;
  if (status === 200) {
    toast.add({ title: "User disabled successfully" });
  } else {
    toast.add({ title: "Error disabling user", color: "red" });
  }
};

const enableUser = async (user) => {
  const res = await fetch(`/api/users/status`, {
    method: "POST",
    body: JSON.stringify({
      id: user.id,
      isActive: 1,
      roleIds: user.roles.map((role) => role.id),
    }),
  });

  const status = res.status;
  if (status === 200) {
    toast.add({ title: "User disabled successfully" });
  } else {
    toast.add({ title: "Error disabling user", color: "red" });
  }
};

const isChangingRole = ref(false);
const editingUser = ref({});
const selectedRoles = ref(0);
const startAssignUser = (user) => {
  editingUser.value = user;
  isChangingRole.value = true;
  selectedRoles.value = user.roles[0].id;
};
const changeRole = async (currentUser) => {
  const updateRes = await fetch(`/api/users/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentUser.id,
      isActive: currentUser.isActive,
      roleIds: [selectedRoles.value],
    }),
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Role updated successfully" });
  } else {
    toast.add({ title: "Error updating role" });
  }
  editingUser.value = {};
  isChangingRole.value = false;
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

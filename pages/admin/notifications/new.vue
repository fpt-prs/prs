<template>
  <NuxtLayout name="admin">
    <div class="px-4 py-3 border-b border-color">
      <UButton
        to="/admin/notifications"
        color="black"
        variant="link"
        label="Back"
        icon="i-heroicons-arrow-left"
      />
    </div>
    <div class="px-4 py-3">
      <p class="text-2xl font-semibold">New notification</p>
    </div>
    <UForm
      :validate="validate"
      :state="notification"
      class="w-full flex gap-4 px-4 py-3"
    >
      <div class="grow space-y-5">
        <UFormGroup label="Header" name="header">
          <UInput v-model="notification.header" />
        </UFormGroup>
        <UFormGroup label="Content" name="content">
          <UTextarea v-model="notification.content" />
        </UFormGroup>
        <UButton @click="submit" label="Send" />
      </div>
      <div class="grow py-3">
        <UCheckbox
          v-for="role of roles"
          :key="role.id"
          :label="role.name"
          @change="toggleRole(role)"
        />
      </div>
    </UForm>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "New notification",
});
const router = useRouter();
const { getSession } = useAuth();
const session = await getSession();

const notification = ref({});

const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});

const selectedRoles = ref([]);

const toggleRole = (role) => {
  if (selectedRoles.value.includes(role.id)) {
    selectedRoles.value = selectedRoles.value.filter(
      (selectedRole) => selectedRole !== role.id
    );
  } else {
    selectedRoles.value.push(role.id);
  }
};

const submit = async () => {
  console.log(selectedRoles.value);

  const createNotiRequest = {
    header: notification.value.header,
    content: notification.value.content,
    roleIds: selectedRoles.value,
  };

  const response = await fetch("/api/notifications", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createNotiRequest),
  });

  const status = response.status;
  const toast = useToast();
  const router = useRouter();
  if (status === 200) {
    toast.add({ title: "Notification created" });
    router.push("/admin/notifications");
  } else {
    toast.add({ title: "Failed to create notification" });
  }
};

const validate = () => {
  return true;
};
</script>

<style></style>

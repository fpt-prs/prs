<template>
  <NuxtLayout name="admin">
    <div class="">
      <div class="px-4 py-3 text-xl font-medium border-b border-color">
        User Detail
      </div>
      <div class="p-4 border-b border-color">
        <div class="user-id">
          ID:
          <span class="text-color">
            {{ user.id }}
          </span>
        </div>
        <div class="user-name">
          Name:
          <span class="text-color">
            {{ user.name }}
          </span>
        </div>
        <div class="user-email">
          Email:
          <span class="text-color">
            {{ user.email }}
          </span>
        </div>
        <div class="user-user-id">
          UUID:
          <span class="text-color">
            {{ user.user_id }}
          </span>
        </div>
        <div class="user-active">
          Active status:
          <span class="text-color">
            {{ user.is_active ? "Active" : "Inactive" }}
          </span>
        </div>
      </div>
    </div>
    <div class="px-4 py-3 text-xl font-medium border-b border-color">
      Billing history
    </div>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "User Detail",
});

const router = useRoute();
const sub = router.params.sub;

const user = ref({});
onMounted(async () => {
  const response = await fetch("/api/users/" + sub);
  const data = await response.json();
  const body = JSON.parse(data.body);
  user.value = body;
});

// table
const colums = [
  { key: "id", label: "ID" },
  { key: "user_id", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "active", label: "Active" },
];

// actions
const disableUser = async (id) => {
  user.value = user.value.map((user) => {
    if (user.id === id) {
      user.is_active = 0;
    }
    return user;
  });
};

const enableUser = async (id) => {
  user.value = user.value.map((user) => {
    if (user.id === id) {
      user.is_active = 1;
    }
    return user;
  });
};
</script>

<style></style>

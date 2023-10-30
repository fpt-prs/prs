<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <p class="text-xl px-4 py-3 border-b border-color">Roles</p>
      <table class="w-full">
        <thead class="p-3 border-b border-color">
          <tr>
            <td class="p-3 font-semibold">ID</td>
            <td class="p-3 font-semibold">Name</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="role of roles"
            :key="role.id"
            class="border-b border-color"
          >
            <td class="p-3">{{ role.id }}</td>
            <td class="p-3">{{ role.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "Role Management",
});

//roles
const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});

// table
const colums = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
];
</script>

<style></style>

<template>
  <NuxtLayout name="admin">
    <div class="grow">
      <p class="text-xl px-4 py-3 border-b border-color">Permissions</p>
      <table class="w-full">
        <thead class="p-3 border-b border-color">
          <tr>
            <td class="p-3 font-semibold">ID</td>
            <td class="p-3 font-semibold">Name</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="permission of permissions"
            :key="permission.id"
            class="border-b border-color"
          >
            <td class="p-3">{{ permission.id }}</td>
            <td class="p-3">{{ permission.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "Permission Management",
})

// permissions
const permissions = ref([]);

onMounted(async () => {
  const response = await fetch("/api/permissions");
  const data = await response.json();
  const body = JSON.parse(data.body);
  permissions.value = body;
});

</script>

<style>

</style>


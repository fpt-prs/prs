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
      <p class="text-2xl font-semibold">View notification</p>
    </div>
    <div class="w-full flex gap-4 px-4 py-3 max-w-[60rem]">
      <div class="grow space-y-5">
        <p class="text-xl font-medium">Header</p>
        <p class="">
          {{ notification.header }}
        </p>
        <hr class="border-color" />
        <p class="text-xl font-medium">Content</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          delectus iure, odio, veritatis esse reprehenderit possimus omnis
          obcaecati sequi deleniti saepe sed ipsam, praesentium debitis sunt
          illo optio exercitationem in. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Pariatur hic reprehenderit ipsum voluptatibus
          deleniti accusantium laboriosam sapiente, quisquam, perferendis ex cum
          ratione autem sunt voluptatem enim modi, possimus tempore molestiae
          fugit minus? Velit sequi similique adipisci dicta maxime, laboriosam
          aliquam! Harum natus, quaerat modi, autem maiores expedita voluptatem
          ad reprehenderit laudantium ipsum eius sapiente excepturi architecto
          delectus eos exercitationem pariatur? Eligendi, laboriosam! Libero
          dolor fugit illum, modi aliquam doloremque voluptas, dolorem,
          laboriosam vel saepe quam mollitia. Hic laboriosam, nisi illo
          dignissimos nostrum, laudantium, debitis commodi sequi ut voluptates
          harum enim soluta. Dolorem error officia inventore, neque quae
          molestiae consequuntur nesciunt!
        </p>
        <hr class="border-color" />
        <p class="text-xl font-medium">Created</p>
        <p>
          {{ formatDate(parseDateTime(notification.created)) || "---" }}
        </p>
      </div>
      <div class="grow py-3">
        <p>Visible to:</p>
        <UCheckbox
          v-for="role of roles"
          :key="role.id"
          :label="role.name"
          :model-value="isVisible(notification.roles, role)"
          disabled
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "New notification",
});
const router = useRouter();
const { getSession } = useAuth();
const session = await getSession();

const route = useRoute();
const id = route.params.id;

const notification = ref({});
onMounted(async () => {
  const response = await fetch(`/api/notifications/${id}`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  notification.value = body;
});

const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});

const isVisible = (roles, role) => {
  return roles.map((r) => r.id).includes(role.id);
};
</script>

<style></style>

<template>
  <NuxtLayout name="admin">
    <div class="">
      <div
        class="px-4 py-3 text-xl font-medium border-b border-color flex justify-between"
      >
        <div class="">User Detail</div>
        <div class="">
          <ModalConfirmButton
            :color="user.isActive === 1 ? 'red' : 'green'"
            variant="solid"
            :label="user.isActive === 1 ? 'Deactive' : 'Active'"
            @confirm="toggleActive"
            v-if="isWritable && isActiveUpdatable"
          />
        </div>
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
            {{ user.userCode }}
          </span>
        </div>
        <div class="user-active">
          Active status:
          <span class="text-color">
            {{ user.isActive ? "Active" : "Inactive" }}
          </span>
        </div>
        <div class="user-active">
          Hash:
          <span class="text-color">
            {{ user.hash }}
          </span>
        </div>
        <div class="user-active">
          Role:
          <span class="text-color">
            {{ user.roles ? user.roles[0].name : "---" }}
          </span>
        </div>
      </div>
    </div>
    <div class="px-4 py-3 text-xl font-medium border-b border-color">
      Billing history
    </div>
    <Paginator :loader="fetchBillHistory" :size="3" v-if="user.id">
      <template #item="{ data: bill }">
        <div class="px-4 py-3 flex justify-between items-center">
          <div class="">
            <p class="text-3xl">
              {{ `${numberWithSep(bill.balanceChange)} VND` }}
            </p>
            <p class="text-color">
              {{ bill.reason }}
            </p>
          </div>
          <div class="flex flex-col justify-between">
            <p class="text-color">
              {{ formatDateTime(parseDateTime(bill.timestamp)) }}
            </p>
          </div>
        </div>
      </template>
    </Paginator>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "User Detail",
});

const { getSession } = useAuth();
const session = await getSession();
const isWritable = await isAuthorized(session, "user.write.all");

const route = useRoute();
const sub = route.params.sub;
const toast = useToast();

const user = ref({});
onMounted(async () => {
  const response = await fetch("/api/users/" + sub);
  const data = await response.json();
  const body = JSON.parse(data.body);
  user.value = body;
});
const isActiveUpdatable = computed(() => {
  if (!user.value.roles) return false;
  return user.value.roles[0].name.toLowerCase() !== "admin";
});

const toggleActive = async () => {
  const id = user.value.id;

  const status = await fetch(`/api/users/status`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
      isActive: user.value.isActive === 1 ? 0 : 1,
    }),
  });

  if (status.status === 200) {
    toast.add({ title: "Updated status" });
    user.value.isActive = user.value.isActive === 1 ? 0 : 1;
  } else {
    toast.add({ title: "Failed to update status" });
  }
};

const fetchBillHistory = async (page, size) => {
  const params = new URLSearchParams();
  params.append("userId", user.value.id.toString());
  params.append("page", page.toString());
  params.append("size", size.toString());

  return await fetch(`/api/bills/user?${params.toString()}`);
};
</script>

<style></style>

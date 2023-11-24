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
            v-if="isWritable"
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
    <div class="px-4 py-3 space-y-4">
      <div
        class="px-4 py-3 bg-color rounded-xl border border-color flex justify-between"
        v-for="bill in bills"
      >
        <div class="space-y-9">
          <p class="text-3xl">
            {{ `${numberWithSep(bill.pricingOption?.price)} VND` }}
          </p>
          <div class="">
            <p class="">
              Client: <span class="text-color">{{ bill.client?.name }}</span>
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <p>{{ bill.created?.toLocaleString() }}</p>
          <div class="">
            <p class="">
              Verified by:
              <span class="text-color">{{ bill.verifier?.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const router = useRouter();
const { getSession } = useAuth();
const session = await getSession();
const isWritable = await isAuthorized(session, "user.write.all");

// meta
useHead({
  title: "User Detail",
});

const route = useRoute();
const sub = route.params.sub;
const toast = useToast();

const user = ref({});
onMounted(async () => {
  const response = await fetch("/api/users/" + sub);
  const data = await response.json();
  const body = JSON.parse(data.body);
  console.log(body);
  user.value = body;
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

// bills
const bills = ref([]);
onMounted(async () => {
  const response = await fetch(`/api/bills/user`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  bills.value = body.content;
});
</script>

<style></style>

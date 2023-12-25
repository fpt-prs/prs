<template>
  <NuxtLayout name="default">
    <div class="grow">
      <p class="text-xl px-4 py-3">Billing</p>
      <div class="px-4 py-3 grid lg:grid-cols-2 items-center gap-4">
        <UCard class="grow">
          <p>Current subscription</p>
          <p class="text-4xl">
            {{
              currentSubDetail != null
                ? currentSubDetail.subscription.name
                : "---"
            }}
          </p>
        </UCard>
        <UCard class="grow">
          <p>Balance</p>
          <div class="flex max-lg:flex-col lg:items-center gap-2">
            <p class="text-4xl break-all">
              {{
                balance != null && balance !== undefined
                  ? numberWithSep(Math.round(balance))
                  : "---"
              }}
            </p>
            <UButton
              icon="i-heroicons-plus"
              size="xl"
              variant="ghost"
              to="/purchase"
            />
          </div>
        </UCard>
        <UCard class="grow" v-if="currentSubDetail">
          <p>Ends in</p>
          <p class="text-4xl py-2">
            {{ currentSubDetail && dateLeft > 0 ? dateLeft : "---" }} days
          </p>
          <div class="flex items-center gap-2" v-if="currentSubDetail?.user">
            <UToggle v-model="isRefreshed" />
            <p>Auto refresh</p>
          </div>
        </UCard>
      </div>
      <p class="border-y border-color px-4 py-3">Subscribe</p>
      <div class="px-4 py-3 flex gap-3 overflow-x-auto">
        <div
          class="px-6 py-5 border border-dashed hover:border-solid border-color hover:border-blue-800 hover:dark:border-blue-400 rounded-lg cursor-pointer hover:bg-blue-200 hover:dark:bg-blue-900/40 hover:text-blue-800 hover:dark:text-blue-400"
          v-for="subscription of subscriptions"
          :key="subscription.id"
          @click="selectSubscription(subscription)"
        >
          <p class="text-2xl font-semibold">
            {{ subscription.name }}
          </p>
          <p class="whitespace-pre">
            {{
              numberWithSep(subscription.price) + " VND / " + subscription.duration + " day(s)"
            }}
          </p>
        </div>
        <UModal v-model="isConfirm" @close="isConfirm = false">
          <UCard>
            <template #header>
              <div class="flex justify-between">
                <p>Subscribe</p>
                <UButton
                  icon="i-heroicons-x-mark"
                  color="gray"
                  variant="ghost"
                  @click="isConfirm = false"
                />
              </div>
            </template>
            <div>Confirm subscribe ?</div>
            <template #footer>
              <div class="space-x-4">
                <UButton
                  label="Cancel"
                  color="gray"
                  @click="isConfirm = false"
                />
                <UButton label="Confirm" variant="ghost" @click="subscribe()" />
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
      <p class="border-y border-color px-4 py-3" v-if="currentSubDetail">
        Unsubscribe
      </p>
      <div class="px-4 py-3 flex gap-3">
        <ModalConfirmButton
          icon="i-heroicons-trash"
          label="Unsubscribe"
          color="red"
          variant="outline"
          @confirm="cancelSubscription"
          v-if="currentSubDetail"
        />
      </div>
      <p class="border-y border-color px-4 py-3">Balance updates</p>
      <Paginator :loader="fetchBillHistory" :size="3">
        <template #item="{ data: bill }">
          <div class="px-4 py-3 md:flex justify-between items-center">
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
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Billing",
});
const toast = useToast();

const balance = ref(null);
onMounted(async () => {
  const response = await fetch(`/api/profile/balance`);
  const data = await response.json();
  balance.value = data.value;
});

const fetchBillHistory = async (page, size) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());

  return await fetch(`/api/bills/self?${params.toString()}`);
};

const subscriptions = ref([]);
onMounted(async () => {
  const response = await fetch(`/api/subscriptions`);
  const data = await response.json();
  subscriptions.value = JSON.parse(data.body);
});

const isConfirm = ref(false);
const selectingSubscription = ref(null);
const selectSubscription = (subscription) => {
  const currentSubDuration =
    currentSubDetail.value?.subscription?.duration || 0;
  const currentSubPrice = currentSubDetail.value?.subscription?.price || 0;

  const newSubDuration = subscription.duration;

  if (currentSubDuration > newSubDuration) {
    toast.add({
      title: "Cannot downgrade subscription",
      description: "Please cancel first",
      color: "red",
    });
    return;
  }
  if (currentSubDuration === newSubDuration) {
    toast.add({
      title: "You are already using this subscription",
      color: "red",
    });
    return;
  }

  if (currentSubPrice > balance.value) {
    toast.add({ title: "Insufficient balance", color: "red" });
    return;
  }

  selectingSubscription.value = subscription;
  isConfirm.value = true;
};
const subscribe = async () => {
  const response = await fetch(`/api/profile/sub`, {
    method: "PUT",
    body: JSON.stringify({
      subscriptionId: selectingSubscription.value.id,
    }),
  });

  const body = await response.json();
  if (response.status === 200) {
    toast.add({ title: "Subscribed" });
    isConfirm.value = false;
    await fetchSubDetail();
  } else {
    toast.add({ title: "Failed to subscribe", description: body.error });
  }
};

const cancelSubscription = async () => {
  const response = await fetch(`/api/profile/sub/cancel`, {
    method: "POST",
  });

  const body = await response.json();
  if (response.status === 200) {
    toast.add({ title: "Canceled subscription" });
    await fetchSubDetail();
  } else {
    toast.add({
      title: "Failed to cancel subscription",
      description: body.error,
    });
  }
};

const currentSubDetail = ref(null);
const fetchSubDetail = async () => {
  const response = await fetch(`/api/profile/sub`);
  const data = await response.json();
  if (!data.value) {
    return;
  }
  currentSubDetail.value = data.value;
}
onMounted(fetchSubDetail);

const isRefreshed = computed({
  get() {
    if (!currentSubDetail.value) {
      return false;
    }
    return currentSubDetail.value.user.autoRefresh !== 0;
  },
  set(value) {
    currentSubDetail.value.user.autoRefresh = value ? 1 : 0;
  },
});

watch(isRefreshed, async (value) => {
  if (value === undefined || value === null) {
    return;
  }
  const response = await fetch(`/api/profile/sub/auto`, {
    method: "POST",
    body: JSON.stringify({
      autoRefresh: value,
    }),
  });

  const body = await response.json();
  if (response.status !== 200) {
    toast.add({
      title: "Failed to update",
      description: body.error,
    });
  }
});

const dateLeft = computed(() => {
  if (!currentSubDetail.value) {
    return 0;
  }
  const nextDeduct = parseDateTime(currentSubDetail.value.nextDeduct);
  const now = new Date();
  return Math.round((nextDeduct - now) / (1000 * 60 * 60 * 24));
});
</script>

<style></style>

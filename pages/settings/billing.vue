<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Billing</p>
      <div class="px-4 py-3">
        <UCard>
          <p>View balance</p>
          <p class="text-4xl">{{ balance || "---" }}</p>
        </UCard>
      </div>
      <p class="border-y border-color px-4 py-3">Purchase new views</p>
      <div class="px-4 py-3">
        <div class="grid grid-cols-3 gap-4">
          <a
            class="p-3 rounded-lg border border-color text-center"
            v-for="option of options"
            :href="`/purchase?optionId=${option.id}`"
          >
            <p class="text-xl">{{ option.description }}</p>
            <p class="text-3xl py-4 font-semibold">
              {{ `${numberWithSep(option.price)} VND` }}
            </p>
            <p class="text-gray-500">{{ option.numsOfView }} views</p>
          </a>
        </div>
      </div>
      <p class="border-y border-color px-4 py-3">Billing history</p>
      <div class="px-4 py-3 space-y-4">
        <div class="px-4 py-3 flex justify-between" v-for="bill in bills">
          <div class="space-y-9">
            <p class="text-3xl">
              {{ `+ ${numberWithSep(bill.pricingOption?.price)} VND` }}
            </p>
          </div>
          <div class="flex flex-col justify-between">
            <p>{{ formatDateTime(parseDateTime(bill.created)) }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Billing",
});

const balance = ref(null);
onMounted(async () => {
  const response = await fetch(`/api/profile/balance`);
  const data = await response.json();
  balance.value = data.value;
});

const bills = ref([]);
onMounted(async () => {
  const response = await fetch(`/api/bills/user`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  bills.value = body.content;
});

const options = ref([]);
onMounted(async () => {
  const response = await fetch(`/api/pricing-options`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  options.value = body;
});
</script>

<style></style>

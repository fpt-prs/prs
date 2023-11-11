<template>
  <NuxtLayout name="settings">
    <div class="grow">
      <p class="text-xl px-4 py-3">Billing</p>
      <p class="border-y border-color px-4 py-3">Billing history</p>
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
      <p class="border-y border-color px-4 py-3">Purchase new views</p>
      <div class="px-4 py-3">
        <div class="grid grid-cols-3 gap-4">
          <UCard
            v-for="option of options"
            class="cursor-pointer hover:bg-gray-600"
            as="a"
            :href="`/purchase?optionId=${option.id}`"
          >
            <p>{{ `${numberWithSep(option.price)} VND` }}</p>
            <p class="text-gray-500">{{ option.numsOfView }} views</p>
          </UCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Billing",
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

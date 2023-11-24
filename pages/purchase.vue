<template>
  <UButton
    class="absolute top-5 left-5"
    color="gray"
    variant="ghost"
    label="Back"
    icon="i-heroicons-arrow-left"
    @click="$router.back()"
  />

  <div class="w-full h-screen flex flex-col gap-5 items-center justify-center">
    <img :src="qrCode" alt="QR Code" class="w-52 h-52" />

    <p class="text-xl">Amount: {{ option.price }} VND</p>
    <p class="text-xl">Account number: {{ account.accountNumber }}</p>
    <p class="text-xl">Owner name: {{ account.name }}</p>
    <p class="text-xl">Bank name: {{ account.bankName }}</p>

    <p class="text-2xl">Content: {{ user.hash }}</p>
  </div>
</template>

<script setup>
// get query
const { query } = useRoute();
const optionId = query.optionId;
const option = ref({});

onMounted(async () => {
  const response = await fetch(`/api/pricing-options/${optionId}`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  option.value = body;
});

const user = ref({});
onMounted(async () => {
  const response = await fetch(`/api/profile`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  user.value = body;
});

const account = ref({});
const qrCode = ref("");
onMounted(async () => {
  const response = await fetch(`/api/accounts/active`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  account.value = body;
  const imageFetch = await fetch(`/api/accounts/${account.value.id}/image`);
  const image = await imageFetch.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(image).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  qrCode.value = `data:image/png;base64,${base64}`;
});
</script>

<style></style>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Verify payment</p>
    <UForm
      :validate="validate"
      :state="state"
      @submit="onSubmit"
      class="p-4 space-y-4"
    >
      <UFormGroup label="Message" name="message">
        <UInput placeholder="Enter message" v-model="paymentForm.message" />
      </UFormGroup>
      <UFormGroup label="Amount" name="amount">
        <UInput placeholder="Enter amount" v-model="paymentForm.amount" />
      </UFormGroup>
      <UButton label="Verify" />
    </UForm>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Payment",
});

const paymentForm = reactive({
  message: "",
  amount: 0,
});

const validate = (paymentForm) => {
  const errors = [];
  if (!paymentForm.message)
    errors.push({ path: "message", message: "Required" });
  if (!paymentForm.amount) errors.push({ path: "amount", message: "Required" });
  return errors;
};

async function onSubmit(event) {
  // Do something with data
}
</script>

<style></style>

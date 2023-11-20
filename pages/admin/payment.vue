<template>
  <NuxtLayout name="admin">
    <div class="flex min-h-full">
      <div class="grow border-r border-color">
        <p class="text-2xl px-4 py-3">Billing history</p>
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
                  Client:
                  <span class="text-color">{{ bill.client?.name }}</span>
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
      </div>
      <div class="min-w-[24em]" v-if="isPaymentWritable">
        <p class="text-2xl px-4 py-3">Verify payment</p>
        <UForm
          :validate="validate"
          :state="paymentForm"
          @submit="onSubmit"
          class="p-4 space-y-4"
        >
          <UFormGroup label="Message" name="message">
            <UInput placeholder="Enter message" v-model="paymentForm.message" />
          </UFormGroup>
          <UFormGroup label="Amount" name="amount">
            <UInput placeholder="Enter amount" v-model="paymentForm.amount" />
          </UFormGroup>
          <UFormGroup label="Note" name="note">
            <UInput placeholder="Enter note" v-model="paymentForm.note" />
          </UFormGroup>
          <UButton label="Verify" type="Submit" />
        </UForm>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Payment",
});
const { getSession } = useAuth();
const session = await getSession();
const isPaymentWritable = await isAuthorized(session, "payment.write.all");

const paymentForm = reactive({
  message: "",
  amount: 0,
  note: "",
});

const validate = (paymentForm) => {
  const errors = [];
  if (!paymentForm.message)
    errors.push({ path: "message", message: "Required" });
  if (!paymentForm.amount) errors.push({ path: "amount", message: "Required" });
  return errors;
};

async function onSubmit(event) {
  const res = await fetch("/api/bills", {
    method: "PUT",
    body: JSON.stringify({
      userHash: paymentForm.message,
      amount: paymentForm.amount,
      note: paymentForm.note,
    }),
  });
}

const bills = ref([]);

onMounted(async () => {
  const res = await fetch("/api/bills");
  const data = await res.json();
  console.log(data);
  const body = JSON.parse(data.body);
  const page = body.content;
  bills.value = page;
});
</script>

<style></style>

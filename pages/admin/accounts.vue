<script setup>
useHead({
  title: "Account Management",
});
const { getSession } = useAuth();
const session = await getSession();
const isPaymentWritable = await isAuthorized(session, "payment.write.all");

const newAccount = ref({});
const validate = computed(() => {
  return (
    newAccount.value.name &&
    newAccount.value.accountNumber &&
    newAccount.value.bankName &&
    newQR.value
  );
});

const isEditing = ref(false);
const editingAccount = ref({});

const accounts = ref([]);
const fetchAccounts = async () => {
  const response = await fetch("/api/accounts");
  const data = await response.json();
  const body = JSON.parse(data.body);
  accounts.value = body;
};
onMounted(fetchAccounts);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "accountNumber", label: "Account Number" },
  { key: "bankName", label: "Bank Name" },
  { key: "isActive", label: "Active" },
  { key: "actions", label: "Actions" },
];

const actions = (account) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      click: () => {
        isEditing.value = true;
        editingAccount.value = { ...account };
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removeAccount(account);
      },
    },
  ],
];

const addAccount = async () => {
  const accountCreateRequest = {
    name: newAccount.value.name,
    accountNumber: newAccount.value.accountNumber,
    bankName: newAccount.value.bankName,
    qrCode: newQR.value,
  };

  const formData = new FormData();
  for (const key in accountCreateRequest) {
    formData.append(key, accountCreateRequest[key]);
  }

  const addRes = await fetch(`/api/accounts`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  // const data = await addRes.json();
  const status = addRes.status;
  const toast = useToast();

  if (status === 200) {
    toast.add({ title: "Account added successfully" });
    newAccount.value = {};
    await fetchAccounts();
  } else {
    toast.add({ title: "Error adding account" });
  }
};

const removeAccount = async (account) => {
  const updateRes = await fetch(`/api/accounts/${account.id}`, {
    method: "DELETE",
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 204) {
    toast.add({ title: "Account deleted successfully" });
    await fetchAccounts();
  } else {
    toast.add({ title: "Error deleting account" });
  }
};

const updateAccount = async () => {
  const updateAccountReq = {
    description: editingAccount.value.description,
    price: parseFloat(editingAccount.value.price),
    numsOfView: parseInt(editingAccount.value.numsOfView),
  };

  const updateRes = await fetch(`/api/accounts/${editingAccount.value.id}`, {
    method: "POST",
    body: JSON.stringify(updateAccountReq),
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Account updated successfully" });
    await fetchAccounts();
  } else {
    toast.add({ title: "Error updating account" });
  }

  isEditing.value = false;
  editingAccount.value = {};
};

const newQR = ref(null);
const onFileChange = (event) => {
  newQR.value = event.target.files[0];
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Pricing accounts</p>
    <div class="border border-color rounded-lg mx-4">
      <table class="w-full">
        <thead class="border-b border-color">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account of accounts" :key="account.id">
            <td class="px-4 py-3">{{ account.id }}</td>
            <td class="px-4 py-3">{{ account.name }}</td>
            <td class="px-4 py-3">{{ account.accountNumber }}</td>
            <td class="px-4 py-3">{{ account.bankName }}</td>
            <td class="px-4 py-3">
              {{ account.isActive ? "Active" : "Inactive" }}
            </td>
            <td class="px-4 py-3">
              <UDropdown
                :items="actions(account)"
                :popper="{ placement: 'bottom-end' }"
              >
                <UButton
                  color="white"
                  variant="ghost"
                  label=""
                  trailing-icon="i-heroicons-ellipsis-horizontal"
                />
              </UDropdown>
            </td>
          </tr>
          <tr v-if="isPaymentWritable">
            <td></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter name"
                size="lg"
                class="w-full"
                v-model="newAccount.description"
              />
            </td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter account number"
                size="lg"
                class="w-full"
                v-model="newAccount.accountNumber"
              />
            </td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter bank name"
                size="lg"
                class="w-full"
                v-model="newAccount.bankName"
              />
            </td>
            <td class="px-4 py-3">
              <input
                id="fileInput"
                type="file"
                @change="onFileChange"
                class="hidden"
              />
              <label for="fileInput">
                <div
                  class="border px-3 py-2 border-dashed border-color rounded-lg cursor-pointer hover:border-solid hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Upload QR code
                </div>
              </label>
            </td>
            <td class="px-4 py-3">
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-plus-20-solid"
                :disabled="!validate"
                @click="addAccount"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <UModal v-model="isEditing">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Edit Account</h3>
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-x-mark"
                @click="isEditing = false"
              />
            </div>
          </template>
          <div class="space-y-5">
            <UFormGroup label="Name">
              <UInput
                placeholder="Name"
                size="lg"
                class="w-full"
                v-model="editingAccount.name"
              />
            </UFormGroup>
            <UFormGroup label="Account Number">
              <UInput
                placeholder="Account Number"
                size="lg"
                class="w-full"
                v-model="editingAccount.accountNumber"
              />
            </UFormGroup>
            <UFormGroup label="Bank Name">
              <UInput
                placeholder="Bank Name"
                size="lg"
                class="w-full"
                v-model="editingAccount.bankName"
              />
            </UFormGroup>
            <UFormGroup label="Active">
              <div class="flex items-center gap-3">
                <UToggle v-model="editingAccount.isActive" />
                <p class="text-sm text-color">
                  {{ editingAccount.isActive ? "Active" : "Inactive" }}
                </p>
                <UTooltip
                  :text="`Activate this account will disable all other accounts`"
                >
                  <UIcon
                    name="i-heroicons-question-mark-circle"
                    class="w-4 h-4 text-color cursor-pointer"
                  />
                </UTooltip>
              </div>
            </UFormGroup>
          </div>
          <template #footer>
            <div class="space-x-4">
              <UButton label="Cancel" @click="isEditing = false" color="gray" />
              <UButton
                label="Update"
                variant="soft"
                @click="updateAccount"
                color="green"
              />
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

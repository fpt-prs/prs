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
const isEditingAccountActive = computed({
  get() {
    return editingAccount.value.isActive !== 0;
  },
  set(value) {
    editingAccount.value.isActive = value ? 1 : 0;
  },
});

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
        fetchCurrentQR(account.id);
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
  const formData = new FormData();
  formData.append("name", newAccount.value.name);
  formData.append("accountNumber", newAccount.value.accountNumber);
  formData.append("bankName", newAccount.value.bankName);
  formData.append("qrCode", newQR.value);

  const addRes = await fetch(`/api/accounts`, {
    method: "PUT",
    body: formData,
  });

  // const data = await addRes.json();
  const status = addRes.status;
  const toast = useToast();

  if (status === 200) {
    toast.add({ title: "Account added successfully" });
    newAccount.value = {};
    newQR.value = null;
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
  if (status === 200) {
    toast.add({ title: "Account deleted successfully" });
    await fetchAccounts();
  } else {
    toast.add({ title: "Error deleting account" });
  }
};

const updateAccount = async () => {
  const formData = new FormData();
  formData.append("id", editingAccount.value.id);
  formData.append("name", editingAccount.value.name);
  formData.append("accountNumber", editingAccount.value.accountNumber);
  formData.append("bankName", editingAccount.value.bankName);
  formData.append("isActive", editingAccount.value.isActive);
  const file = new File([editingQR.value], "qr.png");
  formData.append("qrCode", file);

  const updateRes = await fetch(`/api/accounts`, {
    method: "POST",
    body: formData,
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

const editingQR = ref(null);
const base64QR = computed(() => {
  const base64 = btoa(
    new Uint8Array(editingQR.value).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return base64;
});
const onFileChangeEditing = (event) => {
  const file = event.target.files[0];
  // convert to array buffer
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    editingQR.value = reader.result;
  };
};
const fetchCurrentQR = async (id) => {
  editingQR.value = null;
  const response = await fetch(`/api/accounts/${id}/image`);
  const data = await response.arrayBuffer();
  editingQR.value = data;
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Bank accounts</p>
    <div class="border border-color rounded-lg overflow-x-auto mx-4">
      <table class="w-full">
        <thead class="border-b border-color">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider first:sticky left-0 bg-white dark:bg-gray-950 rounded-lg"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account of accounts" :key="account.id">
            <td class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950">
              {{ account.id }}
            </td>
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
            <td
              class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950 z-10"
            ></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter name"
                size="lg"
                class="w-full"
                v-model="newAccount.name"
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
            <td class="px-4 py-3 w-[20%]">
              <input
                id="fileInput"
                type="file"
                @change="onFileChange"
                class="hidden"
              />
              <label for="fileInput">
                <div
                  :class="{
                    'border px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2': true,
                    'border-dashed border-color hover:border-solid': !newQR,
                    'border-solid border-green-400 hover:border-solid text-green-600 dark:text-green-400':
                      newQR,
                  }"
                >
                  <UIcon
                    name="i-heroicons-check"
                    class="w-5 h-5 text-green-600 dark:text-green-400"
                    v-if="newQR"
                  />
                  <UIcon
                    name="i-heroicons-arrow-up-tray"
                    class="w-5 h-5 text-color"
                    v-else
                  />
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
            <div class="flex gap-4">
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
            </div>
            <UFormGroup label="Active">
              <div class="flex items-center gap-3">
                <UToggle v-model="isEditingAccountActive" />
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
            <UFormGroup label="QR Code">
              <div class="flex items-center gap-4">
                <img
                  :src="`data:image/png;base64,${base64QR}`"
                  class="w-32 h-32"
                />
                <input
                  id="fileInputEditing"
                  type="file"
                  @change="onFileChangeEditing"
                  class="hidden"
                  accept="image/*"
                />
                <label for="fileInputEditing">
                  <div
                    class="border px-3 py-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:border-solid hover:bg-green-100 dark:hover:bg-green-950 hover:text-green-500 dark:hover:text-green-300"
                  >
                    Upload new QR code
                  </div>
                </label>
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

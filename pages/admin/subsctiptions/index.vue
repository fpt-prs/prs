<script setup>
useHead({
  title: "Subscription Management",
});
const router = useRouter();
const { getSession } = useAuth();
const session = await getSession();
const isPaymentWritable = await isAuthorized(session, "payment.write.all");

const newOption = ref({});
const validate = computed(() => {
  return (
    newOption.value.name && newOption.value.price && newOption.value.duration
  );
});

const isEditing = ref(false);
const editingOpt = ref({});

const options = ref([]);
const fetchOptions = async () => {
  const response = await fetch("/api/pricing-options");
  const data = await response.json();
  const body = JSON.parse(data.body);
  options.value = body;
};
onMounted(fetchOptions);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "duration", label: "Duration in days" },
  { key: "actions", label: "Actions" },
];

const actions = (option) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      click: () => {
        isEditing.value = true;
        editingOpt.value = { ...option };
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        removeOption(option);
      },
    },
  ],
];

const addOption = async () => {
  const optionCreateRequest = {
    name: newOption.value.name,
    price: parseFloat(newOption.value.price),
    duration: parseInt(newOption.value.duration),
  };

  const addRes = await fetch(`/api/pricing-options`, {
    method: "PUT",
    body: JSON.stringify(optionCreateRequest),
  });

  // const data = await addRes.json();
  const status = addRes.status;
  const toast = useToast();

  if (status === 200) {
    toast.add({ title: "Option added successfully" });
    newOption.value = {};
    await fetchOptions();
  } else {
    toast.add({ title: "Error adding option" });
  }
};

const removeOption = async (option) => {
  const updateRes = await fetch(`/api/pricing-options/${option.id}`, {
    method: "DELETE",
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Option deleted successfully" });
    await fetchOptions();
  } else {
    toast.add({ title: "Error deleting option" });
  }
};

const updateOption = async () => {
  const updateOptionReq = {
    name: editingOpt.value.name,
    price: parseFloat(editingOpt.value.price),
    duration: parseInt(editingOpt.value.duration),
  };

  const updateRes = await fetch(`/api/pricing-options/${editingOpt.value.id}`, {
    method: "POST",
    body: JSON.stringify(updateOptionReq),
  });

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Option updated successfully" });
    await fetchOptions();
  } else {
    toast.add({ title: "Error updating option" });
  }

  isEditing.value = false;
  editingOpt.value = {};
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Subscription</p>
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
          <tr v-for="option of options" :key="option.id">
            <td class="px-4 py-3 sticky left-0 bg-white dark:bg-gray-950">
              {{ option.id }}
            </td>
            <td class="px-4 py-3">{{ option.name }}</td>
            <td class="px-4 py-3">{{ option.price }}</td>
            <td class="px-4 py-3">{{ option.duration }}</td>
            <td class="px-4 py-3">
              <UDropdown
                :items="actions(option)"
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
              class="sticky left-0 bg-white dark:bg-gray-950 z-10 px-4 py-3"
            ></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter name"
                size="lg"
                class="w-full"
                v-model="newOption.name"
              />
            </td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter price"
                type="number"
                size="lg"
                class="w-full"
                v-model="newOption.price"
              />
            </td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter duration in days"
                type="number"
                size="lg"
                class="w-full"
                v-model="newOption.duration"
              />
            </td>
            <td class="px-4 py-3">
              <UButton
                label=""
                variant="ghost"
                size="lg"
                trailing-icon="i-heroicons-plus-20-solid"
                :disabled="!validate"
                @click="addOption"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <UModal v-model="isEditing">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Edit Option</h3>
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
                v-model="editingOpt.name"
              />
            </UFormGroup>
            <UFormGroup label="Price">
              <UInput
                placeholder="Price"
                type="number"
                size="lg"
                class="w-full"
                v-model="editingOpt.price"
              />
            </UFormGroup>
            <UFormGroup label="Duration in days">
              <UInput
                placeholder="Duration in days"
                type="number"
                size="lg"
                class="w-full"
                v-model="editingOpt.duration"
              />
            </UFormGroup>
          </div>
          <template #footer>
            <div class="space-x-4">
              <UButton label="Cancel" @click="isEditing = false" color="gray" />
              <UButton
                label="Update"
                variant="soft"
                @click="updateOption"
                color="green"
              />
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { computed } from "vue";

useHead({
  title: "Option Management",
});

const newOption = ref({});
const validate = computed(() => {
  return (
    newOption.value.description &&
    newOption.value.price &&
    newOption.value.numsOfView
  );
});

const isEditing = ref(false);
const editingOption = ref({});

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
  { key: "description", label: "Description" },
  { key: "price", label: "Price" },
  { key: "numsOfView", label: "Number of views" },
  { key: "actions", label: "Actions" },
];

const actions = (option) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-20-solid",
      click: () => {
        isEditing.value = true;
        editingOption.value = { ...option };
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
    description: newOption.value.description,
    price: parseFloat(newOption.value.price),
    numsOfView: parseInt(newOption.value.numsOfView),
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
  if (status === 204) {
    toast.add({ title: "Option deleted successfully" });
    await fetchOptions();
  } else {
    toast.add({ title: "Error deleting option" });
  }
};

const updateOption = async () => {
  const updateOptionReq = {
    description: editingOption.value.description,
    price: parseFloat(editingOption.value.price),
    numsOfView: parseInt(editingOption.value.numsOfView),
  };

  const updateRes = await fetch(
    `/api/pricing-options/${editingOption.value.id}`,
    {
      method: "POST",
      body: JSON.stringify(updateOptionReq),
    }
  );

  const status = updateRes.status;
  const toast = useToast();
  if (status === 200) {
    toast.add({ title: "Option updated successfully" });
    await fetchOptions();
  } else {
    toast.add({ title: "Error updating option" });
  }

  isEditing.value = false;
  editingOption.value = {};
};
</script>

<template>
  <NuxtLayout name="admin">
    <p class="text-2xl px-4 py-3">Pricing options</p>
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
          <tr v-for="option of options" :key="option.id">
            <td class="px-4 py-3">{{ option.id }}</td>
            <td class="px-4 py-3">{{ option.description }}</td>
            <td class="px-4 py-3">{{ option.price }}</td>
            <td class="px-4 py-3">{{ option.numsOfView }}</td>
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
          <tr>
            <td></td>
            <td class="px-4 py-3">
              <UInput
                placeholder="Enter name"
                size="lg"
                class="w-full"
                v-model="newOption.description"
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
                placeholder="Enter number of views"
                type="number"
                size="lg"
                class="w-full"
                v-model="newOption.numsOfView"
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
            <UFormGroup label="Description">
              <UInput
                placeholder="Description"
                size="lg"
                class="w-full"
                v-model="editingOption.description"
              />
            </UFormGroup>
            <UFormGroup label="Price">
              <UInput
                placeholder="Price"
                type="number"
                size="lg"
                class="w-full"
                v-model="editingOption.price"
              />
            </UFormGroup>
            <UFormGroup label="Number of views">
              <UInput
                placeholder="Number of views"
                type="number"
                size="lg"
                class="w-full"
                v-model="editingOption.numsOfView"
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

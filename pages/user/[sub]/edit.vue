<template>
  <NuxtLayout name="admin">
    <div class="">
      <div
        class="px-4 py-3 text-xl font-medium border-b border-color flex justify-between"
      >
        <!-- back -->
        <UButton
          color="black"
          label="Back"
          variant="link"
          icon="i-heroicons-arrow-left"
          to="."
        />
      </div>
      <div
        class="px-4 py-3 text-xl font-medium border-b border-color flex justify-between"
      >
        <div class="">User Update</div>
        <div class="">
          <ModalConfirmButton
            variant="solid"
            label="Update"
            @confirm="updateUser"
          />
        </div>
      </div>
      <div class="p-4 space-y-5">
        <!-- country -->
        <UFormGroup label="Country">
          <UInput v-model="user.country" />
        </UFormGroup>

        <!-- gender -->
        <UFormGroup label="Gender">
          <URadio
            v-for="gender of genders"
            :key="gender.name"
            v-model="user.gender"
            :label="gender.name"
            v-bind="gender"
          />
        </UFormGroup>

        <!-- dob -->
        <UFormGroup label="Date of birth">
          <UInput type="date" v-model="user.dob" />
        </UFormGroup>

        <!-- phone number with regex -->
        <UFormGroup label="Phone number">
          <UInput v-model="user.phoneNumber" />
        </UFormGroup>

        <UFormGroup label="Active">
          <UCheckbox
            :checked="user.isActive === 1"
            @change="user.isActive = user.isActive === 1 ? 0 : 1"
            label="Active"
          />
        </UFormGroup>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "User Update",
});

const router = useRoute();
const sub = router.params.sub;
const toast = useToast();

const user = ref({});
onMounted(async () => {
  const response = await fetch("/api/users/" + sub);
  const data = await response.json();
  const body = JSON.parse(data.body);
  user.value = body;
});

const genders = [
  {
    name: "Male",
    value: "1",
  },
  {
    name: "Female",
    value: "0",
  },
];

const roles = ref([]);
onMounted(async () => {
  const response = await fetch("/api/roles");
  const data = await response.json();
  const body = JSON.parse(data.body);
  roles.value = body;
});

const updateUser = async () => {
  const userUpdateReq = {
    ...user.value,
  }
};
</script>

<style></style>

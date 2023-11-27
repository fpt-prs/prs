<template>
  <NuxtLayout name="default">
    <div class="max-w-[1000px] mx-5">
      <div class="px-4 py-3 text-xl font-medium flex justify-between">
        <!-- back -->
        <UButton
          color="black"
          label="Back"
          variant="link"
          icon="i-heroicons-arrow-left"
          to="."
        />
      </div>
      <div class="px-4 py-3 text-xl font-medium flex justify-between">
        <div class="">Profile update</div>
        <div class="flex gap-4">
          <UButton color="gray" label="Go to profile" to="." />

          <ModalConfirmButton
            variant="solid"
            label="Update"
            @confirm="updateUser"
          />
        </div>
      </div>
      <hr class="border-color" />
      <div class="p-4 space-y-5">
        <!-- country -->
        <UFormGroup label="Country">
          <UInput v-model="user.country" color="gray" />
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
          <UInput type="date" color="gray" v-model="user.dob" />
        </UFormGroup>

        <!-- phone number with regex -->
        <UFormGroup label="Phone number">
          <UInput v-model="user.phoneNumber" color="gray" />
        </UFormGroup>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// meta
useHead({
  title: "Profile",
});

const { getSession } = useAuth();
const session = await getSession();
const sub = session.user?.sub;
const toast = useToast();

const user = ref({});
onMounted(async () => {
  const response = await fetch("/api/profile");
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

const updateUser = async () => {
  const userUpdateReq = {
    country: user.value.country,
    gender: user.value.gender,
    dob: user.value.dob,
    phoneNumber: user.value.phoneNumber,
  };

  const updateRes = await fetch(`/api/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userUpdateReq),
  });

  const status = updateRes.status;
  const router = useRouter();
  if (status === 200) {
    toast.add({
      title: "User updated successfully",
    });
    await router.push("/settings/profile");
  } else {
    toast.add({
      title: "Failed to update user",
    });
  }
};
</script>

<style></style>

<script setup>
useHead({
  title: "Profile",
});
const { getSession } = useAuth();
const session = await getSession();
const sessionUser = session?.user;
const dbUser = ref({});
onMounted(async () => {
  const response = await fetch(`/api/profile`);
  const data = await response.json();
  const body = JSON.parse(data.body);
  dbUser.value = body;
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="grow flex">
      <div class="p-5">
        <img :src="sessionUser.image" class="rounded-full w-52 h-52" alt="" />
        <p class="text-2xl font-semibold py-5">{{ sessionUser.name }}</p>
        <UButton
          color="gray"
          label="Edit profile"
          to="/settings/profile/edit"
          block
        />
      </div>
      <div class="p-5 m-5 rounded-xl border border-color lg:grow">
        <p class="text-xl px-4 py-3">Profile</p>
        <hr class="border-color" />
        <div class="space-y-3 p-4 max-w-[50ch]">
          <div>
            <span>Email:</span>
            <span class="text-color pl-3">{{ dbUser.email }}</span>
          </div>
          <div>
            <span>Name:</span>
            <span class="text-color pl-3">{{ dbUser.name }}</span>
          </div>

          <!-- country -->
          <div class="">
            <span>Country:</span>
            <span class="text-color pl-3">{{ dbUser.country }}</span>
          </div>

          <!-- gender -->
          <div class="">
            <span>Gender:</span>
            <span class="text-color pl-3">{{
              dbUser.gender !== null
                ? dbUser.gender
                  ? "Male"
                  : "Female"
                : "---"
            }}</span>
          </div>

          <!-- birthday -->
          <div class="">
            <span>Birthday:</span>
            <span class="text-color pl-3">
              {{ formatDate(parseDateTime(dbUser?.dob)) || "---" }}
            </span>
          </div>

          <!-- phone -->
          <div class="">
            <span>Phone:</span>
            <span class="text-color pl-3">
              {{ dbUser.phoneNumber || "---" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

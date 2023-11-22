<template>
  <UButton
    icon="i-heroicons-arrow-left"
    variant="link"
    color="white"
    label="Back"
    @click="goBack"
  />
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  let currentRoute = router.currentRoute;
  router.go(-1);
  if (router.currentRoute == currentRoute) {
    router.push({ path: "/suggest" });
  }
};
</script>

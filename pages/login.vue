<script setup lang="ts">
const { signIn } = useAuth();
await signIn("google", { callbackUrl: "/search" });
</script>

<template></template>

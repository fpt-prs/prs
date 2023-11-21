<script setup lang="ts">
const { signIn } = useAuth();
await signIn("google", { callbackUrl: "/suggest" });
</script>

<template></template>

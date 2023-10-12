<script setup lang="ts">
const { signIn } = useAuth();
await signIn("google", { callbackUrl: "/settings/profile" });
</script>

<template></template>

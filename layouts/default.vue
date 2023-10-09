<script setup></script>

<template>
  <div class="flex h-screen bg-gray-900">
    <Sidebar />
    <div class="w-screen overflow-y-auto">
      <slot />
    </div>
  </div>
</template>

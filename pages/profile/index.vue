<script setup>
</script>

<template>
  <div class="flex h-full">
    <div class="p-5 border-r border-gray-700">
      <ul class="flex flex-col gap-3">
        <UButton icon="i-heroicons-user-circle" color="primary" variant="ghost" label="General" :trailing="false" to="/"
          size="lg" class="w-full" />
        <UButton icon="i-heroicons-lock-closed" color="primary" variant="ghost" label="Authentication" :trailing="false"
          to="/" size="lg" class="w-full" />
        <UButton icon="i-heroicons-user-circle" color="primary" variant="ghost" label="General" :trailing="false" to="/"
          size="lg" class="w-full" />
        <UButton icon="i-heroicons-user-circle" color="primary" variant="ghost" label="General" :trailing="false" to="/"
          size="lg" class="w-full" />
      </ul>
    </div>
    <div class="py-5 px-10">
      <div class="py-5">
        <h2 class="text-3xl font-semibold">Profile</h2>
        <p>Your information</p>
      </div>
      <div class="w-full p-2 border border-gray-700 bg-gray-800 rounded-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut debitis provident fugiat, officiis et ipsa ducimus.
        Reiciendis, repellat fuga? Dicta et magnam ut pariatur doloribus earum, ea illo cupiditate! Necessitatibus?
        <div class="flex items-center gap-4">
          <UAvatar size="xl" src="https://picsum.photos/500/500" />
          <div class="">
            <h1 class="font-semibold">John Doe</h1>
            <p class="text-xs text-gray-500">kadfsagb@proton.io</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

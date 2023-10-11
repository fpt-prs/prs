<script setup></script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full">
      <div class="p-5 border-r border-gray-800">
        <ul class="flex flex-col">
          <UButton
            icon="i-heroicons-user-circle"
            color="gray"
            variant="ghost"
            label="Favorites"
            exactActiveClass="bg-gray-700"
            :trailing="false"
            to="/collections"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            label="Collection A"
            :trailing="false"
            to="/collections"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            label="Collection B"
            :trailing="false"
            to="/collections"
            class="w-full"
          />
          <UButton
            icon="i-heroicons-inbox"
            color="gray"
            variant="ghost"
            label="Collection C"
            :trailing="false"
            to="/collections"
            class="w-full"
          />
        </ul>
      </div>
      <div class="grow">
        <p class="text-xl px-4 py-3">Favourites</p>
        <div class="space-y-3 p-4 max-w-[50ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores
          iure velit sint explicabo ratione pariatur enim corporis, eum incidunt
          adipisci cupiditate, obcaecati iste, quo eius modi suscipit?
          Consequuntur, minus?
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

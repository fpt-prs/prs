<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen"]);

function updateOpen(value) {
  emit("update:isOpen", value);
}

const items = [
  {
    key: "authentication",
    label: "Authentication",
    icon: "i-heroicons-lock-closed",
  },
  {
    key: "preferences",
    label: "Preferences",
    icon: "i-heroicons-cog-6-tooth",
  },
  {
    key: "billing",
    label: "Billing",
    icon: "i-heroicons-credit-card",
  },
];
</script>

<template>
  <UModal
    :modelValue="props.isOpen"
    @close="updateOpen(false)"
    :transition="false"
    :ui="{
      width: 'md:max-w-none md:w-[80vw]',
    }"
  >
    <UTabs
      :items="items"
      orientation="vertical"
      :ui="{
        list: {
          background: 'dark:bg-gray-900',
          width: 'w-80',
        },
        wrapper: 'space-y-0 flex gap-4',
      }"
    >
      <template #default="{ item, index, selected }">
        <UButton
          :icon="item.icon"
          color="gray"
          variant="ghost"
          :label="item.label"
          :trailing="false"
          :class="`w-full py-1 ${
            selected ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`"
        />
      </template>
      <template #item="{ item }">
        <div class="border-l border-gray-800">
          <p class="text-xl px-4 py-3">{{ item.label }}</p>
          <div v-if="item.key === 'authentication'" class="w-full">
            <p class="border-y border-gray-800 px-4 py-3">Change password</p>
            <form action="">
              <div class="space-y-3 p-4">
                <UFormGroup label="Current password" name="current_password">
                  <UInput type="password" color="gray" />
                </UFormGroup>
                <UFormGroup label="New password" name="new_password">
                  <UInput type="password" color="gray" />
                </UFormGroup>
                <UFormGroup
                  label="Confirm new password"
                  name="confirm_new_password"
                >
                  <UInput color="gray" type="password" />
                </UFormGroup>
                <UButton
                  label="Change password"
                  color="primary"
                  variant="solid"
                  size="sm"
                  :trailing="false"
                />
              </div>
            </form>
          </div>
          <div v-else-if="item.key === 'password'" class="space-y-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            sapiente quae magni fuga distinctio, adipisci atque eaque error!
            Mollitia deserunt architecto ratione tenetur, tempore modi
            perspiciatis neque tempora qui. Nesciunt?
          </div>
        </div>
      </template>
    </UTabs>
  </UModal>
</template>

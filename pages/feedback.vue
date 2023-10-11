<script setup>
useHead({
  title: "Help & Feedback",
});
const feedbackTypes = [
  {
    label: "Bug",
    name: "bug",
    value: "bug",
  },
  {
    label: "Feature Request",
    name: "feature",
    value: "feature",
  },
  {
    label: "General Feedback",
    name: "general",
    value: "general",
  },
];

const items = [
  {
    label: "Getting Started",
    icon: "i-heroicons-information-circle",
    defaultOpen: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Installation",
    icon: "i-heroicons-arrow-down-tray",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
];

const selectedType = ref("bug");
</script>

<template>
  <NuxtLayout name="default">
    <div class="">
      <div
        class="flex items-center gap-5 p-5 border-b border-gray-800 bg-gray-900 z-10 sticky top-0"
      >
        <h1 class="text-xl">FAQ</h1>
      </div>
      <div class="p-5 border-b border-gray-800">
        <div class="max-w-[60ch] mx-auto">
          <UAccordion :items="items" size="xl" />
        </div>
      </div>
    </div>
    <div class="">
      <div class="flex items-center gap-5 p-5 border-b border-gray-800 bg-gray-900 z-10 sticky top-0">
        <h1 class="text-xl">Feedback</h1>
      </div>
      <div class="p-5 max-w-[60ch] mx-auto">
        <UForm>
          <UFormGroup label="What type of feedback do you have?">
            <URadio
              v-for="feedbackType of feedbackTypes"
              :key="feedbackType.name"
              v-model="selectedType"
              v-bind="feedbackType"
            />
          </UFormGroup>
          <br />
          <UFormGroup label="Your feedback (max 1000 characters)">
            <UTextarea
              color="gray"
              v-model="value"
              placeholder="Enter your feedback here..."
              rows="5"
              autoresize
              maxlength="1000"
            />
          </UFormGroup>
          <br />
          <UButton color="primary" variant="solid" label="Submit" size="sm" />
        </UForm>
      </div>
    </div>
  </NuxtLayout>
</template>

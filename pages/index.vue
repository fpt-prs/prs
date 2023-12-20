<script setup>
definePageMeta({ auth: false });
useHead({
  title: "Supercharge your business",
});
const { status, signIn } = useAuth();
const loginWithGoogle = async () => {
  await signIn("google", { callbackUrl: "/settings/profile" });
};
</script>

<template>
  <img
    src="/hero.png"
    alt="hero"
    class="absolute object-cover -top-20 w-screen h-[100vmax] -z-[10]"
  />
  <header
    class="flex lg:w-[80vw] mx-auto h-20 justify-between items-center px-5"
  >
    <a href="">
      <img src="/logo.svg" class="h-8 w-8" alt="" />
    </a>
    <div class=""></div>
    <div class="flex items-center gap-4">
      <a
        href="/about"
        class="text-color hover:text-black dark:hover:text-white"
      >
        About us
      </a>
      <UButton
        color="black"
        label="Login"
        to="/login"
        :trailing="false"
        v-if="status !== 'authenticated'"
      />
      <UButton
        color="black"
        label="Open app"
        to="/suggest"
        :trailing="false"
        v-else
      />
    </div>
  </header>
  <div class="flex flex-col items-center justify-center max-w-[1000px] mx-auto">
    <div class="flex flex-col justify-center items-center h-[calc(100vh-8rem)]">
      <h1 class="max-w-[500px] text-4xl lg:text-7xl text-center font-bold pb-6">
        Supercharge your business
      </h1>
      <p
        class="text-gray-700 dark:text-gray-400 px-4 lg:text-center text-sm lg:text-md"
      >
        Your personal Product Scout is always on watch, leaving no stone
        unturned to uncover the next big thing. <br />
        Get real-time insights delivered daily so lucrative opportunities never
        pass you by.
      </p>
      <UButton
        color="gray"
        label="Login with Google"
        to="/login"
        size="lg"
        :ui="{ rounded: 'rounded-full' }"
        :trailing="false"
        v-if="status !== 'authenticated'"
        class="mt-3"
      />
      <UButton
        color="gray"
        label="Open app"
        to="/suggest"
        size="lg"
        :ui="{ rounded: 'rounded-full' }"
        :trailing="false"
        v-else
        class="mt-3"
      />
    </div>
  </div>
  <div class="m-10 mx-auto px-5 max-w-[1200px]">
    <img
      src="/screenshot.png"
      alt="hero"
      class="object-cover border border-color rounded-xl w-full"
    />
  </div>
  <div
    class="lg:flex items-center justify-between max-w-[1200px] mx-auto gap-5 px-5 py-10"
  >
    <div class="">
      <p class="text-4xl lg:text-5xl font-semibold">
        Unlock E-commerce Success with Winning Products
      </p>
      <p class="py-4 text-lg">
        At PRS, we specialize in identifying the trending products based on our
        extensive information acquisition system and advanced algorithms.
      </p>
    </div>
    <div class="">
      <img src="/hero.png" class="w-96 h-96" alt="" />
    </div>
  </div>
  <a
    href="https://m.me/fptprs"
    target="_blank"
    class="fixed bottom-6 right-6 bg-gray-100 dark:bg-gray-700 rounded-full lg:h-16 lg:w-16 h-10 w-10 flex justify-center items-center"
  >
    <UIcon
      name="i-heroicons-chat-bubble-left-right-solid"
      color="blue"
      class="lg:h-8 lg:w-8"
    />
  </a>
</template>

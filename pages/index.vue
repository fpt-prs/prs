<script setup>
definePageMeta({ auth: false });
useHead({
  title: "Supercharge your business",
});
const { signIn } = useAuth();
const loginWithGoogle = async () => {
  await signIn("google", { callbackUrl: "/settings/profile" });
};
</script>

<template>
  <img
    src="/hero.png"
    alt="hero"
    class="absolute object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)] -z-[10]"
  />
  <header
    class="flex lg:w-[80vw] mx-auto h-20 justify-between items-center px-5"
  >
    <a href="/">
      <img src="/logo.svg" class="h-8 w-8" alt="" />
    </a>
    <div class=""></div>
    <div class="">
      <UButton color="black" label="Login" to="/login" :trailing="false" />
    </div>
  </header>
  <div class="flex flex-col items-center justify-center max-w-[1000px] mx-auto">
    <div class="flex flex-col justify-center items-center h-[calc(100vh-8rem)]">
      <h1 class="max-w-[500px] text-7xl text-center font-bold pb-6">
        Supercharge your business
      </h1>
      <p class="text-gray-700 dark:text-gray-400 text-center">
        Your personal Product Scout is always on watch, leaving no stone
        unturned to uncover the next big thing. <br />
        Get real-time insights delivered daily so lucrative opportunities never
        pass you by.
      </p>
      <a
        href="/login"
        class="bg-gray-200 dark:bg-gray-800 border border-color px-4 py-3 mt-5 rounded-3xl font-semibold text-sm flex items-center gap-2"
      >
        <img src="/google.svg" class="w-5 h-5" alt="" />
        Continue with Google
      </a>
    </div>
  </div>
</template>

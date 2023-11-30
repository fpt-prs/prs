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
    class="absolute object-cover -top-20 w-screen h-[120vh] -z-[10]"
  />
  <header
    class="flex lg:w-[80vw] mx-auto h-20 justify-between items-center px-5"
  >
    <a href="/">
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
  <div class="flex flex-col items-center justify-start mx-auto h-screen overflow-hidden w-full">
    <p class="text-6xl py-6 font-semibold text-center">
      About us
    </p>
    <div class="flex items-start mt-[5vw] justify-center gap-5">
      <div class="flex flex-col items-center">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
    </div>
  </div>
</template>

<style>
.img {
  width: 15vmax;
  transition: width 0.2s ease-in-out;
}

.img:hover {
  width: 25vmax;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);
}
</style>

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
  <div
    class="flex flex-col items-center justify-start mx-auto min-h-screen overflow-hidden w-full"
  >
    <p class="text-6xl py-6 font-semibold text-center">About us</p>
    <div class="lg:flex items-start mt-[5vw] justify-center -space-x-1">
      <div class="flex flex-col items-center p-2 card">
        <img src="/hoangnh.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Huy Hoàng</p>
        <p class="text-color">Tech lead</p>
      </div>
      <div class="flex flex-col items-center p-2 card">
        <img src="/phuongnh.png" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Hồng Phương</p>
        <p class="text-color">Developer</p>
      </div>
      <div class="flex flex-col items-center p-2 card">
        <img src="/namhv.png" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Hoàng Văn Nam</p>
        <p class="text-color">Data Engineer</p>
      </div>
      <div class="flex flex-col items-center p-2 card">
        <img src="/vuntd.jpg" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Nguyễn Trần Duy Vũ</p>
        <p class="text-color">DevOps</p>
      </div>
      <div class="flex flex-col items-center p-2 card">
        <img src="/minhdn.png" alt="" class="img shrink rounded-lg" />
        <p class="text-lg font-semibold py-2">Đỗ Nhật Minh</p>
        <p class="text-color">Tester</p>
      </div>
    </div>
  </div>
</template>

<style>
.card img {
  width: 15vmax;
  transition: width 0.2s linear;
}

.card:hover img {
  width: 25vmax;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 768px) {
  .card img {
    width: 70vw;
  }
  .card:hover img {
    width: 80vw;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);
  }
}
</style>

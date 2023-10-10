<script setup></script>

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
  <div class="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
    <h1 class="text-7xl font-semibold">Supercharge your business</h1>
  </div>
</template>

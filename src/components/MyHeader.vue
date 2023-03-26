<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <header class="bg-sage w-screen">
    <router-link :to="{name: 'choose-pu'}" class="flex flex-row items-center justify-center h-12">
      <h1 class="text-center uppercase text-3xl text-black font-semibold font-nunito">Election Collation</h1>
    </router-link>
  </header>
</template>
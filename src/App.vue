<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue'


</script>

<template>
  <div class="mt-0 flex flex-col w-full justify-start">
    <my-header></my-header>
    <div class="sm:max-w-3xl max-w-[360px] mx-auto">
      <RouterView />
    </div>
  </div>
</template>
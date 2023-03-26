<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue'
import useSocketIo from './utils/socket.io';
import { useResultStore } from './stores/result';


const socket = useSocketIo();

const resultStore = useResultStore();
socket.on('voteCountsUpdated', (data: any) => {
  console.log({ data });
  resultStore.setVoteTallies(data);
})
</script>

<template>
  <div class="mt-0 flex flex-col w-full justify-start">
    <my-header></my-header>
    <div class="sm:min-w-[720px] w-[360px] mx-auto">
      <router-view v-slot="{ Component }">
        <transition name="drop-in" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.drop-in-enter-from,
.drop-in-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.5s ease;
}
.drop-in-enter-to,
.drop-in-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
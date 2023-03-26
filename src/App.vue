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
      <RouterView />
    </div>
  </div>
</template>
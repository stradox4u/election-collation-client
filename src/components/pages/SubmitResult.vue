<script setup lang="ts">
import { usePollingUnitStore } from '@/stores/pollingUnit';
import { storeToRefs } from 'pinia';

const usePuStore = usePollingUnitStore();
const { pollingUnit } = storeToRefs(usePuStore);
</script>


<template>
  <div>
    Enter result here
    <br />
    {{ pollingUnit }}
  </div>
</template>
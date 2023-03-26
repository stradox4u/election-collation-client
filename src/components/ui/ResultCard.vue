<script setup lang="ts">
import type { PartyTally } from '@/stores/result.types';

type Props = {
  partyResult: PartyTally;
  isLeading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLeading: false,
});
</script>


<template>
  <div class="w-full bg-timberwolf shadow-md p-2" :class="{'animate-pulse': isLeading}">
    <h3 class="font-poppins text-lg font-semibold">{{ partyResult.name }}</h3>
    <span class="font-nunito text-2xl font-semibold"
      :class="{'text-rose-800': isLeading}">
      {{ partyResult.totalVotes }}
    </span>
  </div>
</template>
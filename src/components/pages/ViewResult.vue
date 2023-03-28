<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import axios from '../../utils/axios';
import { useResultStore } from '@/stores/result';
import ResultCard from '../ui/ResultCard.vue';

const resultStore = useResultStore();
const { voteTallies } = storeToRefs(resultStore);

const totalVotesCast = computed(() => {
  if (voteTallies.value.length === 0) return 0;
  const tallies = voteTallies.value.map((party) => {
    return party.totalVotes;
  })
  return tallies.reduce((prevVal, currVal) => {
    return prevVal + currVal;
  })
})

const highestTally = computed(() => {
  if (voteTallies.value.length === 0) return { name: '', id: null, totalVotes: 0 };
  const tallies = voteTallies.value.map((party) => {
    return party;
  })
  return tallies.reduce((prev, curr) => {
    return curr.totalVotes > prev.totalVotes ? curr : prev;
  })
})

const fetchResults = async () => {
  const route = useRoute();
  const { elId } = route.params;
  const { data } = await axios.get('/election/results', {
    params: { elId },
  });
  resultStore.setVoteTallies(data);
  return data;
}

useQuery({
  queryKey: ['results'],
  queryFn: fetchResults,
  staleTime: 1_000 * 60 * 30
});
</script>


<template>
  <div class="mt-0 mb-4 w-full p-6 rounded-b-md shadow-md bg-slate-200">
    <h3 class="capitalize font-montserrat font-semibold text-lg">Results</h3>
    <div class="grid sm:grid-cols-3 gap-3 my-3">
      <div v-for="result in voteTallies" :key="result.id" class="self-stretch">
        <result-card :party-result="result" :is-leading="highestTally.id === result.id"></result-card>
      </div>
    </div>
    <div class="my-3 w-full">
      <div class="inline-flex gap-4">
        <span class="font-nunito text-2xl font-semibold">Total Votes Cast:</span>
        <span class="font-poppins text-4xl font-bold">{{ totalVotesCast }}</span>
      </div>
    </div>
  </div>
</template>
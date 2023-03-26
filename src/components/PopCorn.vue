<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import axios from '../utils/axios';
import type { IElection } from './pages/election.types';
import MyBaseSelect from './ui/MyBaseSelect.vue';

const fetchElections = async () => {
  const { data } = await axios.get('/election');
  return data;
}
const { data: elections } = useQuery({
  queryKey: ['elections'],
  queryFn: fetchElections,
  staleTime: 1000 * 60 * 30,
});

const electionOptions = computed(() => {
  if (!elections.value) return [];
  return elections.value.map((election: IElection) => {
    const electDate = new Date(election.electionDate).toLocaleDateString('en-uk');
    return { optionValue: election.id, optionText: election.electionType + ' (' + electDate + ')' };
  })
});

const selectedElection = ref('');
const router = useRouter();
const viewResults = () => {
  router.push({ name: 'results', params: { elId: selectedElection.value } });
}
</script>


<template>
  <div class="w-full my-6 p-4 border-2 border-brunswick">
    <div class="w-full my-3">
      <img src="/popcorn-icon.png" alt="popcorn" class="aspect-square w-9 mx-auto">
    </div>
    <h3 class="capitalize font-montserrat font-semibold">View Election Results</h3>
    <my-base-select @change="viewResults" v-model="selectedElection" select-name="choose-election" select-id="election-selector" 
      :default-option="{optionValue: '', optionText: 'Choose Election!'}" :options-list="electionOptions">
    </my-base-select>
  </div>
</template>
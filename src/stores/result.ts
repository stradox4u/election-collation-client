import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { PartyTally } from './result.types'

export const useResultStore = defineStore('electionResult', () => {
  const voteTallies: Ref<PartyTally[]|[]> = ref([]);

  const setVoteTallies = (value: PartyTally[]) => {
    voteTallies.value = value;
  }

  return {voteTallies, setVoteTallies}
})
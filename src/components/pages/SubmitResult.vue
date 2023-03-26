<script setup lang="ts">
import { computed, type ComputedRef, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePollingUnitStore } from '@/stores/pollingUnit';
import { storeToRefs } from 'pinia';
import { useQuery, useMutation } from '@tanstack/vue-query';
import axios from '../../utils/axios';
import MyBaseSelect from '../ui/MyBaseSelect.vue';
import MyBaseInput from '../ui/MyBaseInput.vue';
import MyBaseButton from '../ui/MyBaseButton.vue';
import type { IElection, PoliticalPartyObject, MinimalPoliticalParty } from './election.types';
import type { IPollingUnit } from '@/stores/pollingUnit.types';

const usePuStore = usePollingUnitStore();
const { pollingUnit } = storeToRefs(usePuStore);

// Fetch elections and their parties at mount
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
})

const selectedElection = ref('');

const parties: ComputedRef<MinimalPoliticalParty[]> = computed(() => {
  if (!elections.value) return [];
  const election = elections.value.find((election: IElection) => {
    return election.id === selectedElection.value;
  })
  if (!election) return [];
  return election.politicalParties.map((party: PoliticalPartyObject) => {
    return party.politicalParty;
  });
});

// Handle submission of votes form
const partiesVotes: { [key: number]: number } = reactive({});
const resultImage = ref(null);

const { isLoading, isError, error, isSuccess, mutate, data } = useMutation({
  mutationFn: (formData: FormData) => axios.post('/results', formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  })
});

const submitResult = () => {
  const formData = new FormData();
  formData.append('electionId', selectedElection.value);
  formData.append('pollingunitId', (pollingUnit as ComputedRef<IPollingUnit>).value.id);
  if (resultImage.value) {
    const imgs = (resultImage.value as HTMLInputElement).files;
    formData.append('resultImage', imgs ? imgs[0] : '');
  }

  Object.keys(partiesVotes).forEach((party) => {
    const obj = JSON.stringify({ partyId: +party, votes: partiesVotes[+party] });
    formData.append('partyResults', obj);
  });

  mutate(formData);
}

// On success, navigate to results view
const router = useRouter();
watch(isSuccess, (newVal) => {
  if (newVal) {
    router.push({ name: 'results', params: { elId: selectedElection.value } });
  }
})
</script>


<template>
  <div class="mt-0 w-full p-6 rounded-b-md shadow-md bg-slate-200">
    <h3 class="capitalize font-montserrat font-semibold">Select Election</h3>
    <form @submit.prevent="submitResult">
      <div class="mt-3">
        <my-base-select v-model="selectedElection" select-name="select-pollingUnit" select-id="pu-selector" 
          :defaultOption="{optionValue: '', optionText: 'Select Election!'}"
          :options-list="electionOptions">
        </my-base-select>
      </div>
      <div v-if="parties.length > 0" class="grid sm:grid-cols-3 gap-3 my-4">
        <div v-for="party in parties" :key="party.id" class="flex flex-col items-start bg-sage p-2
          shadow-md hover:scale-[102%]">
          <label :for="party.name" class="font-montserrat font-semibold text-lg">{{ party.name }}</label>
          <my-base-input :id="party.name" input-type="number" v-model.number="partiesVotes[party.id]"></my-base-input>
        </div>

      </div>
      <div v-if="parties.length > 0" class="my-3">
        <div class="flex flex-col items-start bg-sage p-2 shadow-md w-full hover:scale-[102%]">
          <label for="resultImage" class="uppercase font-montserrat font-semibold text-lg">Result Image</label>
          <input type="file" required ref="resultImage" id="resultImage" class="form-input bg-timberwolf focus:ring-2 focus:ring-ferngreen focus:outline-none 
          focus:border-ferngreen shadow-inner font-poppins w-full" />
        </div>
        <div class="my-6">
          <my-base-button button-type="submit" :is-loading="isLoading">Submit</my-base-button>
        </div>
      </div>
    </form>
  </div>
</template>
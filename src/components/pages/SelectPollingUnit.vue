<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import MyBaseSelect, { type optionType } from '../ui/MyBaseSelect.vue';
import PopCorn from '../PopCorn.vue';
import axios from '../../utils/axios';
import type { IState, ILga, IWard } from './states.types';
import type { IPollingUnit } from '@/stores/pollingUnit.types';
import { usePollingUnitStore } from '@/stores/pollingUnit';
import { useRouter } from 'vue-router';


const fetchingUrl = '/pollingunits';
const queryClient = useQueryClient();

// States
const fetchStates = async (): Promise<IState[]> => {
  const { data } = await axios.get(fetchingUrl);
  console.log(data);
  return data;
}

const { data: states } = useQuery({
  queryKey: ['states'],
  queryFn: fetchStates,
  staleTime: 1000 * 60 * 30,
});
const stateOptions: ComputedRef<optionType[]> = computed(() => {
  if (!states.value) return [];
  return states.value.map((state: IState) => {
    return { optionValue: `${state.state_id}`, optionText: state.name };
  });
});
const selectedState = ref('')
const enableLgaSelect = computed(() => {
  return !!selectedState.value
})

// Lgas
const fetchLgas = async () => {
  const { data } = await axios.get(fetchingUrl, {
    params: {
      key: selectedState.value
    }
  });
  return data.lgas;
}
const { data: lgas } = useQuery({
  queryKey: ['lgas'],
  queryFn: fetchLgas,
  enabled: enableLgaSelect,
});
const lgaOptions: ComputedRef<optionType[]> = computed(() => {
  if (!lgas.value) return [];
  return lgas.value.map((lga: ILga) => {
    return { optionValue: lga.lga_id, optionText: lga.name }
  });
})
const selectedLga = ref('')
const enableWardSelect = computed(() => {
  return !!selectedLga.value
})

// Wards
const fetchWards = async () => {
  const { data } = await axios.get(fetchingUrl, {
    params: {
      key: selectedState.value + '-' + selectedLga.value
    }
  });
  return data.wards;
}
const { data: wards } = useQuery({
  queryKey: ['wards'],
  queryFn: fetchWards,
  enabled: enableWardSelect,
});
const wardOptions: ComputedRef<optionType[]> = computed(() => {
  if (!wards.value) return [];
  return wards.value.map((ward: IWard) => {
    return { optionValue: ward.ward_id, optionText: ward.name }
  });
})
const selectedWard = ref('')
const enablePUSelect = computed(() => {
  return !!selectedWard.value
})

// Polling Units
const fetchPollingUnits = async () => {
  const { data } = await axios.get(fetchingUrl, {
    params: {
      key: selectedState.value + '-' + selectedLga.value + '-' + selectedWard.value
    }
  });
  return data;
}
const { data: pollingUnits } = useQuery({
  queryKey: ['pollingUnits'],
  queryFn: fetchPollingUnits,
  enabled: enablePUSelect,
});
const puOptions: ComputedRef<optionType[]> = computed(() => {
  if (!pollingUnits.value) return [];
  return pollingUnits.value.map((pu: IPollingUnit) => {
    return { optionValue: pu.id, optionText: pu.puName }
  });
});
const selectedPollingUnit = ref('')

const puStore = usePollingUnitStore();
const router = useRouter();
const onSelectPollingUnit = () => {
  // Put selected polling unit into store
  const relevantPu = pollingUnits.value.find((value: IPollingUnit) => {
    return value.id === selectedPollingUnit.value;
  });
  if (relevantPu) {
    puStore.setPollingUnit(relevantPu);
  }

  // Navigate to the result submission page
  router.push({ name: 'submit-result', params: { puId: selectedPollingUnit.value } });
}

// Invalidate queries on change of prior value
const refetchLgas = () => {
  if (selectedState.value) {
    queryClient.invalidateQueries({
      queryKey: ['lgas'],
    });
  }
}
const refetchWards = () => {
  if (selectedLga.value) {
    queryClient.invalidateQueries({
      queryKey: ['wards'],
    });
  }
}
const refetchPollingUnits = () => {
  if (selectedWard.value) {
    queryClient.invalidateQueries({
      queryKey: ['pollingUnits'],
    });
  }
}
</script>


<template>
  <div class="mt-0 w-full p-6 rounded-b-md shadow-md bg-slate-200">
    <h3 class="capitalize font-montserrat font-semibold">Select your polling Unit</h3>
    <div class="mt-4 flex sm:flex-row flex-col sm:justify-between items-stretch gap-3">
      <div>
        <my-base-select v-model="selectedState" @change="refetchLgas" select-name="select-state" select-id="state-selector" 
          :defaultOption="{optionValue: '', optionText: 'Select your state!'}"
          :options-list="stateOptions">
        </my-base-select>
      </div>
      <div>
        <my-base-select v-model="selectedLga" @change="refetchWards" select-name="select-lga" select-id="lga-selector" 
          :defaultOption="{optionValue: '', optionText: 'Select your LGA!'}"
          :options-list="lgaOptions" :is-disabled="!enableLgaSelect">
        </my-base-select>
      </div>
      <div>
        <my-base-select v-model="selectedWard" @change="refetchPollingUnits" select-name="select-ward" select-id="ward-selector" 
          :defaultOption="{optionValue: '', optionText: 'Select your ward!'}"
          :options-list="wardOptions" :is-disabled="!enableWardSelect">
        </my-base-select>
      </div>
    </div>
    <div class="mt-3">
      <my-base-select v-model="selectedPollingUnit" @change="onSelectPollingUnit" select-name="select-pollingUnit" select-id="pu-selector" 
        :defaultOption="{optionValue: '', optionText: 'Select your PU!'}"
        :options-list="puOptions" :is-disabled="!enablePUSelect">
      </my-base-select>
    </div>
    <div class="mt-3">
      <pop-corn></pop-corn>
    </div>
  </div>
</template>
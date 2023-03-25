import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPollingUnit } from './pollingUnit.types'

export const usePollingUnitStore = defineStore('pollingUnit', () => {
  const pollingUnit: Ref<IPollingUnit|{}> = ref({})
  const setPollingUnit = (value: IPollingUnit) => {
    pollingUnit.value = value;
  }

  return { pollingUnit, setPollingUnit }
})

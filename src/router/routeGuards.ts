import { usePollingUnitStore } from "@/stores/pollingUnit";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const puSelected = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const puStore = usePollingUnitStore();
  const { pollingUnit } = storeToRefs(puStore);

  if (Object.keys(pollingUnit.value).length > 0) {
    return next(true);
  }
  return next({ name: 'choose-pu' });
}
<script setup lang="ts">
export type optionType = {
  optionValue: string;
  optionText: string;
}

type Props = {
  modelValue?: string;
  selectName: string;
  selectId: string;
  defaultOption: optionType;
  optionsList: optionType[];
  isDisabled?: boolean;
}

const props = defineProps<Props>();
</script>


<template>
  <select :value="modelValue" :disabled="isDisabled"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="form-select bg-timberwolf focus:ring-2 focus:ring-ferngreen focus:outline-none 
    focus:border-ferngreen shadow-inner font-poppins w-full">
    <option :value="defaultOption.optionValue">{{ defaultOption.optionText }}</option>
    <option v-for="option in optionsList" :key="option.optionValue" :value="option.optionValue">
      {{ option.optionText }}
    </option>
  </select>
</template>
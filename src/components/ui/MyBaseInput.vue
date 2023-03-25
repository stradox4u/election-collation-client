<script setup lang="ts">
type Props = {
  modelValue?: string|number;
  inputType: string;
  placeholderText?: string;
  isRequired?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  inputType: () => {
    return 'text';
  },
  isRequired: true
});
</script>


<template>
  <input :placeholder="placeholderText" :type="inputType" :value="modelValue" :required="isRequired"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
    class="form-input bg-timberwolf focus:ring-2 focus:ring-ferngreen focus:outline-none 
    focus:border-ferngreen shadow-inner font-poppins w-full"/>
</template>
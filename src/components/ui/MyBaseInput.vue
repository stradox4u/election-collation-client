<script setup lang="ts">
type Props = {
  modelValue?: string;
  inputType: string;
  placeholderText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  inputType: () => {
    return 'text';
  },
});
</script>


<template>
  <input :placeholder="placeholderText" :type="inputType" :value="modelValue" 
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
    class=""/>
</template>
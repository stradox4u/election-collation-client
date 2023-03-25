<script setup lang="ts">
type Props = {
  buttonType: 'button' | 'submit' | 'reset';
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>


<template>
  <button :type="buttonType" :disabled="isLoading" class="w-full bg-brunswick p-2 text-white shadow-sm
    hover:bg-opacity-80 hover:scale-105">
    <slot></slot>
  </button>
</template>
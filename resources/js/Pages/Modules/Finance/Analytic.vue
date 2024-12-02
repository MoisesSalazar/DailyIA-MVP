<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils';
import { store } from '@/Store/store';

const message = ref('');



onMounted(() => {
//   testApiConnection();
});
</script>

<template>
  <div>
    <h1>Analityc</h1>
    <p>{{ store.year }}</p>
  </div>
</template>

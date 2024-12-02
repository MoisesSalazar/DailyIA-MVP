<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils';
import { store } from '@/Store/store';
import InputFloating from '@/Components/InputFloating.vue';
import Button from '@/Components/Button.vue';
import ButtonFloating from '@/Components/ButtonFloating.vue';

const message = ref('');

const months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
];

const testApiConnection = async () => {
    try {
        const response = await makeRequest('GET', route('api.user'));
        message.value = response.message;
    } catch (error) {
        console.error('Error connecting to API:', error);
    }
};

onMounted(() => {
    testApiConnection();
});
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <div class="grow grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            <InputFloating v-model="store.year" type="number" label="Año" class="w-full" />
            <InputFloating v-model="store.month" type="select" label="Mes" :options="months" class="w-full" />
            <InputFloating v-model="store.essential_needs_percentage" type="number" label="50% Necesidades Esenciales"
                class="w-full" />
            <InputFloating v-model="store.savings_percentage" type="number" label="20% Ahorros" class="w-full" />
            <InputFloating v-model="store.discretionary_spending_percentage" type="number"
                label="30% Gastos Discrecionales" class="w-full" />
        </div>
        <div class="flex items-end">
            <Button @click="testApiConnection">Filtrar</Button>
        </div>
    </div>
</template>

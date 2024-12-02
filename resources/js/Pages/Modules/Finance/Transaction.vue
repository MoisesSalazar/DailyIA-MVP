<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils';
import { store } from '@/Store/store';
import { useTransactions } from '@/Composables/useTransactions';
import InputFloating from '@/Components/InputFloating.vue';
import Button from '@/Components/Button.vue';
import ModalCreate from '@/Components/ModalCreate.vue';
import ModalDelete from '@/Components/ModalDelete.vue';
import ModalEdit from '@/Components/ModalEdit.vue';
import Table from '@/Components/Table.vue';
import ButtonFloating from '@/Components/ButtonFloating.vue';
import { SquaresPlusIcon } from '@heroicons/vue/24/solid';

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
    } catch (error) {
        console.error('Error connecting to API:', error);
    }
};

onMounted(() => {
    testApiConnection();
});

const {
    message,
    showModalCreate,
    showModalEdit,
    showModalDelete,
    createdTransaction,
    editedTransaction,
    tableTransactions,
    handleAction,
    handleActionCreate,
    deleteTransaction,
    addTransaction,
    updateTransaction
} = useTransactions();
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

    <div class="grid grid-cols-1 gap-4 mt-5">
        <div class="grid grid-cols-1 gap-5">
            <Table :isLoading="tableTransactions.isLoading" :data="tableTransactions.data"
                :columns="tableTransactions.columns.filter(column => column.visible)"
                :actions="tableTransactions.actions" @action="handleAction" :showCreateButton="false" />
        </div>
    </div>


    <ButtonFloating @open="showModalCreate = true" position="bottom-right"
        class="h-10 w-10 bg-purple-600 hover:bg-purple-800 text-white font-bold  shadow-lg flex items-center justify-center rounded-lg">
        <SquaresPlusIcon class="h-12 w-12 text-white" />
    </ButtonFloating>

    <!-- Para Transacciones -->
    <ModalCreate :show="showModalCreate" @close="showModalCreate = false" :created="createdTransaction"
        :table="tableTransactions.data" @created="addTransaction" />
    <ModalEdit :show="showModalEdit" @close="showModalEdit = false" :edited="editedTransaction"
        :table="tableTransactions.data" @update="updateTransaction" />
    <ModalDelete :show="showModalDelete" @close="showModalDelete = false"
        :route="route('api.transactions.destroy', { id: editedTransaction.formData.id })"
        :name="editedTransaction.formData.name" @delete="deleteTransaction" :selected="editedTransaction.formData" />
</template>
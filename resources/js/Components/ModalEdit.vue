<template>
    <Modal :show="show" @close="closeModal" :title="edited.title ? edited.title : 'Crear'" size="lg">
        <template #body>
            <div class="grid grid-cols-1 gap-4">
                <template v-for="field in edited.fields" :key="field.name">
                    <InputFloating v-model="edited.formData[field.field]" :label="field.label" v-if="field.visible"
                        :type="field.type ? field.type : 'text'" :options="field.options" />
                </template>
            </div>
        </template>
        <template #footer>
            <Button @click="updateIncome" type="primary" :isLoading="edited.isLoading">Actualizar</Button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from '@/Components/Modal.vue';
import Button from '@/Components/Button.vue';
import InputFloating from '@/Components/InputFloating.vue';
import { makeRequest } from '@/utils';
import { toast } from 'vue3-toastify';

const props = defineProps({
    show: Boolean,
    edited: Object,
    table: {
        type: Array,
        default: null
    }
});

const emit = defineEmits(['close', 'update']);

const closeModal = () => {
    emit('close');
};

const updateIncome = async () => {
    props.edited.isLoading = true;
    try {
        const requestData = {};
        props.edited.fields.forEach(field => {
            requestData[field.field] = props.edited.formData[field.field];
        });
        props.edited.data.forEach(dataItem => {
            requestData[dataItem.name] = dataItem.value;
        });

        const response = await makeRequest('PUT', props.edited.route, requestData);
        const message = response.message;
        emit('update', response.data);
        closeModal();
        props.edited.isLoading = false;
        toast.success(message);
    } catch (error) {
        props.edited.isLoading = false;
        console.error('Error actualizando ingreso:', error);
        toast.error('Error actualizando ingreso');
    }
};
</script>

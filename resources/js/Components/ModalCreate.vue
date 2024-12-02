<template>
    <Modal :show="show" @close="closeModal" :title="created.title ? created.title : 'Crear'" size="lg">
        <template #body>
            <div class="grid grid-cols-1 gap-4">
                <template v-for="field in created.fields" :key="field.name">
                    <InputFloating v-model="created.formData[field.field]" :label="field.label"
                        :type="field.type ? field.type : 'text'" :options="field.options"
                        v-if="field.visible !== undefined ? field.visible : true" />
                </template>
            </div>
        </template>
        <template #footer>
            <Button @click="createIncome" type="primary" :isLoading="created.isLoading">Crear</Button>
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
    created: Object,
    table: {
        type: Array,
        default: null
    }
});

const emit = defineEmits(['close', 'created']);

const closeModal = () => {
    emit('close');
};

const resetFormData = () => {
    Object.keys(props.created.formData).forEach(key => {
        props.created.formData[key] = '';
    });
    props.created.formData.wallet_id = props.created.data.find(dataItem => dataItem.name === 'wallet_id').value;
};

const validateFields = () => {
    for (const field of props.created.fields) {
        if (field.rules.includes('required') && !props.created.formData[field.field] && field.visible == true) {
            toast.error(`El campo ${field.label} es obligatorio.`);
            return false;
        }
    }
    return true;
};

const createIncome = async () => {

    if (!validateFields()) {
        return;
    }

    props.created.isLoading = true;
    try {
        const requestData = {};
        props.created.fields.forEach(field => {
            requestData[field.field] = props.created.formData[field.field];
        });
        props.created.data.forEach(dataItem => {
            requestData[dataItem.name] = dataItem.value;
        });

        const response = await makeRequest('POST', props.created.route, requestData);

        resetFormData();
        closeModal();
        emit('created', response.data); // Emitir el evento 'created' con el registro creado
        props.created.isLoading = false;
        toast.success('Ingreso creado exitosamente.');
    } catch (error) {
        props.created.isLoading = false;
        console.error('Error creando ingreso:', error);
        toast.error('Error creando ingreso');
    }
};
</script>

<template>
    <Modal :show="show" @close="closeModal" :title="`Eliminar ${name}`" size="lg">
        <template #body>
            <p class="text-gray-900 dark:text-gray-100">¿Estás seguro de que deseas eliminar "{{ name }}"?</p>
        </template>
        <template #footer>
            <Button @click="deleteItem" type="danger" :isLoading="isLoading">Eliminar</Button>
        </template>
    </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/Components/Modal.vue';
import Button from '@/Components/Button.vue';
import { makeRequest } from '@/utils';
import { toast } from 'vue3-toastify';

const props = defineProps({
    show: Boolean,
    name: String,
    route: String,
    selected: Object
});

const emit = defineEmits(['close', 'delete']);

const isLoading = ref(false);

const closeModal = () => {
    emit('close');
};

const deleteItem = async () => {
    isLoading.value = true;
    try {
        await makeRequest('DELETE', props.route);
        console.log(`${props.name} deleted`);
        emit('delete', props.selected.id);
        closeModal();
        isLoading.value = false;
        toast.success(`${props.name} eliminado exitosamente.`);
    } catch (error) {
        isLoading.value = false;
        console.error(`Error eliminando ${props.name}:`, error);
        toast.error(`Error eliminando ${props.name}`);
    }
};
</script>

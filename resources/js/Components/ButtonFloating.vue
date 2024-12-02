<template>
    <div :class="positionClass" @click="openModal" class="fixed p-1 cursor-pointer">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    position: {
        type: String,
        default: 'bottom-right', // Default position
        validator: value => ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(value)
    },
    step: {
        type: Number,
        default: 1 // Default step value
    }
});

const emits = defineEmits(['open']);

const openModal = () => {
    emits('open');
};

const positionClass = computed(() => {
    switch (props.position) {
        case 'bottom-right':
            return 'bottom-4 right-4';
        case 'bottom-left':
            return 'bottom-4 left-4';
        case 'top-right':
            return 'top-4 right-4';
        case 'top-left':
            return 'top-4 left-4';
        default:
            return 'bottom-4 right-4';
    }
});
</script>

<style scoped>
.fixed {
    z-index: 50;
}
</style>

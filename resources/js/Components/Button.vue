<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    onClick: Function,
    disabled: {
        type: Boolean,
        default: false,
    },
    show: {
        type: Boolean,
        default: true,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button v-if="show" :type="type" @click="onClick" :disabled="disabled || isLoading"
        :class="[
            'inline-flex items-center px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg sm:w-auto sm:px-3 sm:py-2 active:bg-purple-600 focus:outline-none focus:shadow-outline-purple',
            {
                'bg-purple-600 hover:bg-purple-700': type === 'button',
                'bg-blue-600 hover:bg-blue-700': type === 'primary',
                'bg-red-600 hover:bg-red-700': type === 'danger',
                'bg-yellow-600 hover:bg-yellow-700': type === 'warning',
                'opacity-50 cursor-not-allowed': disabled || isLoading
            }
        ]">
        <slot />
        <svg v-if="isLoading" class="ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
    </button>
</template>

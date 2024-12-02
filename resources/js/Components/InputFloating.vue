<template>
    <div v-if="show" class="relative">
        <template v-if="type === 'select'">
            <select :id="uniqueId" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
                :class="`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent ${labelBackground} dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`">
                <option :value="defaultOptionValue" disabled>{{ defaultOptionText }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
            </select>
        </template>
        <template v-else>
            <input :type="type" :id="uniqueId" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                class="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
        </template>
        <label :for="uniqueId"
            :class="`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white ${labelBackground} px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded-lg truncate`">{{ label }}</label>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    modelValue: [String, Number],
    type: {
        type: String,
        default: 'text'
    },
    id: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Floating outlined'
    },
    options: {
        type: Array,
        default: () => []
    },
    defaultOptionText: {
        type: String,
        default: 'Selecciona una opción'
    },
    defaultOptionValue: {
        type: [String, Number, Boolean],
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    labelBackground: {
        type: String,
        default: 'dark:bg-gray-900'
    },
    show: {
        type: Boolean,
        default: true
    }
});

const uniqueId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped>
label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

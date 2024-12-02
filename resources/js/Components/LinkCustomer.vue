<template>
    <Link :href="href" :class="linkClass">
    <slot></slot>
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'LinkCustomer',
    components: {
        Link // Register the Link component here
    },
    props: {
        href: {
            type: String,
            required: true
        },
        linkClass: {
            type: String,
            default: 'flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700'
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here if necessary */
</style>
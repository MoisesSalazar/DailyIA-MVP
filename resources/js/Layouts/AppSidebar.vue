<script>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import LinkCustomer from '@/Components/LinkCustomer.vue';
import ApplicationMark from '@/Components/ApplicationMark.vue';

export default {
    components: {
        LinkCustomer,
        ApplicationMark,
    },
    data() {
        return {
            isSidebarOpen: false,
            isDropdownOpen: {
                layouts: false,
                crud: false
            }
        };
    },
    mounted() {
        const toggleButton = document.getElementById('toggleSidebarMobile');
        if (toggleButton) {
            toggleButton.addEventListener('click', this.toggleSidebar);
        }
    },
    beforeDestroy() {
        const toggleButton = document.getElementById('toggleSidebarMobile');
        if (toggleButton) {
            toggleButton.removeEventListener('click', this.toggleSidebar);
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleDropdown(dropdown) {
            this.$set(this.isDropdownOpen, dropdown, !this.isDropdownOpen[dropdown]);
        },
        isActive(routeName) {
            return route().current(routeName);
        }
    }
};
</script>

<template>
    <aside :class="{ 'hidden': !isSidebarOpen, 'flex': isSidebarOpen }"
        class="fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar">
        <div
            class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <div
                    class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-800">
                    <ul class="pb-2 space-y-2">
                        <li :class="{ 'bg-gray-200 dark:bg-gray-700 rounded-lg': isActive('dashboard') }">
                            <LinkCustomer :href="route('dashboard')">
                                <svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span class="ml-3" sidebar-toggle-item>Dashboard</span>
                            </LinkCustomer>
                        </li>
                        <li :class="{ 'bg-gray-200 dark:bg-gray-700 rounded-lg': isActive('finance.index') }">
                            <LinkCustomer :href="route('finance.index')">

                                <svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                                        clip-rule="evenodd" />
                                    <path fill-rule="evenodd"
                                        d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                        clip-rule="evenodd" />
                                    <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                                </svg>

                                <span class="ml-3" sidebar-toggle-item>Finanzas</span>
                            </LinkCustomer>
                        </li>
                        <!-- Otros enlaces de navegación -->
                    </ul>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800"
                sidebar-bottom-menu>
                <!-- Otros elementos del sidebar -->
            </div>
        </div>
    </aside>

    <div :class="{ 'hidden': !isSidebarOpen, 'block': isSidebarOpen }"
        class="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop" @click="toggleSidebar"></div>
</template>

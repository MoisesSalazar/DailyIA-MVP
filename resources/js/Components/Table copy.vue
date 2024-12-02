<template>
    <div class="relative overflow-x-auto rounded-lg">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
                <!-- Botón para crear -->
                <Button @click="handleCreate">
                    Crear
                </Button>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div
                    class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search" v-model="searchQuery"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar">
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th v-for="(column, index) in columns.filter(column => column.visible)" :key="index"
                            :style="{ width: column.width }" class="px-6 py-3">
                            {{ column.name }}
                        </th>
                        <th v-if="actions.length" :style="{ width: actionsWidth }" class="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody v-if="!isLoading && paginatedData.length">
                    <tr v-for="(item, index) in paginatedData" :key="index"
                        :class="['bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600', { 'border-b dark:border-gray-700': index !== paginatedData.length - 1 }]">
                        <td v-for="(column, idx) in columns.filter(column => column.visible)" :key="idx"
                            :style="{ width: column.width }" class="px-6 py-4 whitespace-nowrap"
                            :class="{ 'font-bold text-white': idx === 0 }">
                            {{ getNestedValue(item, column.key) }}
                        </td>
                        <td v-if="actions.length" class="px-6 py-4 flex space-x-2 whitespace-nowrap">
                            <Button v-for="action in actions" :key="action.name"
                                @click.prevent="$emit('action', action.event, item)">
                                <component :is="action.icon" class="h-4 w-4" />
                            </Button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-if="isLoading">
                        <td :colspan="columns.filter(column => column.visible).length + (actions.length ? 1 : 0)"
                            class="text-center py-4">
                            Cargando...
                        </td>
                    </tr>
                    <tr v-else>
                        <td :colspan="columns.filter(column => column.visible).length + (actions.length ? 1 : 0)"
                            class="text-center py-4">
                            Sin datos
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

               <nav aria-label="Page navigation example" class="mt-4">
            <ul class="inline-flex -space-x-px text-sm">
                <li>
                    <a href="#" @click.prevent="prevPage" :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white', { 'cursor-not-allowed opacity-50': currentPage === 1 }]">Previous</a>
                </li>
                <li v-for="page in totalPages" :key="page">
                    <a href="#" @click.prevent="goToPage(page)" :class="['flex items-center justify-center px-3 h-8 leading-tight', { 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': currentPage === page, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== page }]">{{ page }}</a>
                </li>
                <li>
                    <a href="#" @click.prevent="nextPage" :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white', { 'cursor-not-allowed opacity-50': currentPage === totalPages }]">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script scoped>
import { defineComponent } from 'vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import Button from '@/Components/Button.vue';

export default defineComponent({
    components: {
        PencilIcon,
        TrashIcon,
        Button
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        actions: {
            type: Array,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 4
        };
    },
    computed: {
        filteredData() {
            if (!this.searchQuery) {
                return this.data;
            }
            return this.data.filter(item => {
                return this.columns.some(column => {
                    const value = this.getNestedValue(item, column.key);
                    return value && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            });
        },
        sortedData() {
            const firstColumnKey = this.columns[0].key;
            return this.filteredData.sort((a, b) => {
                if (this.getNestedValue(a, firstColumnKey) < this.getNestedValue(b, firstColumnKey)) return -1;
                if (this.getNestedValue(a, firstColumnKey) > this.getNestedValue(b, firstColumnKey)) return 1;
                return 0;
            });
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.sortedData.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.sortedData.length / this.itemsPerPage);
        },
        actionsWidth() {
            return this.actions.reduce((total, action) => {
                return total + parseFloat(action.width);
            }, 0) + '%';
        }
    },
    methods: {
        handleCreate() {
            this.$emit('create');
        },
        getNestedValue(obj, key) {
            return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage(page) {
            this.currentPage = page;
        }
    }
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { HomeIcon, CreditCardIcon, ChartBarIcon, CogIcon } from '@heroicons/vue/24/solid';
import { setAuthToken, makeRequest } from '@/utils';
import AppLayout from '@/Layouts/AppLayout.vue';
import Resume from './Resume.vue';
import Setting from './Setting.vue';
import Transaction from './Transaction.vue';
import Analytic from './Analytic.vue';
import Button from '@/Components/Button.vue';
import { toast } from 'vue3-toastify';
import { store } from '@/store/store.js'; // Importa el store

const props = defineProps({
    authToken: {
        type: String,
        required: true
    }
});

const activeTab = ref('resume');
const isTokenSet = ref(false);
const walletIsLoading = ref(false);
const isLoading = ref(true); // Variable para controlar la carga inicial

const tabs = [
    { id: 'resume', name: 'Resumen', icon: HomeIcon },
    { id: 'transactions', name: 'Transacciones', icon: CreditCardIcon },
    { id: 'analytics', name: 'Analíticas', icon: ChartBarIcon },
    { id: 'settings', name: 'Configuración', icon: CogIcon }
];

const validateWallet = async () => {
    try {
        const response = await makeRequest('GET', route('api.wallets.index'));
        store.wallet = response.wallet; // Guarda la billetera en el store
        store.essential_needs_percentage = response.wallet.essential_needs_percentage;
        store.savings_percentage = response.wallet.savings_percentage;
        store.discretionary_spending_percentage = response.wallet.discretionary_spending_percentage;
    } catch (error) {
        console.error('Error connecting to API:', error);
        toast.error('Error al conectar con la API.');
    } finally {
        isLoading.value = false; // Finaliza la carga inicial
    }
};

const createWallet = async () => {
    walletIsLoading.value = true;
    try {
        const response = await makeRequest('POST', route('api.wallets.store'));
        store.wallet = response.wallet; // Guarda la billetera en el store
        store.essential_needs_percentage = response.wallet.essential_needs_percentage;
        store.savings_percentage = response.wallet.savings_percentage;
        store.discretionary_spending_percentage = response.wallet.discretionary_spending_percentage;
        toast.success('Billetera creada exitosamente.');
    } catch (error) {
        console.error('Error creating wallet:', error);
        toast.error('Error al crear la billetera.');
    } finally {
        walletIsLoading.value = false;
    }
};

const activeTabStyle = ref({});

const setActiveTab = (tabId) => {
    activeTab.value = tabId;
};

onMounted(async () => {
    setAuthToken(props.authToken);
    await validateWallet();
    isTokenSet.value = true;
});

</script>

<template>
    <AppLayout title="Finance">
        <template #content>
            <div v-if="isLoading" class="flex justify-center items-center min-h-[80vh]">
                <svg class="ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </div>

            <div v-else>
                <div v-if="!store.wallet && isTokenSet" class="flex justify-center items-center min-h-[80vh]">
                    <div
                        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No se
                                encontró
                                una billetera</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Por favor, cree una billetera para
                            comenzar a usar la aplicación.</p>
                        <Button :isLoading="walletIsLoading" @click="createWallet">Crear Billetera</Button>
                    </div>
                </div>

                <div v-if="store.wallet && isTokenSet">
                    <div class="flex justify-center">
                        <div class="p-2 rounded-lg bg-slate-100 dark:bg-gray-800 relative">
                            <ul class="flex justify-center text-sm font-medium text-center gap-4" role="tablist">
                                <li v-for="tab in tabs" :key="tab.id" role="presentation" class="relative">
                                    <button
                                        :class="['px-2 py-[5px] rounded-lg transition-all duration-300 ease-in-out flex items-center space-x-2',
                                            activeTab === tab.id ? 'bg-purple-600 text-white dark:bg-purple-500' : 'hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600']"
                                        @click="setActiveTab(tab.id)" :id="`${tab.id}-styled-tab`" type="button"
                                        role="tab" :aria-controls="tab.id" :aria-selected="activeTab === tab.id">
                                        <component :is="tab.icon" class="w-5 h-5" />
                                        <span class="hidden sm:inline">{{ tab.name }}</span>
                                    </button>
                                </li>
                            </ul>
                            <div class="absolute transition-all duration-300 ease-in-out bg-purple-600 rounded-lg"
                                :style="activeTabStyle"></div>
                        </div>
                    </div>
                    <div>
                        <div v-show="activeTab === 'resume'" class="p-4 rounded-lg bg-white dark:bg-gray-900"
                            id="styled-resume" role="tabpanel" aria-labelledby="resume-tab">
                            <Resume />
                        </div>
                        <div v-show="activeTab === 'transactions'" class="p-4 rounded-lg bg-white dark:bg-gray-900"
                            id="styled-transactions" role="tabpanel" aria-labelledby="transactions-tab">
                            <Transaction />
                        </div>
                        <div v-show="activeTab === 'settings'" class="p-4 rounded-lg bg-white dark:bg-gray-900"
                            id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
                            <Setting />
                        </div>
                        <div v-show="activeTab === 'analytics'" class="p-4 rounded-lg bg-white dark:bg-gray-900"
                            id="styled-analytics" role="tabpanel" aria-labelledby="analytics-tab">
                            <Analytic />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AppLayout>
</template>

<style scoped>
.tabs button {
    cursor: pointer;
}

.absolute {
    position: absolute;
    top: 0;
    left: 0;
}
</style>

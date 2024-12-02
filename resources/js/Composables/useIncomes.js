// FILE: composables/useIncomes.js
import { reactive, ref, onMounted, watch } from 'vue';
import { store } from '@/Store/store';

export function useIncomes() {
    const message = ref('');
    const showModalCreate = ref(false);
    const showModalEdit = ref(false);
    const showModalDelete = ref(false);

    const createdIncome = reactive({
        route: route('api.incomes.store'),
        method: 'post',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            name: '',
            wallet_id: store.wallet.id,
            budget: 0
        },
        fields: [
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'] },
            { name: 'budget', label: 'Presupuesto', field: 'budget', rules: ['required', 'numeric'] }
        ]
    });

    const editedIncome = reactive({
        route: '',
        method: 'put',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            id: '',
            name: '',
            budget: 0,
            month: '',
            year: ''
        },
        fields: [
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'], visible: true },
            { name: 'budget', label: 'Presupuesto', field: 'budget', rules: ['required', 'numeric'], visible: true },
            { name: 'month', label: 'Mes', field: 'month', rules: ['required', 'string'], visible: false },
            { name: 'year', label: 'Año', field: 'year', rules: ['required', 'string'], visible: false }
        ]
    });

    const tableIncomes = reactive({
        columns: [
            { name: 'Nombre de ingreso', key: 'name', visible: true, width: '60%' },
            { name: 'Presupuesto', key: 'budget', visible: true, width: '30%' }
        ],
        isLoading: true,
        data: [],
        actions: [
            { name: 'Edit', icon: 'PencilIcon', event: 'edit', width: '5%' },
            { name: 'Delete', icon: 'TrashIcon', event: 'delete', width: '5%' }
        ]
    });

    const handleAction = (action, item) => {
        if (action === 'edit') {
            Object.keys(editedIncome.formData).forEach(key => {
                editedIncome.formData[key] = item[key];
            });
            editedIncome.route = route('api.incomes.update', { id: editedIncome.formData.id });
            showModalEdit.value = true;
        } else if (action === 'delete') {
            Object.keys(editedIncome.formData).forEach(key => {
                editedIncome.formData[key] = item[key];
            });
            showModalDelete.value = true;
        }
    };

    const handleActionCreate = () => {
        console.log('Action: Create');
        showModalCreate.value = true;
    };

    const addIncome = async (income) => {
        store.wallet.incomes.push(income);
    };

    const updateIncome = async (updatedIncome) => {
        store.wallet.incomes = store.wallet.incomes.map(income =>
            income.id === updatedIncome.id ? { ...income, ...updatedIncome } : income
        );
        tableIncomes.data = store.wallet.incomes;
    };

    const deleteIncome = async (incomeId) => {
        store.wallet.incomes = store.wallet.incomes.filter(income => income.id !== incomeId);
    };

    const initializeIncomes = () => {
        tableIncomes.data = store.wallet.incomes;
        tableIncomes.isLoading = false;
    };

    onMounted(() => {
        initializeIncomes();
    });

    watch(() => store.wallet.incomes, (newIncomes) => {
        tableIncomes.data = newIncomes;
    }, { immediate: true });

    return {
        message,
        showModalCreate,
        showModalEdit,
        showModalDelete,
        createdIncome,
        editedIncome,
        tableIncomes,
        handleAction,
        handleActionCreate,
        deleteIncome,
        addIncome,
        updateIncome
    };
}
// FILE: composables/useTransactions.js
import { reactive, ref, onMounted, watch } from 'vue';
import { store } from '@/Store/store';

export function useTransactions() {
    const message = ref('');
    const showModalCreate = ref(false);
    const showModalEdit = ref(false);
    const showModalDelete = ref(false);
    const tags = ref([]);
    const incomes = ref([]);
    const egresses = ref([]);

    const types = reactive([
        { value: 'income', name: 'Ingreso' },
        { value: 'egress', name: 'Egreso' }
    ]);

    const createdTransaction = reactive({
        title: 'Crear Transacción',
        route: route('api.transactions.store'),
        method: 'post',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            type: '',
            egress_id: '',
            income_id: '',
            amount: '',
            concept: ''
        },
        fields: [
            { name: 'type', label: 'Tipo', field: 'type', rules: ['required', 'string'], type: 'select', options: types, visible: true },
            { name: 'income_id', label: 'Ingreso', field: 'income_id', rules: ['required', 'numeric'], type: 'select', options: incomes, visible: false },
            { name: 'tag_id', label: 'Categoria', field: 'tag_id', rules: ['required'], type: 'select', options: tags, visible: false },
            { name: 'egress_id', label: 'Egreso', field: 'egress_id', rules: ['required', 'numeric'], type: 'select', options: egresses, visible: false },
            { name: 'amount', label: 'Monto', field: 'amount', rules: ['required', 'numeric'], type: 'number', visible: false },
            { name: 'concept', label: 'Concepto', field: 'concept', rules: ['required', 'string'], visible: false },
        ]
    });

    const setField = function (fields, key, value) {
        fields.forEach(field => {
            if (field.name === key) {
                field.visible = value;
            }
        });
    }

    const setAmountAndConcept = function (value) {
        setField(createdTransaction.fields, 'amount', value);
        setField(createdTransaction.fields, 'concept', value);
    }

    watch(() => createdTransaction.formData.type, (newValue) => {
        if (newValue === 'income') {
            setField(createdTransaction.fields, 'income_id', true);
            setField(createdTransaction.fields, 'tag_id', false);
        } else {
            setField(createdTransaction.fields, 'tag_id', true);
            setField(createdTransaction.fields, 'income_id', false);
            setAmountAndConcept(false);
        }

        // Recorre cada campo en formData
        for (const key in createdTransaction.formData) {
            if (createdTransaction.formData.hasOwnProperty(key)) {
                if (key !== 'type') {
                    createdTransaction.formData[key] = '';
                }
            }
        }
    });

    const resetField = function (formData, keyField, value) {
        if (formData.hasOwnProperty(keyField)) {
            formData[keyField] = value;
        }
    };

    watch(() => createdTransaction.formData.income_id, (newValue) => {
        if (newValue) {
            setAmountAndConcept(true);
        } else {
            setAmountAndConcept(false);
        }
    });

    const setEgresses = (newValue) => {
        const tag = store.wallet.tags.find(tag => tag.id === newValue);
        if (tag && tag.egresses) {
            egresses.value = []; // Asegúrate de reiniciar egresses.value
            tag.egresses.forEach(egress => {
                egresses.value.push({ value: egress.id, name: egress.name });
            });
        }
    };

    watch(() => createdTransaction.formData.tag_id, (newValue) => {
        if (newValue) {
            resetField(createdTransaction.formData, 'egress_id', null)
            setEgresses(newValue);
            setField(createdTransaction.fields, 'egress_id', true);
        } else {
            setField(createdTransaction.fields, 'egress_id', false);
        }
    });

    watch(() => createdTransaction.formData.egress_id, (newValue) => {
        if (newValue) {
            setAmountAndConcept(true);
        } else {
            setAmountAndConcept(false);
        }
    });

    const editedTransaction = reactive({
        title: 'Editar Transacción',
        route: '',
        method: 'put',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            id: '',
            name: '',
            category: '',
            amount: 0
        },
        fields: [
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'], visible: true },
            { name: 'category', label: 'Categorias', field: 'category', rules: ['required', 'string'], type: 'select', options: [], visible: true },
            { name: 'amount', label: 'Monto', field: 'amount', rules: ['required', 'number'], visible: true },
        ]
    });

    const tableTransactions = reactive({
        columns: [
            { name: 'Concepto de transacción', key: 'concept', visible: true, width: '20%' },
            { name: 'Tipo', key: 'type_spanish', visible: true, width: '10%' },
            { name: 'Ingreso/Egreso', key: 'category', visible: true, width: '10%' },
            { name: 'Categoria', key: 'tag.name', visible: true, width: '10%' },
            { name: 'Monto', key: 'amount', visible: true, width: '10%' },
            { name: 'Fecha', key: 'updated_at_formatted', visible: true, width: '10%' },
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
            Object.keys(editedTransaction.formData).forEach(key => {
                editedTransaction.formData[key] = item[key];
            });
            editedTransaction.route = route('api.transactions.update', { id: editedTransaction.formData.id });
            showModalEdit.value = true;
        } else if (action === 'delete') {
            Object.keys(editedTransaction.formData).forEach(key => {
                editedTransaction.formData[key] = item[key];
            });
            showModalDelete.value = true;
        }
    };

    const handleActionCreate = () => {
        showModalCreate.value = true;
    };

    const deleteTransaction = async (transactionId) => {
        store.wallet.transactions = store.wallet.transactions.filter(transaction => transaction.id !== transactionId);
        tableTransactions.data = [...store.wallet.transactions];
    };

    const addTransaction = async (transaction) => {
        const newTransaction = {
            ...transaction,
            categoria: transaction.category
        };
        store.wallet.transactions.push(newTransaction);
        tableTransactions.data = [...store.wallet.transactions];
    };

    const updateTransaction = async (transaction) => {
        const updatedTransaction = {
            ...transaction,
            categoria: transaction.category
        };
        store.wallet.transactions = store.wallet.transactions.map(t => t.id === transaction.id ? updatedTransaction : t);
    };

    const initializeTransactions = () => {
        store.wallet.tags.forEach(tag => {
            tags.value.push({ value: tag.id, name: tag.name });
        });

        store.wallet.incomes.forEach(income => {
            incomes.value.push({ value: income.id, name: income.name });
        });

        tableTransactions.data = store.wallet.transactions;
        console.log('Transactions:', tableTransactions.data);
        tableTransactions.isLoading = false;
    };

    onMounted(() => {
        initializeTransactions();
    });

    return {
        message,
        showModalCreate,
        showModalEdit,
        showModalDelete,
        createdTransaction,
        editedTransaction,
        tableTransactions,
        handleAction,
        handleActionCreate,
        deleteTransaction,
        addTransaction,
        updateTransaction
    };
}
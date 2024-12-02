import { reactive, ref, onMounted, watch } from 'vue';
import { store } from '@/Store/store';

export function useEgresses() {
    const message = ref('');
    const showModalCreate = ref(false);
    const showModalEdit = ref(false);
    const showModalDelete = ref(false);
    const tags = reactive([]);

    const createdEgress = reactive({
        title: 'Crear Egreso',
        route: route('api.egresses.store'),
        method: 'post',
        data: [
            { name: 'wallet_id', value: store.wallet.id },
            { name: 'month', value: store.month },
            { name: 'year', value: store.year }
        ],
        isLoading: false,
        formData: {
            name: '',
            category: '',
            budget: '',
        },
        fields: [
            { name: 'tag_id', label: 'Categoria', field: 'tag_id', rules: ['required'], type: 'select', options: tags },
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'] },
            { name: 'budget', label: 'Presupuesto', field: 'budget', rules: ['required', 'numeric'], type: 'number' }
        ]
    });

    const editedEgress = reactive({
        title: 'Editar Egreso',
        route: '',
        method: 'put',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            id: '',
            name: '',
            tag_id: '',
            budget: '',
            month: '',
            year: ''
        },
        fields: [
            { name: 'tag_id', label: 'Categoria', field: 'tag_id', rules: ['required'], type: 'select', options: tags, visible: true },
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'], visible: true },
            { name: 'budget', label: 'Presupuesto', field: 'budget', rules: ['required', 'numeric'], type: 'number', visible: true },
            { name: 'month', label: 'Mes', field: 'month', rules: ['required', 'numeric'], type: 'number', visible: true },
            { name: 'year', label: 'Año', field: 'year', rules: ['required', 'numeric'], type: 'number', visible: true }
        ]
    });

    const tableEgresses = reactive({
        columns: [
            { name: 'Nombre de egreso', key: 'name', visible: true, width: '60%' },
            { name: 'Categoria', key: 'tag.name', visible: true, width: '20%' },
            { name: 'Presupuesto', key: 'budget', visible: true, width: '10%' }
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
            Object.keys(editedEgress.formData).forEach(key => {
                editedEgress.formData[key] = item[key];
            });
            editedEgress.route = route('api.egresses.update', { id: editedEgress.formData.id });
            showModalEdit.value = true;
        } else if (action === 'delete') {
            Object.keys(editedEgress.formData).forEach(key => {
                editedEgress.formData[key] = item[key];
            });
            showModalDelete.value = true;
        }
    };

    const handleActionCreate = () => {
        console.log('Action: Create');
        showModalCreate.value = true;
    };

    const deleteEgress = async (egressId) => {
        store.wallet.egresses = store.wallet.egresses.filter(egress => egress.id !== egressId);
        tableEgresses.data = store.wallet.egresses;
    };

    const addEgress = async (egress) => {
        store.wallet.egresses.push(egress);
        tableEgresses.data = store.wallet.egresses;
    };

    const updateEgress = async (updatedEgress) => {
        store.wallet.egresses = store.wallet.egresses.map(egress =>
            egress.id === updatedEgress.id ? { ...egress, ...updatedEgress } : egress
        );
        tableEgresses.data = store.wallet.egresses;
    };
    const initializeEgresses = () => {
        tableEgresses.data = store.wallet.egresses.map(egress => {
            const category = tags.find(tag => tag.id === egress.tag_id);
            return {
                ...egress,
                categoria: category ? category.name : null
            };
        });
        tableEgresses.isLoading = false;
    };

    onMounted(() => {
        initializeEgresses();
    });

    watch(() => store.wallet.tags, (newTags, oldTags) => {

        // Detectar cambios en las propiedades de los tags
        newTags.forEach((newTag, index) => {
            const oldTag = oldTags ? oldTags[index] : null;
            if (oldTag && (newTag.name !== oldTag.name || newTag.id !== oldTag.id)) {
                console.log(`Tag actualizado: ${oldTag.name} -> ${newTag.name}`);
            }
        });

        // Actualizar el array de tags
        tags.splice(0, tags.length, ...newTags.map(tag => ({
            value: tag.id,
            name: tag.name
        })));
    }, { immediate: true, deep: true });

    return {
        message,
        showModalCreate,
        showModalEdit,
        showModalDelete,
        createdEgress,
        editedEgress,
        tableEgresses,
        handleAction,
        handleActionCreate,
        deleteEgress,
        addEgress,
        updateEgress
    };
}
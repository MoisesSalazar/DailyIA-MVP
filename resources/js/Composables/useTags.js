// FILE: composables/useTags.js
import { reactive, ref, onMounted, watch } from 'vue';
import { store } from '@/Store/store';

export function useTags() {
    const message = ref('');
    const showModalCreate = ref(false);
    const showModalEdit = ref(false);
    const showModalDelete = ref(false);

    const categories = reactive([
        { value: 'essential_needs', name: 'Necesidades esenciales' },
        { value: 'discretionary_spending', name: 'Gastos no esenciales' },
        { value: 'savings', name: 'Ahorros' },
    ]);

    const createdTag = reactive({
        title: 'Crear Tag(Categoria)',
        route: route('api.tags.store'),
        method: 'post',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            name: '',
            wallet_id: store.wallet.id,
            category: ''
        },
        fields: [
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'] },
            { name: 'category', label: 'Categorias', field: 'category', rules: ['required', 'string'], type: 'select', options: categories },
        ]
    });

    const editedTag = reactive({
        title: 'Editar Tag(Categoria)',
        route: '',
        method: 'put',
        data: [
            { name: 'wallet_id', value: store.wallet.id }
        ],
        isLoading: false,
        formData: {
            id: '',
            name: '',
            category: ''
        },
        fields: [
            { name: 'name', label: 'Nombre', field: 'name', rules: ['required', 'string'], visible: true },
            { name: 'category', label: 'Categorias', field: 'category', rules: ['required', 'string'], type: 'select', options: categories, visible: true },
        ]
    });

    const tableTags = reactive({
        columns: [
            { name: 'Nombre de categoria', key: 'name', visible: true, width: '60%' },
            { name: 'Categoria', key: 'categoria', visible: true, width: '30%' }
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
            Object.keys(editedTag.formData).forEach(key => {
                editedTag.formData[key] = item[key];
            });
            editedTag.route = route('api.tags.update', { id: editedTag.formData.id });
            showModalEdit.value = true;
        } else if (action === 'delete') {
            Object.keys(editedTag.formData).forEach(key => {
                editedTag.formData[key] = item[key];
            });
            showModalDelete.value = true;
        }
    };

    const handleActionCreate = () => {
        showModalCreate.value = true;
    };

    const deleteTag = async (tagId) => {
        store.wallet.tags = store.wallet.tags.filter(tag => tag.id !== tagId);
        tableTags.data = [...store.wallet.tags];
    };

    const addTag = async (tag) => {
        const category = categories.find(cat => cat.value === tag.category);
        const newTag = {
            ...tag,
            categoria: category ? category.name : null
        };
        store.wallet.tags.push(newTag);
        tableTags.data = [...store.wallet.tags];
        console.log("Add:", store.wallet.tags);
    };

    const updateTag = async (tag) => {
        console.log("Tag Edit:", tag);
        const category = categories.find(cat => cat.value === tag.category);
        const updatedTag = {
            ...tag,
            categoria: category ? category.name : null
        };
        store.wallet.tags = store.wallet.tags.map(t => t.id === tag.id ? updatedTag : t);
    };

    const initializeTags = () => {
        tableTags.data = store.wallet.tags.map(tag => {
            const category = categories.find(cat => cat.value === tag.category);
            return {
                ...tag,
                categoria: category ? category.name : null
            };
        });
        tableTags.isLoading = false;
    };

    onMounted(() => {
        initializeTags();
    });

    watch(() => store.wallet.tags, (newTags) => {
        tableTags.data = newTags.map(tag => {
            const category = categories.find(cat => cat.value === tag.category);
            return {
                ...tag,
                categoria: category ? category.name : null
            };
        });
    }, { immediate: true });

    return {
        message,
        showModalCreate,
        showModalEdit,
        showModalDelete,
        createdTag,
        editedTag,
        tableTags,
        handleAction,
        handleActionCreate,
        deleteTag,
        addTag,
        updateTag
    };
}

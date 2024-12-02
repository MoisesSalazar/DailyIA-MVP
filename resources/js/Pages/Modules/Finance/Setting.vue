<script setup>
import { useIncomes } from '@/Composables/useIncomes';
import { useTags } from '@/Composables/useTags';
import { useEgresses } from '@/Composables/useEgresses';
import Table from '@/Components/Table.vue';
import ModalCreate from '@/Components/ModalCreate.vue';
import ModalEdit from '@/Components/ModalEdit.vue';
import ModalDelete from '@/Components/ModalDelete.vue';

const {
    message: incomeMessage,
    showModalCreate: showIncomeModalCreate,
    showModalEdit: showIncomeModalEdit,
    showModalDelete: showIncomeModalDelete,
    createdIncome,
    editedIncome,
    tableIncomes,
    handleAction: handleIncomeAction,
    handleActionCreate: handleIncomeActionCreate,
    deleteIncome,
    addIncome,
    updateIncome
} = useIncomes();

const {
    message: tagMessage,
    showModalCreate: showTagModalCreate,
    showModalEdit: showTagModalEdit,
    showModalDelete: showTagModalDelete,
    createdTag,
    editedTag,
    tableTags,
    handleAction: handleTagAction,
    handleActionCreate: handleTagActionCreate,
    deleteTag,
    addTag,
    updateTag
} = useTags();

const {
    message: egressMessage,
    showModalCreate: showEgressModalCreate,
    showModalEdit: showEgressModalEdit,
    showModalDelete: showEgressModalDelete,
    createdEgress,
    editedEgress,
    tableEgresses,
    handleAction: handleEgressAction,
    handleActionCreate: handleEgressActionCreate,
    deleteEgress,
    addEgress,
    updateEgress
} = useEgresses();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Table :isLoading="tableIncomes.isLoading" :data="tableIncomes.data"
            :columns="tableIncomes.columns.filter(column => column.visible)" :actions="tableIncomes.actions"
            @action="handleIncomeAction" @create="handleIncomeActionCreate" />
        <Table :isLoading="tableTags.isLoading" :data="tableTags.data"
            :columns="tableTags.columns.filter(column => column.visible)" :actions="tableTags.actions"
            @action="handleTagAction" @create="handleTagActionCreate" />
        <div class="col-span-1 md:col-span-2">
            <Table :isLoading="tableEgresses.isLoading" :data="tableEgresses.data"
                :columns="tableEgresses.columns.filter(column => column.visible)" :actions="tableEgresses.actions"
                @action="handleEgressAction" @create="handleEgressActionCreate" />
        </div>
    </div>
    <!-- Para Incomes -->
    <ModalCreate :show="showIncomeModalCreate" @close="showIncomeModalCreate = false" :created="createdIncome"
        :table="tableIncomes.data" @created="addIncome" />
    <ModalEdit :show="showIncomeModalEdit" @close="showIncomeModalEdit = false" :edited="editedIncome"
        :table="tableIncomes.data" @update="updateIncome" />
    <ModalDelete :show="showIncomeModalDelete" @close="showIncomeModalDelete = false"
        :route="route('api.incomes.destroy', { id: editedIncome.formData.id })" :name="editedIncome.formData.name"
        @delete="deleteIncome" :selected="editedIncome.formData" />

    <!-- Para Tags -->
    <ModalCreate :show="showTagModalCreate" @close="showTagModalCreate = false" :created="createdTag"
        :table="tableTags.data" @created="addTag" />
    <ModalEdit :show="showTagModalEdit" @close="showTagModalEdit = false" :edited="editedTag" :table="tableTags.data"
        @update="updateTag" />
    <ModalDelete :show="showTagModalDelete" @close="showTagModalDelete = false"
        :route="route('api.tags.destroy', { id: editedTag.formData.id })" :name="editedTag.formData.name"
        @delete="deleteTag" :selected="editedTag.formData" />

    <!-- Para Egresses -->
    <ModalCreate :show="showEgressModalCreate" @close="showEgressModalCreate = false" :created="createdEgress"
        :table="tableEgresses.data" @created="addEgress" />
    <ModalEdit :show="showEgressModalEdit" @close="showEgressModalEdit = false" :edited="editedEgress"
        :table="tableEgresses.data" @update="updateEgress" />
    <ModalDelete :show="showEgressModalDelete" @close="showEgressModalDelete = false"
        :route="route('api.egresses.destroy', { id: editedEgress.formData.id })" :name="editedEgress.formData.name"
        @delete="deleteEgress" :selected="editedEgress.formData" />
</template>

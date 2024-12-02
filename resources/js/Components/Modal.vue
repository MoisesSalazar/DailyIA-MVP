<template>
    <div>
        <!-- Main modal -->
        <transition name="modal-fade">
            <div v-if="show" tabindex="-1"
                class="modal fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
                <div :class="['relative p-4 w-full max-h-full', modalSizeClass]">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-900 max-h-full overflow-hidden">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ title }}
                            </h3>
                            <button @click="$emit('close')" type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 overflow-y-auto" style="max-height: calc(100vh - 200px);">
                            <slot name="body"></slot>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center justify-end p-4 md:p-5 border-t rounded-b dark:border-gray-600">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: null, // Default size
        }
    },
    computed: {
        modalSizeClass() {
            switch (this.size) {
                case 'md':
                    return 'max-w-md';
                case 'lg':
                    return 'max-w-lg';
                case 'xl':
                    return 'max-w-4xl';
                case '2xl':
                    return 'max-w-7xl';
                default:
                    return 'max-w-sm';
            }
        }
    }
}
</script>

<style scoped>
.modal {
  background-color: rgba(17, 17, 17, 0.9); /* Aquí defines el color con opacidad */
}

</style>

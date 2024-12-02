<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import Banner from '@/Components/Banner.vue';
import AppSidebar from '@/Layouts/AppSidebar.vue';
import AppNavBar from './AppNavBar.vue';


defineProps({
    title: String,
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <div>

        <Head :title="title" />

        <Banner />

        <AppNavBar />

        <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">

            <!-- Sidebar -->
            <AppSidebar />

            <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                <main>
                    <div class="px-4 pt-6">
                        <!-- Content -->
                        <slot name="content">

                        </slot>
                    </div>
                </main>
                <!-- Footer -->
                <!-- <AppFooter /> -->
            </div>

        </div>

    </div>
</template>

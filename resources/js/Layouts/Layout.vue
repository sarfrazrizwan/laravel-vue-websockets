<template>
    <q-layout view="hHh lpR lFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" />

                <q-toolbar-title>
                    <div class="flex items-center q-col-gutter-sm">
                        <div>
                            <Link href="/" class="text-decoration-none">
                                Notifications
                            </Link>
                        </div>
                        <div>
                            <q-select
                                v-model="form.company_id"
                                :options="companies"
                                emit-value
                                map-options
                                dense
                                square
                                outlined
                                option-label="name"
                                option-value="id"
                                bg-color="white"
                                @update:model-value="selectCompany"
                            />
                        </div>
                    </div>
                </q-toolbar-title>

                <Notification />
                <q-btn icon="exit_to_app" flat round @click="logout" />
            </q-toolbar>
        </q-header>

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            class="bg-blue-grey-9 text-grey-1"
            side="left"
            bordered
        >
            <q-list class="q-pt-md">
                <Link :href="route('home')">
                    <q-item clickable tag="a" active-class="active-class">
                        <q-item-section avatar>
                            <q-icon name="dashboard" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Dashboard</q-item-label>
                        </q-item-section>
                    </q-item>
                </Link>

                <Link :href="route('quotations')">
                    <q-item clickable tag="a" active-class="active-class">
                        <q-item-section avatar>
                            <q-icon name="request_quote" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Quotations</q-item-label>
                        </q-item-section>
                    </q-item>
                </Link>

                <Link :href="route('products')">
                    <q-item clickable tag="a" active-class="active-class">
                        <q-item-section avatar>
                            <q-icon name="inventory_2" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Products</q-item-label>
                        </q-item-section>
                    </q-item>
                </Link>
            </q-list>
        </q-drawer>

        <q-page-container>
            <slot></slot>
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { Link, usePage, useForm } from "@inertiajs/inertia-vue3";
import Notification from "./../Components/Notification.vue";

export default {
    components: { Link, Notification },
    setup(props) {
        const leftDrawerOpen = ref(false);

        async function logout() {
            await fetch("/api/logout", {
                method: "post",
            });
            location.reload();
        }
        const companies = computed(() => {
            return usePage().props.value._companies ?? [];
        });
        const authUser = computed(() => {
            return usePage().props.value._user ?? {};
        });
        const company_id = ref(authUser.value.company_id);

        const form = useForm({
            company_id: authUser.value.company_id,
        });
        function selectCompany(id) {
            form.post(route("company.update-selection", { id: id }), {
                onSuccess: (data) => {
                    setTimeout(function () {
                        const event = new Event("inertia:notifications");
                        document.dispatchEvent(event);
                    }, 300);
                },
            });
        }

        return {
            leftDrawerOpen,
            company_id,
            selectCompany,
            logout,
            companies,
            form,
        };
    },
};
</script>

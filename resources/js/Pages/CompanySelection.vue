<template>
    <q-layout>
        <q-page-container>
            <q-page class="row justify-center items-center">
                <div class="col-md-5 col-10">
                    <q-card flat bordered class="my-card">
                        <q-card-section>
                            <div class="text-h6 text-center">
                                Select Company
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-list bordered separator>
                                <q-item
                                    clickable
                                    v-ripple
                                    v-for="company in companies"
                                    :key="company.id"
                                    @click="selectCompany(company.id)"
                                >
                                    <q-item-section>
                                        {{ company.name }}
                                    </q-item-section>
                                    <q-item-section avatar>
                                        <q-icon
                                            color="primary"
                                            name="arrow_forward_ios"
                                        />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
import { usePage } from "@inertiajs/inertia-vue3";
import { computed } from "vue";
import { Inertia } from "@inertiajs/inertia";
export default {
    components: {},
    setup() {
        const companies = computed(() => {
            return usePage().props.value._companies ?? [];
        });

        function selectCompany(id) {
            Inertia.post(route("company.update-selection", { id: id }));
        }
        return {
            companies,
            selectCompany,
        };
    },
};
</script>

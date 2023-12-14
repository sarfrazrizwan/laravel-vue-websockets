<template>
    <div class="q-pa-md bg-grey-2 full-height">
        <div class="text-h5 text-bold">Dashboard</div>
        <q-card flat bordered>
            <q-card-section>
                <div>
                    <q-input
                        v-model="text"
                        label="Notification Text"
                        class="q-mb-md"
                    />

                    <q-btn
                        color="primary"
                        label="send"
                        unelevated
                        @click="sendNotification"
                        :disable="!text"
                    />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import InertiaLayout from "./../Layouts/Layout.vue";
export default {
    layout: InertiaLayout,
    data() {
        return {
            text: "",
        };
    },
    methods: {
        async sendNotification() {
            await fetch("/api/notifications", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({
                    text: this.text,
                }),
            });

            this.text = "";
        },
    },
};
</script>
<style>
.q-card [type="text"] {
    --tw-ring-shadow: unset !important;
}
</style>

<template>
    <!-- v-if="$q.screen.gt.xs" -->
    <div>
        <q-btn dense flat icon="notifications">
            <q-badge
                color="red"
                v-if="unReadNotificationCount"
                text-color="white"
                floating
            >
                {{ unReadNotificationCount }}
            </q-badge>
            <q-menu auto-close>
                <q-list separator class="q-my-md">
                    <div
                        class="flex justify-end"
                        v-if="unReadNotificationCount"
                    >
                        <q-btn
                            size="13px"
                            label="Mark All read"
                            color="primary"
                            flat
                            padding="5px 0"
                            class="q-py-sm"
                            @click="markAllRead"
                        />
                    </div>
                    <q-item
                        clickable
                        v-for="notification in notifications"
                        :key="notification.id"
                        :class="{ 'bg-green-3': !notification.read_at }"
                        @click="markAsRead(notification)"
                        style="min-width: 300px"
                    >
                        <q-item-section avatar>
                            <q-avatar
                                color="teal"
                                text-color="white"
                                icon="notifications"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ notification.text }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-item-label caption class="text-sm">
                                {{ notification.created_at }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>
<script>
import { useQuasar } from "quasar";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-vue3";
export default {
    name: "Notification",
    components: {},
    data() {
        const $q = useQuasar();
        return {
            notifications: [],
            isNotificationModalOpen: false,
            modalData: {},
            $q,
        };
    },

    computed: {
        unReadNotificationCount() {
            const notifications = this.notifications.filter(
                (notification) => !notification.read_at
            );
            return notifications.length;
        },
        authUser() {
            return usePage().props.value._user ?? {};
        },
    },
    methods: {
        getNotifications() {
            console.log("nti");
            fetch("/api/notifications", {
                method: "get",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((response) => {
                    this.notifications = response.data;
                });
        },

        markAsRead({ id }) {
            this.markAsReadLocal(id);
            fetch(`/api/notifications/${id}`, {
                method: "post",
            })
                .then((response) => response.json())
                .then((response) => {
                    this.notifications = response.data;
                });
        },
        markAllRead() {
            fetch(`/api/notifications/mark-all`, {
                method: "post",
            })
                .then((response) => response.json())
                .then((response) => {
                    this.notifications = response.data;
                });
        },

        markAsReadLocal(id) {
            this.notifications.map((x) => {
                if (x.id === id) {
                    x.is_read = true;
                }
            });
        },
    },
    mounted() {
        Echo.private(`App.Models.User.${this.authUser.id}`).notification(
            (notification) => {
                this.$q.notify({
                    message: notification.message,
                    icon: "notifications",
                });
                this.getNotifications();
            }
        );
        this.getNotifications();
        Inertia.on("notifications", (event) => {
            this.getNotifications();
        });
    },
};
</script>

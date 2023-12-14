import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import { registerQuasarConfigs } from "./quasar-user-options";
import InertiaLayout from "./Layouts/Layout.vue";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        );

        page.layout ??= InertiaLayout;
        return page;
    },
    setup({ el, app, props, plugin }) {
        const inertiaApp = createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy);

        registerQuasarConfigs(inertiaApp);
        inertiaApp.mount(el);
    },
});

InertiaProgress.init({ color: "#4B5563" });

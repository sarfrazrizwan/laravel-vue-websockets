import { boot } from "quasar/wrappers";
import axios from "axios";

import { Loading, QSpinnerCube } from "quasar";
import { Notify } from "quasar";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let instance;
export default boot(({ app, store }) => {
    instance = axios.create({
        responseType: "json",
    });

    const isGetRequest = (method) => {
        return method === "GET" || method === "get";
    };

    // let token = document.head.querySelector('meta[name="csrf-token"]');
    // if (token) {
    //     axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
    //     axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    // } else {
    //     console.error(
    //         "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    //     );
    // }

    instance.interceptors.request.use(
        (config) => {
            Loading.show({
                spinner: QSpinnerCube,
                spinnerColor: "primary",
                backgroundColor: "white",
                delay: 250,
                spinnerSize: "3rem",
            });
            config.headers["Accept"] = "application/json";

            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => {
            Loading.hide();

            if (!isGetRequest(response.config.method)) {
                let message = response.data.message;

                // if (message) {
                //     Notify.create({
                //         message: message,
                //         color: "green",
                //     });
                // }
            }

            return response;
        },
        (error) => {
            Loading.hide();

            if (error.response.status === 401) {
                store.commit("auth/logout");
            } else if (error.response.status == 406 && error.response.message) {
                Notify.create({
                    message: error.response.message,
                    color: "red",
                });
            } else if (error.response.status === 422) {
                Notify.create({
                    message: error.response.data.message,
                    color: "red",
                });
            } else if (
                error.response.status !== 500 &&
                error.response.data.message
            ) {
                Notify.create({
                    message: error.response.data.message,
                    color: "red",
                });
            } else if (error.response.status == 401) {
                Notify.create({
                    message: "Your session has expired. Please login again",
                    color: "red",
                });
            }

            return Promise.reject(error);
        }
    );

    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = instance;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { instance };

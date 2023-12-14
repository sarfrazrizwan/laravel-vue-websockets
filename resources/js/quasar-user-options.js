import { Quasar, Notify, Meta, Dialog } from "quasar";
import "./Scss/index.scss";
const registerQuasarConfigs = (app) => {
    app.use(Quasar, {
        plugins: {
            Notify,
            Meta,
            Dialog,
        },
        config: {
            notify: {
                position: "bottom-right",
                timeout: 2000,
            },
        },
    });
};

export { registerQuasarConfigs };

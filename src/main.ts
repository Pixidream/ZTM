import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.scss";
import App from "./App.vue";
import { vuetifyPlugin } from "./plugins/vuetifyPlugin";
import { router } from "./routes/index.ts";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetifyPlugin).mount("#app");

import { createApp } from "vue";

import "./style.scss";
import App from "./App.vue";
import { vuetifyPlugin } from "./plugins/vuetifyPlugin";

createApp(App).use(vuetifyPlugin).mount("#app");

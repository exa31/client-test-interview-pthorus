import "./assets/main.css";
import VueCookies from "vue-cookies";
import { createApp } from "vue";
import App from "./App.vue";
import "vue-toast-notification/dist/theme-sugar.css";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(VueCookies).use(ToastPlugin).mount("#app");

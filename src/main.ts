import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import "./assets/tailwind.css";
import vueDebounce from "vue-debounce";

const app = createApp(App);

app.use(store, key);
app.use(router);
app.directive("debounce", vueDebounce({ lock: true }));
app.mount("#app");

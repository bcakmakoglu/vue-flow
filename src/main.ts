import { createApp } from 'vue-demi';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.config.performance = true;
app.use(createPinia());
app.mount('#app');

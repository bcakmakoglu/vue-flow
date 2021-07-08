import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.config.performance = true;
app.use(createPinia());
app.mount('#app');

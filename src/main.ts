import { createApp } from 'vue-demi';
import App from './App.vue';

const app = createApp(App);
app.config.performance = true;
app.mount('#app');

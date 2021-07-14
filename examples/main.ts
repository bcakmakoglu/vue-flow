import { createApp } from 'vue';
import './index.css';
import App from './App';
import { router } from './router';
import { DraggablePlugin } from '@braks/revue-draggable';
import { createPinia } from 'pinia';
const app = createApp(App);

app.config.performance = true;
app.use(router);
app.use(DraggablePlugin);
app.use(createPinia());
app.mount('#root');

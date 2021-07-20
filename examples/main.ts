import { createApp } from 'vue';
import './index.css';
import App from './App';
import { router } from './router';
import { createPinia } from 'pinia';
import { DraggablePlugin } from '@braks/revue-draggable';

const app = createApp(App);

app.config.performance = true;
app.use(router);
app.use(DraggablePlugin);
app.use(createPinia());
app.mount('#root');

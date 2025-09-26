import { createApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import router from './router';
import '@/assets/styles/global.scss';
import '@/assets/styles/index.scss';
import 'uno.css';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');

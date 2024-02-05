import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import 'tailwindcss/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app')

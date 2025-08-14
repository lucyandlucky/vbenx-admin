import { createApp } from 'vue';

import App from './app.vue';

async function bootstrap() {
  const app = createApp(App);

  app.mount('#app');
}

export { bootstrap };

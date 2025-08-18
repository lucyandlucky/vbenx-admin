import { createApp } from 'vue'

import '@vbenx/styles'
import '@vbenx/styles/antd'

import App from './app.vue'

async function bootstrap() {
  const app = createApp(App)

  app.mount('#app')
}

export { bootstrap }

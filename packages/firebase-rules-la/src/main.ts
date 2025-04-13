import { configureMonaco } from './services/monaco'
import loader from '@monaco-editor/loader'

loader.config({ 
  paths: {
    vs: '/node_modules/monaco-editor/min/vs'
  },
  'vs/nls': {
    availableLanguages: {}
  }
})

self.MonacoEnvironment = {
  getWorker: async function (_: string, label: string) {
    if (label === 'json') {
      const worker = await import('monaco-editor/esm/vs/language/json/json.worker?worker')
      return new worker.default()
    }
    const worker = await import('monaco-editor/esm/vs/editor/editor.worker?worker')
    return new worker.default()
  }
}

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { tooltip } from './directives/tooltip'

// Force dark theme
document.documentElement.classList.add('dark')

// Configure Monaco Editor
configureMonaco()

const app = createApp(App)

// Use router
app.use(router)

// Register tooltip directive
app.directive('tooltip', tooltip)

app.mount('#app')

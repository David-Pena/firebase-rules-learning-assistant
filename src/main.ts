import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import { configureMonaco } from './services/monaco'

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    return new editorWorker()
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

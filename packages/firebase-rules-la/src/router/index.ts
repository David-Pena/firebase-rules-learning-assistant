import { createRouter, createWebHistory } from 'vue-router'
import RulesBuilder from '../components/RulesBuilder.vue'
import AiManifesto from '../views/AiManifesto.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: RulesBuilder
    },
    {
      path: '/ai',
      component: AiManifesto
    }
  ]
})

export default router
<script setup lang="ts">
import { ref } from 'vue'
import type { ValidationResult } from '../services/ruleValidation'
import Modal from './Modal.vue'
import FirebaseSetup from './FirebaseSetup.vue'
import RuleTester from './RuleTester.vue'
import { Settings, TestTube, PanelRight, PanelRightClose, HelpCircle } from 'lucide-vue-next'

const props = defineProps<{
  validation: ValidationResult
  currentRule: string
  isSidebarOpen: boolean
  tourRef: any
}>()

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const showConfigModal = ref(false)
const showTestModal = ref(false)

const startTour = () => {
  props.tourRef?.startTour()
}
</script>

<template>
  <header class="px-8 py-4 flex justify-between items-center bg-primary border-b border-tertiary">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-medium">Firestore Rules Helper</h1>
      <button 
        class="btn btn-outline p-2"
        @click="startTour"
        v-tooltip="'Start Tour'"
      >
        <HelpCircle class="w-4 h-4" />
      </button>
    </div>

    <div class="flex items-center gap-3">
      <button 
        class="btn btn-outline p-2"
        @click="showConfigModal = true"
        data-tour="firebase-setup"
        v-tooltip="'Enter Firebase Keys'"
      >
        <Settings class="w-4 h-4" />
      </button>
      
      <button 
        class="btn btn-outline p-2"
        @click="showTestModal = true"
        data-tour="test-rules"
        v-tooltip="'Test Your Rules'"
        :disabled="!validation.isValid"
      >
        <TestTube class="w-4 h-4" />
      </button>
      
      <button 
        class="btn btn-outline p-2 hidden lg:flex"
        @click="emit('toggle-sidebar')"
        v-tooltip="isSidebarOpen ? 'Hide Examples' : 'Show Examples'"
      >
        <PanelRight v-if="!isSidebarOpen" class="w-4 h-4" />
        <PanelRightClose v-else class="w-4 h-4" />
      </button>
      
      <div 
        class="px-4 py-2 rounded-md text-sm"
        :class="validation.isValid ? 'bg-success/20 text-success' : 'bg-error/20 text-error'"
      >
        <span v-if="validation.isValid">✓ Valid Rules</span>
        <div v-else class="flex items-start gap-2">
          <span class="mt-0.5">✗</span>
          <div>
            <div 
              v-for="error in validation.errors" 
              :key="error.message"
              class="text-sm leading-snug"
            >
              <span v-if="error.line">Line {{ error.line }}: </span>
              {{ error.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Modal 
      title="Firebase Configuration"
      :is-open="showConfigModal"
      @close="showConfigModal = false"
    >
      <FirebaseSetup />
    </Modal>
    
    <Modal
      title="Test Rules"
      :is-open="showTestModal"
      @close="showTestModal = false"
    >
      <RuleTester :current-rule="currentRule" />
    </Modal>
  </header>
</template>
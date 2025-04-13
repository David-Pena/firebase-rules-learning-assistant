<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditor from './MonacoEditor.vue'
import Header from './Header.vue'
import TermsReference from './TermsReference.vue'
import ExamplesList from './ExamplesList.vue'
import Footer from './Footer.vue'
import { ruleExamples } from '../data/ruleExamples'
import { validateRules, type ValidationResult } from '../services/ruleValidation'
import { extractRelevantTerms } from '../utils/termExtractor'
import type { RuleExample } from '../types/rules'
import { useSidebarStore } from '../stores/useSidebarStore'
import { PanelRightClose, PanelRight } from 'lucide-vue-next'
import OnboardingTour from './OnboardingTour.vue'

const tourRef = ref()
const expandedExamples = ref<Set<string>>(new Set())
const { isSidebarOpen, toggleSidebar } = useSidebarStore()
const validation = ref<ValidationResult>({ isValid: true, errors: [] })
const rulesCode = ref(`service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access on all documents to any user signed in to the application
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`)

const examples = ref<RuleExample[]>(ruleExamples)
const categories = computed(() => {
  const cats = new Set(examples.value.map(ex => ex.category))
  return Array.from(cats)
})

const relevantTerms = computed(() => {
  return extractRelevantTerms(rulesCode.value)
})

const insertExample = (code: string) => {
  rulesCode.value = code
  validateCurrentRules()
}

const onRulesChange = () => {
  validateCurrentRules()
}

const validateCurrentRules = () => {
  validation.value = validateRules(rulesCode.value)
}

const toggleExample = (name: string) => {
  if (expandedExamples.value.has(name)) {
    expandedExamples.value.delete(name)
  } else {
    expandedExamples.value.add(name)
  }
}
</script>

<template>
  <div class="rules-builder">
    <OnboardingTour ref="tourRef" />
    <Header 
      :validation="validation" 
      :current-rule="rulesCode"
      @toggle-sidebar="toggleSidebar"
      :is-sidebar-open="isSidebarOpen"
      :tour-ref="tourRef"
    />

    <div class="main-content">
      <div 
        class="editor-section relative" 
        :class="{ 'w-full': !isSidebarOpen }"
        data-tour="editor"
      >
        <MonacoEditor 
          v-model="rulesCode" 
          @update:modelValue="onRulesChange"
        />
        <TermsReference :terms="relevantTerms" />
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <ExamplesList
          v-if="isSidebarOpen"
          :examples="examples"
          :categories="categories"
          :expanded-examples="expandedExamples"
          @toggle-example="toggleExample"
          @use-example="insertExample"
        />
      </Transition>

      <!-- Mobile Toggle Button -->
      <button
        class="fixed bottom-4 right-4 lg:hidden z-50 p-3 rounded-full bg-accent text-white shadow-lg"
        @click="toggleSidebar"
      >
        <PanelRight v-if="!isSidebarOpen" class="w-5 h-5" />
        <PanelRightClose v-else class="w-5 h-5" />
      </button>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.rules-builder {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  height: calc(100vh - 130px);
  overflow: hidden;
}

.editor-section {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.explanation-section {
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  overflow-y: auto;
  border-left: 1px solid #333;
  color: #fff;
}

.explanation-content {
  font-size: 0.9rem;
}

.category-title {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #646cff;
  font-weight: 500;
  font-size: 1.1rem;
}

.category-section {
  margin-bottom: 2rem;
}

.example-item {
  background-color: #242424;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #333;
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.example-title {
  font-weight: 400;
  font-size: 15px;
  color: #646cff;
  margin: 0;
}

.example-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button {
  padding: 4px 12px;
  font-size: 13px;
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  border-radius: 3px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #646cff15;
}

.example-content {
  display: none;
  color: #ccc;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #333;
}

.example-content.expanded {
  display: block;
  animation: slideDown 0.2s ease-out;
}

.description {
  font-size: 14px;
  line-height: 1.5;
  color: #aaa;
  margin: 0.5rem 0;
}

.explanation ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.explanation li {
  margin-bottom: 0.5rem;
  color: #aaa;
  font-size: 14px;
}

.terms-reference {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
  font-size: 14px;
}

.terms-empty {
  text-align: center;
  color: #666;
  padding: 1rem;
  font-size: 14px;
}

.terms-category-title {
  font-size: 14px;
  font-weight: 400;
  color: #646cff;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
}

.terms-list {
  margin: 0;
  padding: 0;
}

.term-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #242424;
}

.term-item dt code {
  min-width: 140px;
  display: inline-block;
  padding: 2px 6px;
  background: #242424;
  border-radius: 3px;
  color: #646cff;
  font-size: 13px;
}

.term-item dd {
  margin: 0;
  color: #aaa;
  font-size: 14px;
  line-height: 1.5;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
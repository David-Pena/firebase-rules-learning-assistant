<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { watch } from 'vue'

const steps = [
  {
    title: 'Welcome to Firestore Rules Helper',
    content: 'This tool helps you write and test Firebase security rules for your project.',
    target: null
  },
  {
    title: 'Firebase Setup',
    content: 'Click here to configure your Firebase project credentials. You\'ll need your API Key, Project ID, and Auth Domain.',
    target: '[data-tour="firebase-setup"]'
  },
  {
    title: 'Rules Editor',
    content: 'Write your security rules here. The editor provides syntax highlighting and auto-completion.',
    target: '[data-tour="editor"]'
  },
  {
    title: 'Examples & Guide',
    content: 'Browse through pre-made examples and learn from best practices. Click "Use" to try them in the editor.',
    target: '.examples-section'
  },
  {
    title: 'Test Your Rules',
    content: 'After choosing or creating your rules, copy them and paste them into your Firebase Console\'s Rules tab. Then come back here to test them against your Firebase project.',
    target: '[data-tour="test-rules"]'
  }
]

const currentStep = ref(0)
const isVisible = ref(false)
const STORAGE_KEY = 'onboarding_completed'
const highlightedElement = ref<HTMLElement | null>(null)

const closeOnboarding = () => {
  isVisible.value = false
  localStorage.setItem(STORAGE_KEY, 'true')
  removeHighlight()
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  } else {
    closeOnboarding()
  }
}

const startTour = () => {
  isVisible.value = true
  currentStep.value = 0
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const highlightCurrentElement = () => {
  removeHighlight()
  const target = steps[currentStep.value].target
  if (target) {
    const element = document.querySelector(target) as HTMLElement
    if (element) {
      highlightedElement.value = element
      element.classList.add('tour-highlight')
    }
  }
}

const removeHighlight = () => {
  if (highlightedElement.value) {
    highlightedElement.value.classList.remove('tour-highlight')
    highlightedElement.value = null
  }
}

watch(currentStep, highlightCurrentElement)
watch(isVisible, (value) => {
  if (value) {
    highlightCurrentElement()
  } else {
    removeHighlight()
  }
})

onMounted(() => {
  const completed = localStorage.getItem(STORAGE_KEY)
  if (!completed) {
    isVisible.value = true
  }
})

defineExpose({
  startTour
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isVisible" class="fixed inset-0 z-[100]">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" @click="closeOnboarding" />
      
      <!-- Tour Card -->
      <div 
        class="absolute bg-secondary p-6 rounded-lg shadow-xl max-w-md w-full"
        :style="{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-medium">{{ steps[currentStep].title }}</h3>
          <button 
            class="p-1 text-gray-400 hover:text-white transition-colors"
            @click="closeOnboarding"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <p class="text-gray-300 mb-6">
          {{ steps[currentStep].content }}
        </p>
        
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <button 
              v-if="currentStep > 0"
              class="btn btn-outline text-sm"
              @click="prevStep"
            >
              Previous
            </button>
            <button 
              class="btn btn-primary text-sm"
              @click="nextStep"
            >
              {{ currentStep === steps.length - 1 ? 'Finish' : 'Next' }}
            </button>
          </div>
          
          <div class="text-sm text-gray-400">
            {{ currentStep + 1 }} / {{ steps.length }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.tour-highlight {
  position: relative;
  z-index: 60;
  isolation: isolate;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.tour-highlight::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid #646cff;
  border-radius: 8px;
  pointer-events: none;
  z-index: 61;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgb(100 108 255 / 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgb(100 108 255 / 0);
  }
}
</style>
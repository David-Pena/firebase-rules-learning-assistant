<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseStore } from '../stores/useFirebaseStore'
import { testRule } from '../services/firebase/rules'
import type { RuleTestResult } from '../services/firebase/rules'
import { LogIn, LogOut, User, Settings } from 'lucide-vue-next'
import JsonEditor from './JsonEditor.vue'
import { escapeHtml } from '../utils/security'

defineProps<{
  currentRule: string
}>()

const credentials = ref({
  email: '',
  password: ''
})

const { isAuthenticated, signIn, signOut, isInitialized } = useFirebaseStore()
const showAuthForm = ref(false)

const testPath = ref('/users/123')
const operation = ref<'read' | 'write'>('read')
const testResults = ref<RuleTestResult[]>([])
const testData = ref('{\n  "field": "value"\n}')
const jsonError = ref<string | null>(null)
const isLoading = ref(false)

const runTest = async () => {
  isLoading.value = true
  try {
    const parsedData = operation.value === 'write' ? JSON.parse(testData.value) : undefined
    const result = await testRule(
      escapeHtml(testPath.value),
      operation.value,
      parsedData
    )
    testResults.value = [...testResults.value, result]
  } catch (error) {
    testResults.value = [...testResults.value, {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON data',
      operation: operation.value,
      path: testPath.value,
      wasAuthenticated: isAuthenticated.value
    }]
  } finally {
    isLoading.value = false
  }
}

const clearResults = () => {
  testResults.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- Initialization Warning -->
    <div v-if="!isInitialized" class="flex gap-3 p-4 bg-tertiary rounded-lg border border-tertiary">
      <Settings class="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <div>
        <strong class="block text-white mb-1">Firebase Configuration Required</strong>
        <p class="text-sm text-gray-300">Please configure your Firebase project first to test your rules.</p>
      </div>
    </div>

    <!-- Authentication Section -->
    <div class="flex items-center justify-between p-4 bg-tertiary rounded-lg border border-tertiary">
      <div class="flex items-center gap-3">
        <User class="w-4 h-4" :class="isAuthenticated ? 'text-accent' : 'text-gray-500'" />
        <span class="text-sm text-gray-300">
          {{ isAuthenticated ? 'Authenticated' : 'Not Authenticated' }}
        </span>
      </div>
      
      <button
        v-if="!isAuthenticated"
        class="btn btn-outline text-sm flex items-center gap-2"
        @click="showAuthForm = true"
        :disabled="!isInitialized"
      >
        <LogIn class="w-4 h-4" />
        Sign In
      </button>
      <button 
        v-else
        class="btn btn-outline text-sm flex items-center gap-2"
        @click="signOut"
      >
        <LogOut class="w-4 h-4" />
        Sign Out
      </button>
    </div>

    <!-- Auth Form -->
    <div v-if="showAuthForm" class="p-4 bg-tertiary rounded-lg border border-tertiary space-y-4">
      <div class="space-y-2">
        <label for="email" class="text-sm text-gray-300">Email:</label>
        <input 
          id="email"
          v-model="credentials.email"
          type="email"
          placeholder="user@example.com"
          class="w-full px-3 py-2 bg-primary border border-tertiary rounded-lg
                 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
      </div>
      
      <div class="space-y-2">
        <label for="password" class="text-sm text-gray-300">Password:</label>
        <input 
          id="password"
          v-model="credentials.password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-3 py-2 bg-primary border border-tertiary rounded-lg
                 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
      </div>
      
      <div class="flex gap-3">
        <button 
          class="btn btn-primary text-sm"
          @click="async () => {
            await signIn(credentials)
            showAuthForm = false
          }"
          :disabled="!credentials.email || !credentials.password"
        >
          Sign In
        </button>
        <button 
          class="btn btn-outline text-sm"
          @click="showAuthForm = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Test Controls -->
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-2">
          <label for="test-path" class="text-sm text-gray-300">Document Path:</label>
          <input 
            id="test-path"
            v-model="testPath"
            type="text"
            placeholder="/users/123"
            class="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg
                   text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
        </div>
        
        <div class="space-y-2">
          <label class="text-sm text-gray-300">Operation:</label>
          <div class="flex gap-4 mt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="operation"
                value="read"
                class="text-accent focus:ring-accent"
              >
              <span class="text-sm">Read</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="operation"
                value="write"
                class="text-accent focus:ring-accent"
              >
              <span class="text-sm">Write</span>
            </label>
          </div>
        </div>
      </div>
      
      <div v-if="operation === 'write'" class="space-y-2">
        <label class="text-sm text-gray-300">Test Data:</label>
        <JsonEditor
          v-model="testData"
          @error="jsonError = $event"
        />
        <div v-if="jsonError" class="mt-2 text-sm text-error">
          {{ jsonError }}
        </div>
      </div>
      
      <button 
        @click="runTest" 
        class="btn btn-primary"
        :disabled="!!(!isInitialized || isLoading || (operation === 'write' && (jsonError || !testData)))"
      >
        {{ isLoading ? 'Running...' : 'Run Test' }}
      </button>
    </div>

    <!-- Test Results -->
    <div v-if="testResults.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-medium">Test Results</h4>
        <button 
          @click="clearResults" 
          class="btn btn-outline text-sm"
        >
          Clear Results
        </button>
      </div>

      <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        <div 
          v-for="(result, index) in testResults"
          :key="index"
          class="p-4 rounded-lg border"
          :class="result.success ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'"
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="px-2 py-0.5 text-xs font-medium rounded bg-tertiary">
              {{ result.operation.toUpperCase() }}
            </span>
            <span class="text-sm font-mono">{{ result.path }}</span>
            <span 
              class="px-2 py-0.5 text-xs rounded-full"
              :class="result.wasAuthenticated ? 'bg-accent/20 text-accent' : 'bg-gray-500/20 text-gray-400'"
            >
              {{ result.wasAuthenticated ? 'Authenticated' : 'Not Authenticated' }}
            </span>
          </div>

          <div v-if="result.data" class="mt-3 p-3 bg-tertiary rounded-lg">
            <strong class="block text-sm mb-2">
              {{ result.operation === 'read' ? 'Document Data:' : 'Written Data:' }}
            </strong>
            <pre class="text-xs font-mono text-gray-300 whitespace-pre-wrap break-all">{{ JSON.stringify(result.data, null, 2) }}</pre>
          </div>

          <div 
            v-if="result.error" 
            class="mt-3 text-sm"
            :class="result.success ? 'text-success' : 'text-error'"
          >
            {{ result.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFirebaseStore } from '../stores/useFirebaseStore'
import { Check } from 'lucide-vue-next'

const { 
  config,
  isInitialized,
  error,
  updateConfig,
  initializeApp
} = useFirebaseStore()
</script>

<template>
  <div class="space-y-6">
    <div class="p-3 bg-tertiary rounded-lg border-l-4 border-l-accent">
      <p class="text-sm text-gray-300">
        Note: Re-initializing with new project keys will reset the current Firebase session
      </p>
    </div>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <label for="apiKey" class="text-sm text-gray-300">API Key:</label>
        <input 
          id="apiKey"
          :value="config.apiKey"
          @input="e => updateConfig({ apiKey: (e.target as HTMLInputElement).value })"
          type="password"
          placeholder="Your Firebase API Key"
          class="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg
                 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/50
                 placeholder-gray-500"
        >
      </div>
      
      <div class="space-y-2">
        <label for="projectId" class="text-sm text-gray-300">Project ID:</label>
        <input 
          id="projectId"
          :value="config.projectId"
          @input="e => updateConfig({ projectId: (e.target as HTMLInputElement).value })"
          type="text"
          placeholder="your-project-id"
          class="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg
                 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/50
                 placeholder-gray-500"
        >
      </div>
      
      <div class="space-y-2">
        <label for="authDomain" class="text-sm text-gray-300">Auth Domain:</label>
        <input 
          id="authDomain"
          :value="config.authDomain"
          @input="e => updateConfig({ authDomain: (e.target as HTMLInputElement).value })"
          type="text"
          placeholder="your-project-id.firebaseapp.com"
          class="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg
                 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/50
                 placeholder-gray-500"
        >
      </div>
    </div>

    <div class="flex justify-between items-center">
      <button 
        @click="initializeApp"
        class="btn btn-primary"
        :disabled="!config.apiKey || !config.projectId"
      >
        Initialize Firebase
      </button>

      <div 
        v-if="isInitialized" 
        class="flex items-center gap-2 text-sm text-success"
      >
        <Check class="w-4 h-4" />
        Firebase Initialized
      </div>
    </div>

    <div 
      v-if="error" 
      class="p-3 bg-error/20 text-error rounded-lg text-sm"
    >
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RuleExample } from '../types/rules'
import CopyButton from './CopyButton.vue'

const props = defineProps<{
  examples: RuleExample[]
  categories: string[]
  expandedExamples: Set<string>
}>()

const emit = defineEmits<{
  (e: 'toggle-example', name: string): void
  (e: 'use-example', code: string): void
}>()
</script>

<template>
  <div class="examples-section bg-secondary w-[400px] px-8 py-4 overflow-y-auto border-l border-tertiary">
    <h2 class="text-xl font-medium mb-4">Examples & Guide</h2>
    
    <div class="p-3 mb-4 bg-tertiary rounded-lg border-l-4 border-l-accent">
      <p class="text-sm text-gray-300">
        After finding a rule you want to try, copy it and paste it in your Firebase Console's Rules tab.
      </p>
    </div>

    <div class="space-y-8">
      <div v-for="category in categories" :key="category" class="space-y-4">
        <h3 
          class="text-lg font-medium text-accent"
          :id="'category-' + category.toLowerCase().replace(/\s+/g, '-')"
        >
          {{ category }}
        </h3>

        <div 
          v-for="example in examples.filter(ex => ex.category === category)" 
          :key="example.name" 
          class="bg-tertiary rounded-lg border border-tertiary p-4 space-y-3"
        >
          <div class="flex items-center justify-between">
            <h4 class="text-accent">{{ example.name }}</h4>
            <div class="flex items-center gap-2">
              <CopyButton :text="example.code" size="sm" />
              <button 
                @click.stop="emit('use-example', example.code)" 
                class="px-2 py-1 text-sm text-accent border border-accent rounded hover:bg-accent/10 transition-colors"
              >
                Use
              </button>
              <button 
                class="px-3 py-1 text-sm text-accent border border-accent rounded hover:bg-accent/10 transition-colors"
                @click="emit('toggle-example', example.name)"
              >
                {{ expandedExamples.has(example.name) ? '−' : '+' }}
              </button>
            </div>
          </div>

          <p class="text-sm text-gray-300">{{ example.description }}</p>

          <div 
            v-if="expandedExamples.has(example.name)"
            class="pt-3 border-t border-tertiary animate-slideDown"
          >
            <div class="space-y-2">
              <strong class="text-sm text-gray-200">Key Points:</strong>
              <ul class="space-y-2 list-disc list-inside">
                <li 
                  v-for="point in example.explanation" 
                  :key="point"
                  class="text-sm text-gray-300"
                >
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
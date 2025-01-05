<script setup lang="ts">
import type { ExplanationItem } from '../types/rules'

defineProps<{
  terms: Record<string, ExplanationItem[]>
}>()
</script>

<template>
  <div class="mt-4 pt-4 border-t border-tertiary">
    <div v-if="Object.keys(terms).length === 0" class="text-center text-gray-500 py-4 text-sm">
      No Firebase terms found in current rules
    </div>
    
    <div v-for="(categoryTerms, category) in terms" :key="category" class="space-y-4 py-4 first:pt-0 last:pb-0">
      <h4 class="text-accent text-sm font-medium pb-2 border-b border-tertiary">
        {{ category }}
      </h4>
      
      <dl class="space-y-2">
        <div 
          v-for="term in categoryTerms" 
          :key="term.term" 
          class="flex gap-3 py-1.5 border-b border-tertiary/50 last:border-0"
        >
          <dt>
            <code class="min-w-[140px] inline-block px-2 py-1 bg-tertiary rounded text-accent text-xs font-mono">
              {{ term.term }}
            </code>
          </dt>
          <dd class="text-sm text-gray-300 leading-relaxed">
            {{ term.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
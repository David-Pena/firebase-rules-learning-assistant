<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{
  text: string
  size?: 'sm' | 'md'
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <button 
    class="p-1.5 rounded border border-accent text-accent transition-colors hover:bg-accent/10
           disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    :class="{ 'p-1': size === 'sm' }"
    @click="copyToClipboard"
    v-tooltip="copied ? 'Copied!' : 'Copy to clipboard'"
  >
    <Check v-if="copied" class="w-4 h-4" :class="{ 'w-3.5 h-3.5': size === 'sm' }" />
    <Copy v-else class="w-4 h-4" :class="{ 'w-3.5 h-3.5': size === 'sm' }" />
  </button>
</template>
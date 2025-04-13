<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { X } from 'lucide-vue-next'

defineProps<{
  title: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Dialog 
    :open="isOpen" 
    @close="emit('close')"
    class="relative z-50"
  >
    <div class="fixed inset-0 bg-black/75" aria-hidden="true" />
    
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-2xl bg-primary rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-4 border-b border-tertiary">
          <DialogTitle class="text-xl font-medium">{{ title }}</DialogTitle>
          <button 
            class="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-tertiary"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-4">
          <slot />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
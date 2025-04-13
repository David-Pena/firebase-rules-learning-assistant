<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as monaco from 'monaco-editor'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'error', value: string | null): void
}>()

const editorContainer = ref<HTMLElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!editorContainer.value) return

  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: 'json',
    theme: 'vs-dark',
    minimap: { enabled: false },
    automaticLayout: false,
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    roundedSelection: false,
    padding: { top: 8, bottom: 8 },
    scrollbar: {
      useShadows: false,
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  })

  // Set up resize observer for better layout handling
  resizeObserver = new ResizeObserver(() => {
    if (editor) {
      editor.layout()
    }
  })

  if (editorContainer.value) {
    resizeObserver.observe(editorContainer.value)
  }

  // Validate JSON and emit errors
  const validateJson = useDebounceFn(() => {
    try {
      const value = editor?.getValue() || ''
      JSON.parse(value)
      emit('error', null)
    } catch (err) {
      emit('error', err instanceof Error ? err.message : 'Invalid JSON')
    }
  }, 300)

  editor.onDidChangeModelContent(() => {
    const value = editor?.getValue() || ''
    emit('update:modelValue', value)
    validateJson()
  })

  watch(() => props.modelValue, (newValue) => {
    if (editor && newValue !== editor.getValue()) {
      editor.setValue(newValue)
    }
  })
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (editor) {
    editor.dispose()
  }
})
</script>

<template>
  <div 
    ref="editorContainer" 
    class="h-[120px] border border-tertiary rounded-lg overflow-hidden"
  />
</template>
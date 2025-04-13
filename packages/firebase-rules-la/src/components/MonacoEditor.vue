<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  language?: string
  height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorContainer = ref<HTMLElement>()
let editor: any = null
let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  if (!editorContainer.value) return

  const monaco = await import('monaco-editor')

  // Configure Monaco with Firebase Rules support
  const { configureMonaco } = await import('../services/monaco')
  configureMonaco()

  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: 'firebase-rules',
    theme: 'firebase-dark',
    automaticLayout: false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    roundedSelection: false,
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
    nextTick(() => {
      editor?.layout()
    })
  })

  if (editorContainer.value) {
    resizeObserver.observe(editorContainer.value)
  }

  watch(() => props.modelValue, (newValue) => {
    if (editor && newValue !== editor.getValue()) {
      const position = editor.getPosition()
      editor.setValue(newValue)
      position && editor.setPosition(position)
    }
  })

  const onContentChange = useDebounceFn(() => {
    const value = editor?.getValue() || ''
    if (value !== props.modelValue && editor) {
      emit('update:modelValue', value)
    }
  })

  editor.onDidChangeModelContent(() => {
    onContentChange()
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
    class="border border-tertiary rounded-lg overflow-hidden relative"
    :style="{
      height: props.height || '300px',
      minHeight: props.height || '300px'
    }"
  />
</template>
<!-- Monaco Editor Component -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as monaco from 'monaco-editor'
import { useDebounceFn } from '@vueuse/core'
import loader from '@monaco-editor/loader'
import { configureMonaco } from '../services/monaco'

loader.config({ 
  paths: { 
    vs: '/node_modules/monaco-editor/min/vs' 
  },
  'vs/nls': {
    availableLanguages: {}
  }
})

const props = defineProps<{
  modelValue: string
  language?: string
  height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorContainer = ref<HTMLElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!editorContainer.value) return

  // Configure Monaco with Firebase Rules support
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
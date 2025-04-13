<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
import { Sun, Moon } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    v-tooltip="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="!isDark" class="icon" />
    <Moon v-else class="icon" />
  </button>
</template>

<style scoped>
.theme-toggle {
  padding: 8px;
  border-radius: 6px;
  background: transparent;
  color: #646cff;
  border: 1px solid #646cff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: #646cff15;
}

.icon {
  width: 18px;
  height: 18px;
}
</style>
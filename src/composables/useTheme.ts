import { ref, watch } from 'vue'

const isDark = ref(true)

// Initialize theme from system preference
if (typeof window !== 'undefined') {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  watch(isDark, (value) => {
    document.documentElement.classList.toggle('dark', value)
    document.documentElement.classList.toggle('light', !value)
  }, { immediate: true })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
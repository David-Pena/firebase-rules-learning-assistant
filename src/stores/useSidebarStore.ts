import { ref, watch } from 'vue'

const STORAGE_KEY = 'sidebar_state'

// Initialize from storage or default to true
const isSidebarOpen = ref(() => {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? stored === 'true' : true
})

// Persist sidebar state changes
watch(isSidebarOpen, (isOpen) => {
  localStorage.setItem(STORAGE_KEY, isOpen.toString())
})

export function useSidebarStore() {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return {
    isSidebarOpen,
    toggleSidebar
  }
}
import { ref, watch } from 'vue'
import { initializeFirebase } from '../services/firebase/config'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { encryptData, decryptData } from '../utils/encryption'

interface FirebaseConfig {
  apiKey: string
  projectId: string
  authDomain: string
}

const STORAGE_KEY = 'firebase_config'

interface SignInCredentials {
  email: string
  password: string
}

// State
const config = ref<FirebaseConfig>({
  apiKey: '',
  projectId: '',
  authDomain: ''
})

// Initialize config from storage
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored.trim()) {
      decryptData(stored).then(decrypted => {
        if (decrypted) {
          try {
            const parsed = JSON.parse(decrypted)
            if (parsed && typeof parsed === 'object') {
              config.value = parsed
            }
          } catch (e) {
            console.warn('Invalid stored config format')
          }
        }
      }).catch(error => {
        console.error('Failed to decrypt config:', error)
      })
    }
  } catch (error) {
    console.error('Failed to load config:', error)
  }
}
const isInitialized = ref(false)
const isAuthenticated = ref(false)
const error = ref('')

// Persist config changes
watch(config, (newConfig) => {
  const configStr = JSON.stringify(newConfig)
  if (configStr !== '{"apiKey":"","projectId":"","authDomain":""}') {
    encryptData(configStr).then(encrypted => {
      localStorage.setItem(STORAGE_KEY, encrypted)
    }).catch(error => {
      console.error('Failed to encrypt config:', error)
    })
  }
}, { deep: true })

export function useFirebaseStore() {
  const updateConfig = (newConfig: Partial<FirebaseConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  const initializeApp = () => {
    try {
      // If already initialized, sign out first
      if (isInitialized.value) {
        const auth = getAuth()
        auth.signOut()
        isAuthenticated.value = false
      }

      initializeFirebase(config.value)
      const auth = getAuth()
      
      // Set up auth state observer
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = !!user
      })
      
      if (auth.app) {
        isInitialized.value = true
        error.value = ''
      } else {
        throw new Error('Firebase initialization failed')
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to initialize Firebase'
      isInitialized.value = false
    }
  }

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const auth = getAuth()
      if (!auth) throw new Error('Firebase must be initialized before signing in')
      await signInWithEmailAndPassword(auth, email, password)
      isAuthenticated.value = true
      error.value = ''
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sign in'
      isAuthenticated.value = false
    }
  }

  const signOut = async () => {
    try {
      const auth = getAuth()
      if (!auth) throw new Error('Firebase must be initialized before signing out')
      await auth.signOut()
      isAuthenticated.value = false
      error.value = ''
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sign out'
    }
  }

  // Clear config on window unload
  if (typeof window !== 'undefined') {
    window.addEventListener('unload', () => {
      localStorage.removeItem(STORAGE_KEY)
    })
  }

  return {
    config,
    isInitialized,
    isAuthenticated,
    error,
    updateConfig,
    initializeApp,
    signIn,
    signOut
  }
}
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

interface FirebaseConfig {
  apiKey: string
  projectId: string
  authDomain: string
}

let app: FirebaseApp | null = null
let db: ReturnType<typeof getFirestore> | null = null
let auth: ReturnType<typeof getAuth> | null = null

export function initializeFirebase(config: FirebaseConfig) {
  if (!config.apiKey || !config.projectId || !config.authDomain) {
    throw new Error('Firebase configuration is incomplete')
  }

  app = initializeApp(config)
  db = getFirestore(app)
  auth = getAuth(app)

  return { app, db, auth }
}

export function getFirebaseApp() {
  if (!app) throw new Error('Firebase has not been initialized')
  return app
}

export function getFirestoreDb() {
  if (!db) throw new Error('Firestore has not been initialized')
  return db
}

export function getFirebaseAuth() {
  if (!auth) throw new Error('Firebase Auth has not been initialized')
  return auth
}
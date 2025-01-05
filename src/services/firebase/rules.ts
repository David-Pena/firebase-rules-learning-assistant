import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirestoreDb } from './config'
import { getAuth } from 'firebase/auth'

export interface RuleTestResult {
  success: boolean
  error?: string
  operation: 'read' | 'write'
  path: string,
  data?: unknown,
  wasAuthenticated: boolean
}

export async function testRule(
  path: string, 
  operation: 'read' | 'write',
  testData?: unknown
): Promise<RuleTestResult> {
  try {
    const db = getFirestoreDb()
    const docRef = doc(db, path)
    const auth = getAuth()
    const isUserAuthenticated = !!auth.currentUser
    
    let data: unknown

    if (operation === 'read') {
      const snapshot = await getDoc(docRef)
      data = snapshot.data()
    } else {
      if (!testData) {
        throw new Error('Test data is required for write operations')
      }
      await setDoc(docRef, testData)
      data = testData
    }

    return {
      success: true,
      operation,
      path,
      data,
      wasAuthenticated: isUserAuthenticated
    }

  } catch (error) {
    // Handle Firebase permission errors specifically
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isPermissionError = errorMessage.includes('permission-denied')

    return {
      success: false,
      error: isPermissionError ? 
        'Permission denied by security rules' : 
        `Operation failed: ${errorMessage}`,
      operation,
      path,
      wasAuthenticated: !!getAuth()?.currentUser
    }
  }
}
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import type { RuleTestResult } from '../../types/rules'
import { getFirestoreDb } from './config'

export async function testRule(
  path: string, 
  operation: 'read' | 'write',
  testData?: unknown
): Promise<RuleTestResult> {
  try {
    const db = getFirestoreDb()
    const docRef = doc(db, path)
    
    if (operation === 'read') {
      await getDoc(docRef)
      return {
        success: true,
        operation,
        path
      }
    } else {
      await setDoc(docRef, testData || { timestamp: Date.now() })
      return {
        success: true,
        operation,
        path
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      operation,
      path
    }
  }
}
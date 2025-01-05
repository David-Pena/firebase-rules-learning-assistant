import * as monaco from 'monaco-editor'

export interface ValidationError {
  message: string
  line?: number
  column?: number
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

function validateServiceDeclaration(code: string): ValidationError[] {
  const errors: ValidationError[] = []
  if (!code.includes('service cloud.firestore')) {
    errors.push({
      message: 'Missing service declaration. Must start with "service cloud.firestore"',
      severity: 'error'
    })
  }
  return errors
}

function validateMatchBlock(code: string): ValidationError[] {
  const errors: ValidationError[] = []
  if (!code.includes('match /databases/{database}/documents')) {
    errors.push({
      message: 'Missing root match block. Must include "match /databases/{database}/documents"',
      severity: 'error'
    })
  }
  return errors
}

function validateBraces(code: string): ValidationError[] {
  const errors: ValidationError[] = []
  const openBraces = (code.match(/{/g) || []).length
  const closeBraces = (code.match(/}/g) || []).length

  if (openBraces !== closeBraces) {
    errors.push({
      message: `Mismatched braces: ${openBraces} opening vs ${closeBraces} closing braces`,
      severity: 'error'
    })
  }
  return errors
}

function validateAllowStatements(code: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = code.split('\n')
  
  lines.forEach((line, index) => {
    if (line.includes('allow') && !line.includes('if')) {
      errors.push({
        message: 'Allow statement missing condition (if clause)',
        line: index + 1,
        severity: 'error'
      })
    }
  })

  return errors
}

/**
 * Validates Firebase Cloud Firestore security rules
 * @param code The rules code to validate
 * @returns ValidationResult with detailed error information
 */
export function validateRules(code: string): ValidationResult {
  try {
    const errors: ValidationError[] = [
      ...validateServiceDeclaration(code),
      ...validateMatchBlock(code),
      ...validateBraces(code),
      ...validateAllowStatements(code)
    ]

    return {
      isValid: errors.length === 0,
      errors
    }
  } catch (error) {
    return {
      isValid: false,
      errors: [{
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        severity: 'error'
      }]
    }
  }
}
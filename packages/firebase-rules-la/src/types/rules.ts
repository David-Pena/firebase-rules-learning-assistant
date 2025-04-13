export interface RuleExample {
  name: string
  category: string
  description: string
  explanation: string[]
  code: string
}

export interface ExplanationItem {
  term: string
  description: string
}

export interface RuleTestResult {
  success: boolean
  error?: string
  operation: 'read' | 'write'
  path: string
}
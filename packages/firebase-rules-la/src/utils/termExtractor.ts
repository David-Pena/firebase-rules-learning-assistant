import { firebaseTerms } from '../data/ruleExamples'
import type { ExplanationItem } from '../types/rules'

export function extractRelevantTerms(code: string): Record<string, ExplanationItem[]> {
  const relevantTerms: Record<string, ExplanationItem[]> = {}
  
  // Helper function to clean and normalize terms for comparison
  const normalizeCode = (code: string) => {
    return code.replace(/\/\/.*/g, '') // Remove comments
               .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
               .toLowerCase()
  }

  const normalizedCode = normalizeCode(code)
  
  // Iterate through all terms categories
  Object.entries(firebaseTerms).forEach(([category, terms]) => {
    // Find terms that appear in the code
    const matchedTerms = terms.filter(term => {
      // Create a regex that matches the term as a whole word
      const termPattern = term.term.toLowerCase().replace(/\./g, '\\.')
      const regex = new RegExp(`\\b${termPattern}\\b`, 'g')
      return regex.test(normalizedCode)
    })
    
    // Only add category if it has matching terms
    if (matchedTerms.length > 0) {
      relevantTerms[category] = matchedTerms
    }
  })
  
  return relevantTerms
}
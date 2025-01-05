import { registerFirebaseRules } from './firebaseRules'
import * as monaco from 'monaco-editor'

// Configure Monaco editor with Firebase Rules support
export function configureMonaco() {
  // Register Firebase Rules language
  registerFirebaseRules()

  // Configure editor defaults
  monaco.editor.defineTheme('firebase-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'CF6BDD' },       // service, match, allow
      { token: 'type.identifier', foreground: '4EC9B0' }, // request, resource
      { token: 'variable.predefined', foreground: '569CD6' }, // $variables
      { token: 'operator', foreground: 'D4D4D4' },      // ==, !=, &&
      { token: 'string', foreground: 'CE9178' },        // string literals
      { token: 'number', foreground: 'B5CEA8' },        // numbers
      { token: 'comment', foreground: '6A9955' }        // comments
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4',
      'editorLineNumber.foreground': '#858585',
      'editorCursor.foreground': '#A6A6A6',
      'editor.selectionBackground': '#264F78',
      'editor.inactiveSelectionBackground': '#3A3D41'
    }
  })

  // Set firebase-rules as the default language
  monaco.editor.setTheme('firebase-dark')
}
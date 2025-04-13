import * as monaco from 'monaco-editor'

// Firebase Rules Keywords
const keywords = [
  'service', 'cloud.firestore', 'match', 'allow',
  'if', 'exists', 'get', 'getAfter',
  'read', 'write', 'create', 'update', 'delete',
  'function', 'return', 'true', 'false', 'null',
  'is', 'keys', 'hasAll', 'hasAny'
]

// Firebase Rules Built-in Objects
const builtins = [
  'request', 'resource', 'auth', 'path', 'time'
]

// Register Firebase Rules as a new language
export function registerFirebaseRules() {
  monaco.languages.register({ id: 'firebase-rules' })

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('firebase-rules', {
    keywords,
    builtins,
    
    tokenizer: {
      root: [
        // Keywords
        [/\b(?:service|cloud\.firestore|match|allow|if|function|return)\b/, 'keyword'],
        
        // Built-in objects and functions
        [/\b(?:request|resource|auth|path|time)\b/, 'type.identifier'],
        
        // Wildcards (e.g., $uid)
        [/\$[a-zA-Z]\w*\b/, 'variable.predefined'],
        
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        
        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
        
        // Operators
        [/[!<>=]=?/, 'operator'],
        [/&&|\|\|/, 'operator'],
        
        // Identifiers
        [/[a-zA-Z_]\w*/, {
          cases: {
            '@keywords': 'keyword',
            '@builtins': 'type.identifier',
            '@default': 'identifier'
          }
        }],
        
        // Whitespace
        [/[ \t\r\n]+/, 'white'],
        
        // Comments
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],
      
      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],
      
      string_double: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],
      
      string_single: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop']
      ]
    }
  })

  // Register a completion item provider for the language
  monaco.languages.registerCompletionItemProvider('firebase-rules', {
    provideCompletionItems: (
      model: monaco.editor.ITextModel,
      position: monaco.Position
    ) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
      
      const suggestions = [
        ...keywords.map(keyword => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range
        })),
        ...builtins.map(builtin => ({
          label: builtin,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: builtin,
          range
        })),
        // Common snippets
        {
          label: 'match-rule',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'match /${1:path}/{${2:documentId}} {',
            '  allow read: if ${3:true};',
            '  allow write: if ${4:false};',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Basic match rule template',
          range
        },
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'function ${1:name}(${2:params}) {',
            '  return ${3:true};',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Function declaration template',
          range
        }
      ]

      return { suggestions }
    }
  })
}
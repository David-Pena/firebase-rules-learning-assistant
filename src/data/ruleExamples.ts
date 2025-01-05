import type { RuleExample } from '../types/rules'

interface ExplanationItem {
  term: string
  description: string
}

export const firebaseTerms: Record<string, ExplanationItem[]> = {
  'Basic Security': [
    {
      term: 'auth',
      description: 'Represents the authenticated user. Access via request.auth'
    },
    {
      term: 'auth.uid',
      description: 'The unique ID of the authenticated user, useful for matching user-specific data.'
    },
    {
      term: 'request.auth.token',
      description: 'Contains custom claims like admin status or user roles set through Firebase Admin SDK.'
    },
    {
      term: 'request.auth',
      description: 'The authentication information for the current request'
    }
  ],
  'User Management': [
    {
      term: '$uid',
      description: 'A wildcard variable that matches any user ID in the path, letting you write dynamic rules.'
    },
    {
      term: 'auth.uid === $uid',
      description: 'Checks if the authenticated user is accessing their own data.'
    },
    {
      term: 'request.resource.data',
      description: 'The new data being written in a write operation'
    }
  ],
  'Advanced': [
    {
      term: 'data',
      description: 'Represents the existing data in the database at the location being accessed.'
    },
    {
      term: 'resource.data',
      description: 'The current data stored at this location'
    },
    {
      term: 'request.resource',
      description: 'Represents what the data would look like after the write operation.'
    },
    {
      term: 'data.exists()',
      description: 'Checks if data exists at the current location before the operation.'
    },
    {
      term: 'resource',
      description: 'The document being accessed'
    },
    {
      term: 'now',
      description: 'The current timestamp in milliseconds, useful for time-based rules.'
    }
  ]
}

export const ruleExamples: RuleExample[] = [
  // Basic Security Examples
  {
    name: 'Basic Authentication',
    category: 'Basic Security',
    description: 'Requires users to be logged in to read or write any data. Uses auth != null to check if a user is authenticated.',
    explanation: [
      'request.auth != null - Checks if user is logged in',
      'Applies to all paths in the database',
      'Basic form of authentication check'
    ],
    code: `service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`
  },
  {
    name: 'Admin Only',
    category: 'Basic Security',
    description: 'Only allows admin users to write data while letting any authenticated user read.',
    explanation: [
      'request.auth.token.admin - Custom claim set through Firebase Admin SDK',
      'Requires special setup in your backend',
      'Great for admin dashboards'
    ],
    code: `service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}`
  },
  // User Data Examples
  {
    name: 'User Data',
    category: 'User Management',
    description: 'Creates a secure user data structure where each user can only access their own data.',
    explanation: [
      '$uid - Matches the user\'s unique ID in the path',
      'Perfect for user profiles and personal data',
      'Prevents users from accessing others\' data'
    ],
    code: `service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /private/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}`
  },
  // Advanced Examples
  {
    name: 'Data Validation',
    category: 'Advanced',
    description: 'Ensures data meets specific requirements before being written to the database.',
    explanation: [
      'request.resource.data - Accessing the incoming data',
      'resource.data - Accessing existing data',
      'Prevents malformed data'
    ],
    code: `service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.keys().hasAll(['title', 'content', 'authorId'])
        && request.resource.data.title is string
        && request.resource.data.content is string
        && request.resource.data.authorId == request.auth.uid;
      
      allow update: if request.auth != null
        && request.auth.uid == resource.data.authorId;
      
    }
  }
}`
  },
  {
    name: 'Rate Limiting',
    category: 'Advanced',
    description: 'Prevents spam by limiting how often a user can make requests.',
    explanation: [
      'now - Current timestamp in milliseconds',
      'request.time - Server timestamp',
      'Useful for API-like endpoints'
    ],
    code: `service cloud.firestore {
  match /databases/{database}/documents {
    match /requests/{userId} {
      allow create: if request.auth != null 
        && request.auth.uid == userId;
      
      allow update: if request.auth != null 
        && request.auth.uid == userId
        && (!resource.data.keys().hasAll(['lastRequest']) 
            || request.time.toMillis() - resource.data.lastRequest.toMillis() > 1000);
      
    }
  }
}`
  }
]
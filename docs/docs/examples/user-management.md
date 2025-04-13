# User Management

Learn how to implement user-specific security rules.

### User Data Access

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

This rule:

- Restricts access to read/write user's own data
- Uses dynamic path matching
- Compares current user IDs for verification

### Profile Management

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

This rule:

- Public profile reading
- Private profile writing
- User-specific access control

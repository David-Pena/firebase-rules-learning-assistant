# Basic Security

Learn fundamental Firebase security rules patterns.

### Basic Authentication

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This rule:

- Requires users to be logged in to read/write
- Grants access to all documents
- Uses `request.auth` to check if the user is authenticated

### Admin Only Access

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow admin users to write
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

This rule:

- Separates read/write permissions
- Check custom claims for admin access
- All authenticated users can read

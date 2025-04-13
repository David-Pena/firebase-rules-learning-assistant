# Advanced Rules

Explore complex security patterns and advanced features.

### Custom Functions

```js
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth.token.admin == true;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isAdmin();
    }
  }
}
```

This rule:

- Declares reusable functions `isAdmin` and `isOwner`
- Is clearer and It's easier to maintain

### Complex Validation

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.auth != null
        && request.resource.data.items is list
        && request.resource.data.items.size() > 0
        && request.resource.data.total is number
        && request.resource.data.total > 0
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

This rule has:

- List validation
- Numeric constraints
- Multiple conditions

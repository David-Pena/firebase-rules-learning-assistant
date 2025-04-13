# Data Validation

Learn how to validate data before it's written to Firestore.

### Basic Validation

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow write: if request.auth != null
        && request.resource.data.title is string
        && request.resource.data.title.size() > 0
        && request.resource.data.title.size() <= 100;
    }
  }
}
```

This rule ensures property `title` from the written data:

- Is a string
- Is not empty
- Is not too long

### Advanced Validation

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow write: if request.auth != null
        && request.resource.data.email is string
        && request.resource.data.email.matches('^[^@]+@[^@]+\\.[^@]+$')
        && request.resource.data.age is number
        && request.resource.data.age >= 18;
    }
  }
}
```

This rule:

- validates `email` format
- `age` is a number and greater than `18`

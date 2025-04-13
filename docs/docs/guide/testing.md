# Firebase Rules Testing

This feature allows users to validate their Cloud Firestore rules by executing read and write operations againts their project.

## Prerequisites

1. Configured Firebase project
2. Valid security rules
3. Firebase Authentication enabled (Email/Password)

## Usage Example

:::warning Note
Make sure you [updated your rules](/guide/rules-update) on Firebase.

All test operations are performed againts your actual [Firebase project](/guide/setup). Make sure to use test data and paths that won't affect production data.
:::

1. Click the test tube icon (🧪)
2. Sign in or out depending on the rule you want to try out
3. Enter document path to test
4. Select operation type (read/write)
5. Click **Run Test** to see results

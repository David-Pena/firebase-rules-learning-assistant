# Firestore Rules Learning Assistant

An interactive learning tool designed to help developers understand, learn, and experiment with Firebase Security Rules for Cloud Firestore. This educational platform provides real-time explanations, practical examples, and interactive testing to make learning Firestore security rules more accessible and intuitive.

## Features

- 📚 **Learn by Example**: Browse through categorized, real-world security rule examples with detailed explanations
- 🔍 **Interactive Term Reference**: Get instant explanations of Firebase security rule terms and concepts as you type
- ✨ **Smart Syntax Highlighting**: Clearly see and understand different parts of security rules with custom highlighting
- 🧪 **Live Testing**: Test your understanding by trying rules against your Firebase project
- 🎓 **Guided Learning**: Step-by-step tour introducing key concepts and features
- 🔒 **Secure Testing**: Your Firebase configuration is encrypted using AES-GCM via the Web Crypto API

## Getting Started

1. **Firebase Setup**
   - Click the Settings icon (⚙️) in the header
   - Enter your Firebase project credentials:
     - API Key
     - Project ID
     - Auth Domain
   - Your credentials are securely encrypted using AES-GCM via the Web Crypto API

2. **Learning the Rules**
   - Browse the Examples & Guide section to understand different security patterns
   - Each example includes:
     - Clear explanation of the security concept
     - Detailed breakdown of how the rule works
     - Key points highlighting important aspects
   - Click "Use" on any example to experiment with it in the editor

3. **Testing Rules**
   - Copy your rules and paste them into your Firebase Console's Rules tab
   - Apply the rules in your Firebase Console
   - Return to the Firestore Rules Helper
   - Click the Test tube icon (🧪) to open the testing panel
   - Sign in with your Firebase credentials
   - Test read/write operations against your actual Firebase project

## Interactive Tour

The application includes an educational tour that guides you through learning Firestore security rules:

1. **Welcome**
   - Introduction to the learning platform
   - Overview of how to use the tool for learning

2. **Firebase Setup**
   - Location of the Firebase configuration panel
   - Required credentials explanation
   - Security features overview

3. **Learning Environment**
   - Introduction to the interactive editor
   - Syntax highlighting and auto-completion features
   - Term reference and documentation features

4. **Examples & Guide**
   - How to browse and understand example rules
   - Understanding security patterns and concepts
   - Learning from practical examples

5. **Rule Testing**
   - How to verify your understanding
   - Testing different security scenarios
   - Experimenting with rule variations

## Security Features

- **Credential Encryption**: Firebase configuration is encrypted using the Web Crypto API with AES-GCM
- **Automatic Cleanup**: Stored credentials are automatically cleared on window unload
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Secure Authentication**: Email/password authentication with proper state management
- **HTTPS Only**: Application requires HTTPS for production deployments

## Technical Stack

- Vue 3 with Composition API
- TypeScript for type safety
- Tailwind CSS for styling
- Monaco Editor for code editing
- HeadlessUI for accessible components
- Web Crypto API for encryption
- Firebase SDK for authentication and testing

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created by [Unans](https://davidpena.dev) with [Bolt](https://bolt.new)
# Security Policy

## Supported Versions

We currently provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly** until it has been addressed by our team.

2. **Submit a report** by emailing security@davidpena.dev with the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (if available)

3. **Expect a response** within 48 hours acknowledging your report.

4. **Follow up** if you don't receive a response within 48 hours.

## Security Measures

The Firebase Rules Learning Assistant implements several security measures:

- **Credential Encryption**: All Firebase credentials are encrypted using AES-GCM via the Web Crypto API
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Secure Authentication**: Proper state management for authentication
- **HTTPS Enforcement**: Strict HTTPS requirements for all connections
- **Regular Security Audits**: Periodic code reviews and security assessments

## Security Features

- **Firebase Configuration Encryption**
  - Credentials are encrypted at rest
  - Automatic cleanup on window unload
  - No credentials stored in plain text

- **Authentication Security**
  - Secure token management
  - Proper session handling
  - Protected routes

- **Data Protection**
  - Input validation
  - Output encoding
  - CSRF protection

## Responsible Disclosure

We follow a responsible disclosure policy:

1. We will acknowledge receipt of your vulnerability report
2. We will provide a timeline for addressing the vulnerability
3. We will notify you when the vulnerability is fixed
4. We will publicly acknowledge your responsible disclosure (if you wish)

## Security Updates

Security updates are released as patches to the current version. We recommend:

- Keeping your dependencies up to date
- Regularly checking for security updates
- Following security best practices in your implementation

## Contact

For security-related issues, please contact:
- Email: security@davidpena.dev
- PGP Key: [Available upon request] 
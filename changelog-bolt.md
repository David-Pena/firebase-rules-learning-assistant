# Changelog

## [0.1.0] - 2024-03-18

### Added
- Created changelog to track project changes
- Added proper Monaco editor resize handling
- Improved scrolling behavior for editor section

## [0.1.1] - 2024-03-18

### Fixed
- Added missing `service cloud.firestore` declaration to all rule examples
- Removed unnecessary `rules_version` declarations
- Fixed indentation in rule examples

### Changed
- Updated rule examples to use valid Firebase security rules
- Enhanced term extraction logic to catch more keywords
- Adjusted editor layout and dimensions

## [0.1.1] - 2024-03-18

### Added
- Firebase configuration component for API keys
- Anonymous authentication support
- Status indicators for Firebase initialization and auth
- Improved Firebase service configuration

### Fixed
- Monaco editor syntax highlighting persistence
- Glossary term detection improvements
- Firebase rules examples validation
- Editor section scrolling issues

## [0.1.2] - 2024-03-18

### Removed
- Firebase emulator support and related code
- Emulator configuration from firebase.json

### Changed
- Simplified Firebase configuration service
- Improved Firebase initialization error handling

## [0.1.3] - 2024-03-18

### Added
- Enhanced button styling and interactions

### Fixed
- Scrolling issues in editor section
- Modal overlay click handling

## [0.1.5] - 2024-03-18

## [0.1.6] - 2024-03-18

### Changed
- Switched from anonymous to email/password authentication
- Improved Firebase initialization validation
- Enhanced error handling for invalid configurations

### Added
- Email and password input fields for authentication
- Better validation of Firebase configuration
- More detailed error messages

### Fixed
- Firebase initialization now properly validates configuration
- Authentication state management improvements
- Fixed type error in RuleTester when displaying operation type

### Added
- Firebase configuration persistence using localStorage
- New Firebase store for state management
- Automatic config restoration on page load

### Changed
- Refactored Firebase setup component to use store
- Improved Firebase initialization flow

### Fixed
- Firebase configuration persistence across page reloads
- Input handling in Firebase setup form

## [0.1.7] - 2024-03-18

### Added
- Implemented Firebase rule testing functionality
- Direct read/write operations testing against Firebase project
- Improved error handling for permission-denied cases

### Changed
- Removed emulator-related testing code
- Enhanced test results display

## [0.1.8] - 2024-03-18

### Added
- Loading state for test operations
- Display of read/write data in test results
- Better error handling for invalid JSON

### Changed
- Improved test results UI
- Enhanced data visualization for operations

### Fixed
- JSON parsing error handling
- Button disabled state during loading

## [0.1.9] - 2024-03-18

### Changed
- Moved authentication from Firebase Setup to Rule Tester
- Enhanced authentication UI with sign-in/out capabilities
- Added authentication state indicator for test results

### Added
- Sign out functionality
- Authentication status display
- Per-test authentication state tracking

### Fixed
- Improved error handling for auth operations
- Better state management for auth status

## [0.1.10] - 2024-03-18

### Fixed
- Added missing getAuth import in rules service
- Fixed authentication state checking in rule testing

## [0.1.11] - 2024-03-18

### Fixed
- Added proper auth state observer using onAuthStateChanged
- Improved authentication state tracking in rule testing

## [0.1.12] - 2024-03-18

### Changed
- Simplified theme to dark-only mode
- Improved Firebase configuration UX with better feedback

## [0.1.13] - 2024-03-18

### Changed
- Fixed white backgrounds by enforcing dark theme
- Removed light theme CSS variables
- Improved button and background contrast
- Simplified color scheme to dark-only mode

### Removed
- Light theme media queries and related styles
- Color scheme switching functionality

## [0.1.14] - 2024-03-18

### Changed
- Simplified Firebase Configuration UI
- Removed redundant title and containers
- Improved visual hierarchy and spacing
- Enhanced status indicator visibility

## [0.1.15] - 2024-03-18

### Added
- Firebase profiles management
- Profile selection and persistence
- Multiple Firebase project support

### Changed
- Refactored Firebase configuration to use profiles
- Improved Firebase initialization UX
- Enhanced configuration UI with profile management

### Fixed
- Firebase configuration persistence
- Profile switching behavior

## [0.1.16] - 2024-03-18

### Fixed
- Profiles store initialization error
- White backgrounds in dark theme
- Unnecessary containers and padding in Firebase setup
- Removed gap between editor and glossary

### Changed
- Improved form handling in Firebase setup
- Enhanced dark theme consistency
- Simplified component structure

## [0.1.22] - 2024-03-18

### Added
- Tailwind CSS integration
- HeadlessUI for Vue components
- New utility classes for buttons and tooltips

### Changed
- Migrated Footer component to Tailwind CSS
- Migrated Header component to Tailwind CSS
- Improved responsive design
 - Enhanced component styling with Tailwind utilities

## [0.1.23] - 2024-03-18

### Changed
- Migrated Modal component to use HeadlessUI Dialog
- Enhanced modal accessibility and transitions
- Improved modal styling with Tailwind

### Added
- HeadlessUI Dialog components for better accessibility
- Improved focus management in modals
- Better keyboard navigation support

## [0.1.24] - 2024-03-18

### Changed
- Migrated Firebase Setup component to Tailwind CSS
- Enhanced form field styling and interactions
- Improved visual feedback for initialization status

### Added
- Better input focus states with ring effects
- Improved error message styling
- Enhanced note visibility with accent border

## [0.1.25] - 2024-03-18

### Changed
- Migrated RuleTester component to Tailwind CSS
- Enhanced form field styling with proper borders and focus states
- Improved test results visualization

### Added
- Better authentication form styling
- Enhanced JSON editor integration
- Improved status indicators and error messages

## [0.1.26] - 2024-03-18

### Changed
- Migrated ExamplesList component to Tailwind CSS
- Enhanced example cards with better spacing and borders
- Improved animation for expanding examples

### Added
- Custom animation for expanding examples
- Better visual hierarchy for categories
- Enhanced button interactions

## [0.1.27] - 2024-03-18

### Changed
- Migrated CopyButton component to Tailwind CSS
- Improved button sizing and spacing
- Enhanced copy feedback animation

## [0.1.28] - 2024-03-18

### Changed
- Migrated TermsReference component to Tailwind CSS
- Enhanced terms list styling and spacing
- Improved code block visibility

## [0.1.29] - 2024-03-18

### Changed
- Added vertical padding to terms categories
- Improved spacing between categories
- Enhanced visual separation of terms sections

## [0.1.30] - 2024-03-18

### Changed
- Migrated MonacoEditor component to Tailwind CSS
- Added proper resize handling with ResizeObserver
- Added configurable height prop

### Fixed
- Editor layout issues on container resize
- Improved editor cleanup on unmount

## [0.1.31] - 2024-03-18

### Changed
- Migrated JsonEditor component to Tailwind CSS
- Added ResizeObserver for better layout handling
- Improved editor cleanup on unmount

### Fixed
- JSON editor resize handling
- Memory leaks from Monaco editor instances

## [0.1.32] - 2024-03-18

### Fixed
- Added missing template section to JsonEditor component
- Improved JsonEditor formatting and structure

## [0.1.17] - 2024-03-18

### Changed
- Improved Test Rules modal UI
- Simplified layout and spacing
- Enhanced visual hierarchy
- Better organization of test controls and results
- Cleaner authentication section

## [0.1.18] - 2024-03-18

### Changed
- Updated header button tooltips to be more descriptive
- Added note about copying rules to Firebase Console

## [0.1.19] - 2024-03-18

### Added
- Monaco editor for JSON input in rule tester
- JSON validation with error feedback
- HTML and JSON sanitization utilities

### Security
- Added HTML escaping for user inputs
- Added JSON sanitization for test data

## [0.1.20] - 2024-03-18

### Added
- Firebase initialization warning in Rule Tester
- Better status indicators for Firebase configuration state
- Disabled state for actions requiring Firebase initialization

### Changed
- Improved user feedback when Firebase configuration is needed
- Enhanced error handling for uninitialized Firebase state

## [0.1.21] - 2024-03-18

### Added
- Footer component with AI manifesto and project links
- Support button linking to Stripe
- Credits section with links to creator and Bolt

### Changed
- Adjusted main content height to accommodate footer
- Enhanced layout spacing and visual hierarchy

## [0.1.33] - 2024-03-18

### Added
- Vue Router for navigation
- AI manifesto page
- Router link in footer to AI manifesto

### Changed
- Updated footer text with AI usage link
- Added typography plugin for better prose styling
- Enhanced manifesto page layout and styling

## [0.1.34] - 2024-03-18

### Fixed
- Added missing Tailwind typography plugin
- Fixed duplicate theme configuration in Tailwind config
- Improved prose styling for AI manifesto page

## [0.1.35] - 2024-03-18

### Added
- Collapsible sidebar for Examples & Guide section
- Smooth transition animations for sidebar
- Mobile-friendly toggle button
- Responsive layout improvements

### Changed
- Made editor section responsive to sidebar state
- Enhanced header with sidebar toggle button
- Improved mobile experience with floating action button

## [0.1.36] - 2024-03-18

### Fixed
- Enhanced tooltip positioning with fixed offset
- Increased tooltip z-index to ensure visibility
- Improved tooltip transition animation
- Fixed tooltip clipping issues

## [0.1.37] - 2024-03-18

### Changed
- Moved tooltips from top to bottom position
- Improved tooltip visibility and positioning

### Security
- Added encryption for stored Firebase credentials
- Implemented automatic credential cleanup
- Enhanced data protection with Web Crypto API

## [0.1.40] - 2024-03-18

### Fixed
- Added base64 validation for encrypted data
- Improved error handling in encryption/decryption
- Better handling of empty or invalid stored configs
- Prevented storing empty configurations

## [0.1.41] - 2024-03-18

### Added
- Sidebar state persistence using localStorage
- New sidebar store for state management

### Changed
- Moved sidebar logic to dedicated store
- Improved sidebar toggle handling

## [0.1.42] - 2024-03-18

## [0.1.43] - 2024-03-18

### Added
- Manual tour trigger button in header
- Visual highlighting for tour targets
- Pulse animation for highlighted elements

### Changed
- Enhanced tour with element highlighting
- Improved tour accessibility and visibility
- Added ref-based tour control
### Added
- Onboarding tour for new users
- Step-by-step guide through main features
- Tour persistence using localStorage

### Changed
- Added tour targets to key UI elements
- Enhanced component accessibility with data attributes
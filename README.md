# Firebase Authentication & Vite Project

A modern web application built with Firebase Authentication, Vite, and vanilla JavaScript. This project provides a complete authentication system with protected pages and seamless user experience.

## 🚀 Features

- **Firebase Authentication** - Complete auth system with login/signup
- **Protected Pages** - Auth-guarded routes with automatic redirects
- **Multi-page Application** - Built with Vite for optimal performance
- **Responsive Design** - Modern UI with CSS styling
- **Firestore Integration** - Ready for database operations
- **Hot Module Replacement** - Fast development with Vite

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- A Firebase project set up at [Firebase Console](https://console.firebase.google.com)
- Firebase CLI installed globally: `npm install -g firebase-tools`

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd firebase-deploy
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Firebase Environment Variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and update with your Firebase project configuration:
     ```bash
     # Get these values from Firebase Console > Project Settings > General tab
     VITE_FIREBASE_API_KEY=your_api_key_here
     VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
     VITE_FIREBASE_APP_ID=your_app_id_here
     VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
     ```
   - Enable Authentication in Firebase Console
   - Configure sign-in methods (Email/Password, etc.)

4. **Login to Firebase CLI:**
   ```bash
   firebase login
   ```

5. **Initialize Firebase in your project (if not done):**
   ```bash
   firebase init
   ```

## 🏃‍♂️ Local Development

### Start Development Server
```bash
pnpm dev
# or
npm run dev
```

The development server will start at `http://localhost:5173`

### Test Authentication Flow
1. Visit `http://localhost:5173` (redirects to login)
2. Create a new account via signup page
3. Login with your credentials
4. Access protected pages

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

## 🔐 Adding New Pages

### 1. Create the HTML File

Create a new HTML file in the root directory (e.g., `dashboard.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Your App</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>
    <div id="app">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <button id="logoutBtn">Logout</button>
    </div>
    <script type="module" src="/src/dashboard.js"></script>
</body>
</html>
```

### 2. Create the JavaScript Module

Create a corresponding JS file in `src/` directory (e.g., `src/dashboard.js`):

```javascript
import { auth } from './firebase_config.js';
import { signOut } from 'firebase/auth';
import { requireAuth } from './auth-guard.js';

// Initialize page functionality after authentication
function initializePage(user) {
    console.log('Dashboard initialized for user:', user.email);
    
    // Your page-specific logic here
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = 'login.html';
    });
}

// Protect the page - redirect to login if not authenticated
requireAuth(initializePage);
```

### 3. Automatic Build Configuration

The Vite configuration automatically detects all `.html` files in the root directory and includes them in the build. No additional configuration needed!

## 🛡️ Protecting Pages

### Method 1: Full Page Protection (Recommended)

Use `requireAuth()` for pages that require authentication:

```javascript
import { requireAuth } from './auth-guard.js';

function initializePage(user) {
    // This code only runs if user is authenticated
    console.log('User is authenticated:', user.email);
    // Initialize your page functionality here
}

// Protect the entire page
requireAuth(initializePage);
```

### Method 2: Conditional Protection

For pages with both public and private content:

```javascript
import { auth } from './firebase_config.js';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Show authenticated content
        document.getElementById('authenticated-content').style.display = 'block';
        document.getElementById('public-content').style.display = 'none';
    } else {
        // Show public content
        document.getElementById('authenticated-content').style.display = 'none';
        document.getElementById('public-content').style.display = 'block';
    }
});
```

### Method 3: Redirect Already Authenticated Users

Use on login/signup pages to redirect already logged-in users:

```javascript
import { redirectIfAuthenticated } from './auth-guard.js';

// Redirect to home if already authenticated
redirectIfAuthenticated('home.html');

// Your login/signup logic here...
```

## 🏗️ Building for Production

### 1. Build the Project
```bash
pnpm build
# or
npm run build
```

This creates an optimized build in the `dist/` directory.

### 2. Preview Production Build (Optional)
```bash
pnpm preview
# or
npm run preview
```

## 🚀 Deployment

### Deploy to Firebase Hosting

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

3. **Deploy only hosting (faster):**
   ```bash
   firebase deploy --only hosting
   ```

4. **Deploy with custom message:**
   ```bash
   firebase deploy -m "Your deployment message"
   ```

### Deploy to Other Platforms

The `dist/` folder can be deployed to any static hosting service:

- **Vercel:** Connect your repo and set build command to `pnpm build`
- **Netlify:** Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages:** Use GitHub Actions to build and deploy

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication Flow:**
   - [ ] Signup with new email
   - [ ] Login with valid credentials
   - [ ] Login with invalid credentials (should show error)
   - [ ] Logout functionality
   - [ ] Auto-redirect when already authenticated

2. **Page Protection:**
   - [ ] Access protected pages without login (should redirect to login)
   - [ ] Access protected pages after login (should work)
   - [ ] Refresh protected page while logged in (should stay)
   - [ ] Refresh protected page after logout (should redirect)

3. **Navigation:**
   - [ ] All internal links work correctly
   - [ ] Redirect after login returns to intended page
   - [ ] Logout redirects to login page

### Testing Locally

```bash
# Start development server
pnpm dev

# In another terminal, test the build
pnpm build
pnpm preview
```

## 📁 Project Structure

```
firebase-deploy/
├── dist/                    # Production build (generated)
├── public/                  # Static assets
│   └── vite.svg
├── src/                     # Source code
│   ├── auth-guard.js        # Authentication utilities
│   ├── firebase_config.js   # Firebase configuration
│   ├── home.js             # Home page logic
│   ├── login.js            # Login page logic
│   ├── signup.js           # Signup page logic
│   ├── main.js             # Main page logic
│   └── style.css           # Global styles
├── *.html                  # HTML pages (auto-detected by Vite)
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🔧 Configuration Files

### Environment Variables (`.env`)
- **Firebase Config:** All Firebase credentials stored securely
- **Vite Prefix:** All variables use `VITE_` prefix for client-side access
- **Security:** `.env` file is gitignored to prevent credential leaks

### Firebase Configuration (`firebase.json`)
- **Hosting:** Points to `dist/` directory
- **Firestore:** Database rules and indexes
- **Location:** Asia South 1 (Mumbai)

### Vite Configuration (`vite.config.js`)
- **Multi-page setup:** Automatically detects all `.html` files
- **Build optimization:** Rollup bundling for production

## 🔒 Security Best Practices

### Environment Variables
- **Never commit** `.env` files to version control
- **Use `.env.example`** as a template for new developers
- **Firebase API keys** are safe to expose in client-side code (they identify your project)
- **Use Firestore rules** for actual security enforcement

### Production Deployment
- Environment variables are automatically loaded by Vite during build
- For hosting platforms (Vercel, Netlify), set environment variables in their dashboard
- Firebase Hosting automatically uses your project configuration

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase app not initialized" error:**
   - Check `.env` file exists and has correct values
   - Ensure all `VITE_FIREBASE_*` variables are set
   - Verify Firebase project is properly set up

2. **Environment variables not loading:**
   - Ensure variables start with `VITE_` prefix
   - Restart development server after changing `.env`
   - Check `.env` file is in the root directory

3. **Build fails:**
   - Check for syntax errors in JS files
   - Ensure all imports are correct
   - Verify all environment variables are set

4. **Authentication not working:**
   - Verify Firebase Authentication is enabled
   - Check browser console for detailed errors
   - Ensure correct sign-in methods are enabled

4. **Deployment fails:**
   - Run `firebase login` first
   - Check if you have access to the Firebase project
   - Verify `firebase.json` configuration

### Debug Mode

Enable detailed logging by adding to your Firebase config:

```javascript
// In firebase_config.js
import { connectAuthEmulator } from 'firebase/auth';

// For local development only
if (location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099');
}
```

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

# ❓ Troubleshooting

Having issues? This guide helps you solve the most common problems step by step.

## 🚨 Most Common Issues

### 🔥 "Firebase app not initialized" Error

**What you see:**
```
Error: Firebase app not initialized
```

**How to fix:**

1. **Check your `.env` file exists:**
   ```bash
   ls -la .env
   ```
   If you don't see `.env`, create it:
   ```bash
   cp .env.example .env
   ```

2. **Check your `.env` file has all values:**
   ```bash
   cat .env
   ```
   Make sure all lines have actual values, not `your_*_here`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyC...  ✅ Good
   VITE_FIREBASE_API_KEY=your_api_key_here  ❌ Bad
   ```

3. **Restart your development server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then start again
   pnpm dev
   ```

### 🔐 Authentication Not Working

**What you see:**
- Login button doesn't do anything
- Error messages about sign-in methods
- "Operation not allowed" errors

**How to fix:**

1. **Check Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Click "Authentication"
   - Go to "Sign-in method" tab
   - Make sure "Email/Password" is **enabled**

2. **Check authorized domains:**
   - In Authentication → Settings → Authorized domains
   - Make sure `localhost` is in the list
   - Add your production domain if deploying

3. **Check browser console:**
   - Press F12
   - Look for red error messages
   - Common fixes below

### 📦 "Module not found" Errors

**What you see:**
```
Error: Cannot resolve module './firebase_config.js'
Failed to resolve import
```

**How to fix:**

1. **Check file paths:**
   ```bash
   # Make sure these files exist
   ls src/firebase_config.js
   ls src/auth-guard.js
   ```

2. **Check import statements:**
   ```javascript
   // ✅ Good - relative path with .js extension
   import { auth } from './firebase_config.js';
   
   // ❌ Bad - missing .js or wrong path
   import { auth } from './firebase_config';
   import { auth } from 'firebase_config.js';
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   pnpm install
   ```

### 🌐 "Can't access localhost:5173"

**What you see:**
- Browser shows "This site can't be reached"
- "Connection refused" error

**How to fix:**

1. **Make sure dev server is running:**
   ```bash
   pnpm dev
   ```
   You should see:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.1.100:5173/
   ```

2. **Try different URL:**
   ```
   http://127.0.0.1:5173
   ```

3. **Check if port is busy:**
   ```bash
   # Kill any process using port 5173
   npx kill-port 5173
   
   # Then start again
   pnpm dev
   ```

### 🔄 Environment Variables Not Loading

**What you see:**
- `undefined` values in console
- Firebase config shows `undefined`

**How to fix:**

1. **Check variable names start with `VITE_`:**
   ```env
   VITE_FIREBASE_API_KEY=your_key  ✅ Good
   FIREBASE_API_KEY=your_key       ❌ Bad (missing VITE_)
   ```

2. **Check `.env` file location:**
   ```bash
   # Should be in project root, same level as package.json
   ls -la
   # You should see both .env and package.json
   ```

3. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev
   ```

## 🔍 Step-by-Step Debugging

When something doesn't work, follow these steps:

### Step 1: Check Browser Console

1. **Open Developer Tools:**
   - Press F12 (Windows/Linux)
   - Press Cmd+Option+I (Mac)

2. **Look for error messages:**
   - Red errors are critical
   - Yellow warnings might indicate issues

3. **Common error patterns:**
   ```
   auth/user-not-found → User doesn't exist
   auth/wrong-password → Incorrect password
   auth/email-already-in-use → Email taken
   auth/operation-not-allowed → Check Firebase settings
   ```

### Step 2: Verify Firebase Setup

1. **Check Firebase Console:**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Select your project
   - Check Authentication is enabled

2. **Verify configuration:**
   ```javascript
   // Add this to see your config
   console.log('Firebase config:', {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   });
   ```

### Step 3: Test Simple Case

Create a minimal test to isolate the issue:

```javascript
// Test Firebase connection
import { auth } from './firebase_config.js';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('✅ Firebase works, user logged in');
    } else {
        console.log('ℹ️ Firebase works, no user logged in');
    }
});
```

## 🛠️ Specific Error Solutions

### Authentication Errors

**"auth/user-not-found"**
```javascript
// User doesn't exist, redirect to signup
if (error.code === 'auth/user-not-found') {
    alert('No account found. Please sign up first.');
    window.location.href = 'signup.html';
}
```

**"auth/wrong-password"**
```javascript
// Show error message
if (error.code === 'auth/wrong-password') {
    document.getElementById('error-msg').textContent = 'Incorrect password';
}
```

**"auth/email-already-in-use"**
```javascript
// User already exists, redirect to login
if (error.code === 'auth/email-already-in-use') {
    alert('Account already exists. Please log in.');
    window.location.href = 'login.html';
}
```

### Build Errors

**"Build failed"**
1. Check for syntax errors:
   ```bash
   pnpm build
   ```
   Read the error message carefully

2. Common issues:
   - Missing semicolons
   - Unclosed brackets
   - Typos in variable names

**"Cannot resolve import"**
1. Check file exists:
   ```bash
   ls src/your-file.js
   ```

2. Check import path:
   ```javascript
   // ✅ Correct
   import { something } from './file.js';
   
   // ❌ Wrong
   import { something } from './file';
   ```

### Deployment Errors

**"Failed to deploy"**
1. Check you're logged in:
   ```bash
   firebase login
   ```

2. Check project is initialized:
   ```bash
   firebase use --add
   ```

3. Check build exists:
   ```bash
   ls dist/
   ```

**"Page shows 404 after deployment"**
1. Check hosting configuration in `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "dist"
     }
   }
   ```

2. Make sure you built before deploying:
   ```bash
   pnpm build
   firebase deploy
   ```

## 🔧 Environment-Specific Issues

### Windows Issues

**PowerShell execution policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Path issues:**
```bash
# Use forward slashes in imports
import { auth } from './firebase_config.js';  // ✅
import { auth } from '.\\firebase_config.js'; // ❌
```

### Mac/Linux Issues

**Permission errors:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

**Node version issues:**
```bash
# Check Node version
node --version
# Should be 16+ 

# Update if needed
npm install -g n
sudo n stable
```

## 🆘 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Read error messages carefully**
3. **Try the suggested solutions**
4. **Search for the exact error message**

### Creating a Good Bug Report

Include:

1. **What you were trying to do:**
   ```
   I was trying to log in with my email
   ```

2. **What happened instead:**
   ```
   Got error message "auth/user-not-found"
   ```

3. **Error messages:**
   ```
   Copy the exact error from browser console
   ```

4. **Your environment:**
   ```
   OS: Windows 10
   Browser: Chrome 100
   Node: v18.0.0
   ```

5. **Steps to reproduce:**
   ```
   1. Go to login page
   2. Enter email: test@example.com
   3. Enter password: mypassword
   4. Click login button
   5. See error
   ```

### Where to Get Help

**Resources:**
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase Support](https://firebase.google.com/support)

**Community:**
- Firebase Discord
- Reddit r/Firebase
- GitHub Issues (for this project)

## 🔄 Reset Everything

If nothing works, try starting fresh:

### Clean Installation

1. **Backup your `.env` file:**
   ```bash
   cp .env .env.backup
   ```

2. **Delete everything and reinstall:**
   ```bash
   rm -rf node_modules
   rm -rf dist
   rm package-lock.json
   pnpm install
   ```

3. **Restore your `.env` file:**
   ```bash
   cp .env.backup .env
   ```

### Fresh Firebase Setup

1. **Create new Firebase project**
2. **Get new configuration**
3. **Update `.env` file**
4. **Test again**

## ✅ Prevention Tips

**To avoid issues:**

1. **Always test locally before deploying**
2. **Keep backups of working configurations**
3. **Test after major changes**
4. **Read error messages carefully**
5. **Update dependencies regularly**

## 💡 Pro Tips

**Debugging workflow:**
1. Read the error message
2. Check browser console
3. Verify Firebase Console
4. Test with minimal code
5. Search for solutions
6. Ask for help with details

**Keep these handy:**
- Your Firebase project URL
- Your `.env.example` file
- A working backup of your code

Remember: Every developer encounters these issues. With patience and systematic debugging, you can solve any problem! 🚀

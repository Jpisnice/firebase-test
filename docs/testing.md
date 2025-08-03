# 🧪 Testing Guide

Learn how to test your app to make sure everything works perfectly before sharing it with others.

## 🎯 What You'll Learn

- How to test your app locally
- What to test before deploying
- How to test the production build
- Common testing scenarios
- How to debug issues

## 🏠 Testing Locally

### Start Your Development Server

```bash
npm run dev
# or
pnpm dev
```

Your app will be available at `http://localhost:5173`

### Test the Production Build

Before deploying, always test the production build:

```bash
# Build for production
npm run build
# or
pnpm build

# Preview the production build
npm run preview
# or
pnpm preview
```

This will start a server at `http://localhost:4173` with your production build.

## ✅ Complete Testing Checklist

Go through this checklist before deploying your app:

### 🔐 Authentication Flow

**Sign Up Process:**
- [ ] Go to signup page
- [ ] Try signing up with a valid email
- [ ] Check if you receive any error messages
- [ ] Verify you're redirected after successful signup
- [ ] Try signing up with the same email again (should show error)
- [ ] Try signing up with invalid email format (should show error)

**Login Process:**
- [ ] Go to login page
- [ ] Try logging in with correct credentials
- [ ] Try logging in with wrong password (should show error)
- [ ] Try logging in with non-existent email (should show error)
- [ ] Check if you're redirected to the right page after login

**Logout Process:**
- [ ] Click logout button
- [ ] Verify you're redirected to login page
- [ ] Try accessing protected pages after logout (should redirect to login)

### 🛡️ Page Protection

**Without Being Logged In:**
- [ ] Try to access `home.html` directly (should redirect to login)
- [ ] Try to access any protected pages (should redirect to login)
- [ ] Access login and signup pages (should work normally)

**While Logged In:**
- [ ] Access protected pages (should work)
- [ ] Try to access login page (should redirect to home/dashboard)
- [ ] Try to access signup page (should redirect to home/dashboard)

**Page Refresh Test:**
- [ ] Log in and go to a protected page
- [ ] Refresh the page (should stay on the page)
- [ ] Log out and refresh a protected page (should redirect to login)

### 🔄 Navigation

**Internal Links:**
- [ ] Click all navigation links
- [ ] Check that URLs change correctly
- [ ] Verify all pages load properly

**Browser Navigation:**
- [ ] Use browser back/forward buttons
- [ ] Check that authentication state is maintained
- [ ] Verify no broken states occur

### 📱 Responsive Design

**Desktop Testing:**
- [ ] Test on full screen
- [ ] Test with narrow browser window
- [ ] Check all buttons are clickable
- [ ] Verify text is readable

**Mobile Testing:**
- [ ] Open on your phone
- [ ] Test portrait and landscape modes
- [ ] Check touch interactions work
- [ ] Verify forms are usable

## 🔍 Testing Different Scenarios

### New User Journey

1. **First Visit:**
   - Go to `http://localhost:5173`
   - Should redirect to login page
   - Click "Sign up" link
   - Create new account
   - Should be redirected to home page

2. **Return Visit:**
   - Close browser
   - Open app again
   - Should remember you're logged in
   - Should go directly to home page

### Error Handling

**Network Issues:**
- Turn off internet connection
- Try to log in (should show appropriate error)
- Turn internet back on
- Try again (should work)

**Firebase Issues:**
- Temporarily break your Firebase config
- Try to use the app (should show error, not crash)
- Fix config and test again

## 🌐 Testing the Production Build

Always test your production build before deploying:

### Build and Preview

```bash
# Create production build
pnpm build

# Start preview server
pnpm preview
```

### What to Check

- [ ] All pages load correctly
- [ ] Authentication still works
- [ ] No console errors in browser (press F12)
- [ ] App loads quickly
- [ ] All features work as expected

### Check Build Output

When you run `pnpm build`, check for:
- No error messages
- All HTML files are generated
- JavaScript files are created
- File sizes are reasonable

```bash
dist/
├── index.html          # ✓ Should exist
├── login.html          # ✓ Should exist
├── signup.html         # ✓ Should exist
├── home.html           # ✓ Should exist
└── assets/
    ├── index-abc123.js # ✓ Should exist
    └── index-abc123.css # ✓ Should exist
```

## 🐛 Debugging Common Issues

### Browser Console

**Open Developer Tools:**
- Press F12 (Windows/Linux)
- Press Cmd+Option+I (Mac)
- Right-click → Inspect Element

**Check for Errors:**
- Look in the "Console" tab
- Red error messages indicate problems
- Yellow warnings might indicate issues

**Common Error Messages:**

```
Firebase: Error (auth/user-not-found)
```
**Fix:** User doesn't exist, check email or create account

```
Firebase: Error (auth/wrong-password)
```
**Fix:** Incorrect password

```
Firebase: Error (auth/email-already-in-use)
```
**Fix:** Email is already registered

```
Uncaught ReferenceError: auth is not defined
```
**Fix:** Check Firebase configuration and imports

### Network Tab

**Check API Calls:**
- Go to "Network" tab in browser dev tools
- Look for Firebase API calls
- Red entries indicate failed requests

### Authentication State

**Check Current User:**
Add this to any page to debug authentication:

```javascript
import { auth } from './firebase_config.js';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('✅ User is logged in:', user.email);
    } else {
        console.log('❌ User is not logged in');
    }
});
```

## 📊 Testing Tools

### Manual Testing

**Browser Testing:**
- Chrome (most common)
- Firefox
- Safari (if on Mac)
- Edge

**Device Testing:**
- Desktop computer
- Tablet
- Mobile phone

### Automated Testing

For more advanced testing, you can add:

```bash
# Install testing libraries
npm install -D vitest @testing-library/dom
# or
pnpm add -D vitest @testing-library/dom

# Run tests
npm test
# or
pnpm test
```

## ✅ Pre-Deployment Final Check

Before deploying to production:

1. **Clean Build Test:**
   ```bash
   # Delete previous build
   rm -rf dist
   
   # Fresh build
   npm run build
   # or
   pnpm build
   
   # Test fresh build
   npm run preview
   # or
   pnpm preview
   ```

2. **Complete User Journey:**
   - [ ] Sign up as a new user
   - [ ] Log out
   - [ ] Log back in
   - [ ] Navigate through all pages
   - [ ] Log out again

3. **Error State Testing:**
   - [ ] Try wrong password
   - [ ] Try invalid email
   - [ ] Test with no internet connection

4. **Performance Check:**
   - [ ] Pages load quickly
   - [ ] No long loading times
   - [ ] Smooth transitions

## 🆘 When Things Don't Work

### Step-by-Step Debugging

1. **Check Browser Console** (F12)
2. **Verify Environment Variables** (`.env` file)
3. **Check Firebase Console** (any error logs?)
4. **Test with Simple Case** (just login/logout)
5. **Compare with Working Version** (Git history)

### Getting Help

**Check These Resources:**
- [Troubleshooting Guide](troubleshooting.md)
- Firebase Console error logs
- Browser console errors
- Network tab in dev tools

**Create a Bug Report:**
Include:
- What you were trying to do
- What happened instead
- Error messages from console
- Steps to reproduce the issue

## 🎯 What's Next?

Once your testing is complete:
- [Deploy your app](deployment.md) to share with others
- Set up monitoring to track real usage
- Plan new features based on user feedback

## 💡 Pro Testing Tips

**Test Early and Often:**
- Test after every major change
- Don't wait until the end to test everything

**Use Real Data:**
- Test with real email addresses
- Try edge cases (very long emails, special characters)

**Test Like a User:**
- Don't just test the "happy path"
- Try to break things
- Test what happens when users do unexpected things

**Keep Notes:**
- Write down what you tested
- Note any issues you found
- Track what still needs testing

# 🛠️ Getting Started

This guide will help you set up the project from scratch. Don't worry if you're new to this - we'll walk through everything step by step!

## 📋 What You Need First

Before starting, make sure you have these installed on your computer:

### Required Software

1. **Node.js** (version 16 or newer)
   - Download from [nodejs.org](https://nodejs.org/)
   - This gives you `npm` (package manager)

2. **pnpm** (recommended package manager)
   - Install after Node.js: `npm install -g pnpm`
   - Or use `npm` instead (comes with Node.js)

3. **Git** (to download the code)
   - Download from [git-scm.com](https://git-scm.com/)

4. **Firebase CLI** (to deploy later)
   - Install: `npm install -g firebase-tools`

### Check if you have everything:
```bash
node --version    # Should show v16+ 
npm --version     # Should show a version number
git --version     # Should show a version number
```

## 🚀 Step 1: Get the Code

1. **Download the project:**
   ```bash
   git clone https://github.com/Jpisnice/firebase-test.git
   cd firebase-test
   ```

2. **Install the dependencies:**
   ```bash
   pnpm install
   ```
   > **What this does:** Downloads all the code libraries this project needs

## 🔥 Step 2: Set Up Firebase

### Create a Firebase Project

1. **Go to [Firebase Console](https://console.firebase.google.com)**
2. **Click "Create a project"**
3. **Give it a name** (like "my-auth-app")
4. **Disable Google Analytics** (not needed for this project)
5. **Click "Create project"**

### Enable Authentication

1. **In your Firebase project, click "Authentication"**
2. **Click "Get started"**
3. **Go to "Sign-in method" tab**
4. **Click on "Email/Password"**
5. **Enable it and click "Save"**

### Get Your Configuration

1. **Click the gear icon (Project Settings)**
2. **Scroll down to "Your apps"**
3. **Click the web icon `</>`**
4. **Give it a name** (like "web-app")
5. **Click "Register app"**
6. **Copy the config object** (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  // ... more values
};
```

## 🔐 Step 3: Set Up Environment Variables

### Create Your Environment File

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Open the `.env` file** in your code editor

3. **Fill in your Firebase values:**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
   ```

> **Important:** Replace `your_*_here` with the actual values from Firebase!

## 🏃‍♂️ Step 4: Run the Project

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Open your browser** and go to `http://localhost:5173`

3. **You should see the app!** 🎉

## ✅ Test Everything Works

1. **Try to access the home page** - it should redirect you to login
2. **Click "Sign up"** and create a test account
3. **Log in** with your new account
4. **You should see the protected home page**
5. **Click "Logout"** to test logging out

## 🆘 Something Not Working?

### Common Issues:

**"Firebase app not initialized"**
- Check your `.env` file has all the values
- Make sure you copied them correctly from Firebase Console

**"Module not found" errors**
- Run `pnpm install` again
- Delete `node_modules` folder and run `pnpm install`

**Can't access localhost:5173**
- Make sure `pnpm dev` is running
- Try `http://127.0.0.1:5173` instead

**"Sign-in method not enabled"**
- Go back to Firebase Console
- Make sure Email/Password is enabled in Authentication

## 🎯 What's Next?

Now that everything works, you can:
- [Add new pages](adding-pages.md) to your app
- [Deploy your app](deployment.md) to the internet
- [Test your app](testing.md) thoroughly

## 💡 Understanding What You Just Did

- **Installed Node.js** - This lets you run JavaScript on your computer
- **Downloaded the code** - Got all the project files
- **Set up Firebase** - Created your backend authentication service
- **Configured environment variables** - Connected your app to Firebase safely
- **Started the development server** - Made your app available locally

You now have a fully working authentication system! 🚀

# 🚀 Deployment Guide

Ready to share your app with the world? This guide shows you how to deploy your app to the internet.

## 🎯 What You'll Learn

- How to build your app for production
- How to deploy to Firebase Hosting (recommended)
- How to deploy to other platforms
- How to set up custom domains

## 🏗️ Step 1: Build Your App

Before deploying, you need to create a production build:

```bash
# Build the app
npm run build
# or
pnpm build
```

**What this does:**
- Creates an optimized version of your app
- Puts everything in a `dist/` folder
- Makes your app smaller and faster

**You should see:**
```
✓ built in 1.23s
dist/index.html                  0.45 kB
dist/login.html                  0.43 kB
dist/signup.html                 0.44 kB
dist/home.html                   0.46 kB
dist/assets/index-abc123.js      45.2 kB
```

## 🔥 Option 1: Deploy to Firebase Hosting (Recommended)

Firebase Hosting is free and works perfectly with Firebase Authentication.

### Setup Firebase Hosting

1. **Login to Firebase CLI:**
   ```bash
   firebase login
   ```
   This opens your browser to log in with Google.

2. **Initialize hosting (if not done already):**
   ```bash
   firebase init hosting
   ```
   
   **Choose these options:**
   - "What do you want to use as your public directory?" → `dist`
   - "Configure as a single-page app?" → `No`
   - "Set up automatic builds and deploys with GitHub?" → `No` (for now)

### Deploy Your App

1. **Build first (if you haven't):**
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```

3. **Your app is live! 🎉**
   Firebase will show you the URL, something like:
   ```
   ✔ Deploy complete!
   Project Console: https://console.firebase.google.com/project/your-project
   Hosting URL: https://your-project.web.app
   ```

### Quick Deploy Commands

```bash
# Deploy everything
firebase deploy

# Deploy only hosting (faster)
firebase deploy --only hosting

# Deploy with a message
firebase deploy -m "Added dashboard page"
```

## 🌐 Option 2: Deploy to Vercel

Vercel is great for frontend apps and has automatic Git integration.

### Method A: Connect Your GitHub Repo

1. **Push your code to GitHub** (if not already)
2. **Go to [vercel.com](https://vercel.com)**
3. **Sign up with GitHub**
4. **Click "Import Project"**
5. **Select your repository**
6. **Configure:**
   - Build Command: `pnpm build`
   - Output Directory: `dist`
7. **Add environment variables** (very important!):
   - Go to "Environment Variables"
   - Add all your `VITE_FIREBASE_*` variables
8. **Deploy!**

### Method B: Deploy from Command Line

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build your app:**
   ```bash
   npm run build
   # or
   pnpm build
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set up environment variables:**
   ```bash
   vercel env add VITE_FIREBASE_API_KEY
   vercel env add VITE_FIREBASE_AUTH_DOMAIN
   # ... add all your Firebase variables
   ```

## 📦 Option 3: Deploy to Netlify

### Method A: Drag and Drop

1. **Build your app:**
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Drag the `dist/` folder** to the deploy area
4. **Your app is live!**

### Method B: Connect Git Repository

1. **Push code to GitHub**
2. **Go to [netlify.com](https://netlify.com)**
3. **Click "New site from Git"**
4. **Select your repository**
5. **Configure:**
   - Build command: `pnpm build`
   - Publish directory: `dist`
6. **Add environment variables:**
   - Go to Site Settings → Environment Variables
   - Add all your `VITE_FIREBASE_*` variables

## 🔧 Setting Up Environment Variables on Hosting Platforms

Your `.env` file won't be deployed (it's in `.gitignore`), so you need to set environment variables on your hosting platform:

### Firebase Hosting
Firebase automatically uses your project configuration, so you don't need to set environment variables manually.

### Vercel
```bash
vercel env add VITE_FIREBASE_API_KEY
# Enter your API key when prompted
```

Or in the Vercel dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add each variable

### Netlify
1. Site Settings → Environment Variables
2. Click "Add variable"
3. Add each `VITE_FIREBASE_*` variable

## 🔗 Custom Domains

### Firebase Hosting

1. **Go to Firebase Console**
2. **Hosting → Add custom domain**
3. **Enter your domain** (like `myapp.com`)
4. **Follow the verification steps**
5. **Update your DNS** with the provided records

### Vercel

1. **Go to your project dashboard**
2. **Settings → Domains**
3. **Add your domain**
4. **Update your DNS** as instructed

### Netlify

1. **Go to Site Settings**
2. **Domain management → Add custom domain**
3. **Follow the DNS setup instructions**

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Your app builds successfully (`pnpm build`)
- [ ] All pages work in the built version (`pnpm preview`)
- [ ] Authentication works properly
- [ ] All environment variables are set correctly
- [ ] You've tested login/logout flow
- [ ] All links work correctly
- [ ] No console errors in browser

## 🧪 Test Your Live App

After deployment:

1. **Visit your live URL**
2. **Test authentication:**
   - Try signing up with a new email
   - Log in and out
   - Visit protected pages
3. **Check all pages work**
4. **Test on mobile** (open on your phone)

## 🔄 Updating Your Deployed App

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Vercel (with Git)
Just push to your main branch:
```bash
git add .
git commit -m "Updated dashboard"
git push
```
Vercel automatically rebuilds and deploys!

### Netlify (with Git)
Same as Vercel - just push to Git:
```bash
git add .
git commit -m "Updated dashboard"
git push
```

## 🆘 Common Deployment Issues

### "Firebase not initialized"
- Check that all environment variables are set on your hosting platform
- Make sure the variable names are exactly right (including `VITE_` prefix)

### "Build failed"
- Run `pnpm build` locally first to check for errors
- Check that all your files are committed to Git
- Verify your build command is correct (`pnpm build`)

### "Pages show 404"
- Make sure your output directory is set to `dist`
- Check that all HTML files are in the root directory
- For single-page app setup, set it to "No"

### Authentication doesn't work
- Verify all Firebase environment variables are set correctly
- Check Firebase Console → Authentication → Authorized domains
- Add your live domain to authorized domains

## 🎯 What's Next?

Now that your app is deployed:
- Share the URL with friends and family
- Set up a custom domain
- Monitor usage in Firebase Console
- Consider setting up automatic deployments with Git

## 💡 Pro Tips

**For faster deployments:**
- Use `firebase deploy --only hosting` instead of `firebase deploy`
- Set up GitHub Actions for automatic deployment

**For better performance:**
- Your app is already optimized by Vite
- Firebase/Vercel/Netlify provide global CDN automatically

**For monitoring:**
- Check Firebase Console for user analytics
- Use browser dev tools to test performance

# 🔐 Adding New Pages

Learn how to create new pages in your app and protect them with authentication.

## 🎯 What You'll Learn

- How to create a new page
- How to protect pages (require login)
- How to make pages that work for both logged-in and public users
- How the automatic page detection works

## 📝 Step-by-Step: Creating a New Page

Let's create a "Dashboard" page as an example.

### Step 1: Create the HTML File

Create a new file called `dashboard.html` in the main project folder (same level as `index.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - My App</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>
    <div id="app">
        <h1>📊 Dashboard</h1>
        <p>Welcome to your personal dashboard!</p>
        
        <!-- User info will be displayed here -->
        <div class="user-info">
            <p>Email: <span id="userEmail">Loading...</span></p>
            <p>User ID: <span id="userId">Loading...</span></p>
        </div>
        
        <!-- Navigation -->
        <div class="nav-buttons">
            <a href="home.html">🏠 Home</a>
            <button id="logoutBtn">🚪 Logout</button>
        </div>
    </div>
    
    <!-- This connects to your JavaScript file -->
    <script type="module" src="/src/dashboard.js"></script>
</body>
</html>
```

### Step 2: Create the JavaScript File

Create a new file called `dashboard.js` in the `src/` folder:

```javascript
import { auth } from './firebase_config.js';
import { signOut } from 'firebase/auth';
import { requireAuth } from './auth-guard.js';

// This function runs ONLY if the user is logged in
function initializePage(user) {
    console.log('Dashboard loaded for user:', user.email);
    
    // Display user information
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userId').textContent = user.uid;
    
    // Set up the logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
}

// Protect this page - redirect to login if not authenticated
requireAuth(initializePage);
```

### Step 3: Test Your New Page

1. **Make sure your dev server is running:**
   ```bash
   pnpm dev
   ```

2. **Visit your new page:**
   - Go to `http://localhost:5173/dashboard.html`
   - If you're not logged in, it should redirect to login
   - If you are logged in, you should see the dashboard

3. **Add a link from other pages:**
   ```html
   <a href="dashboard.html">Go to Dashboard</a>
   ```

## 🛡️ Three Ways to Protect Pages

### Method 1: Full Protection (Most Common)

Use this when the **entire page** requires authentication:

```javascript
import { requireAuth } from './auth-guard.js';

function initializePage(user) {
    // This code ONLY runs if user is authenticated
    console.log('User is logged in:', user.email);
    // Your page logic here...
}

// Protect the page
requireAuth(initializePage);
```

**When to use:** Dashboard, profile pages, admin areas

### Method 2: Mixed Content

Use this when you have **both public and private content** on the same page:

```javascript
import { auth } from './firebase_config.js';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in - show private content
        document.getElementById('private-content').style.display = 'block';
        document.getElementById('public-content').style.display = 'none';
        document.getElementById('welcome-msg').textContent = `Welcome back, ${user.email}!`;
    } else {
        // User is not logged in - show public content
        document.getElementById('private-content').style.display = 'none';
        document.getElementById('public-content').style.display = 'block';
    }
});
```

**HTML structure:**
```html
<div id="public-content">
    <h2>Welcome! Please log in to see more.</h2>
    <a href="login.html">Login</a>
</div>

<div id="private-content" style="display: none;">
    <h2 id="welcome-msg">Welcome back!</h2>
    <p>This is private content only logged-in users can see.</p>
</div>
```

**When to use:** Landing pages, product pages with member features

### Method 3: Redirect Logged-In Users

Use this on **login and signup pages** to redirect users who are already logged in:

```javascript
import { redirectIfAuthenticated } from './auth-guard.js';

// Redirect to home if already logged in
redirectIfAuthenticated('home.html');

// Your login/signup logic here...
```

**When to use:** Login page, signup page

## ⚡ How Automatic Page Detection Works

The project is set up so that **any `.html` file** in the main folder automatically becomes a page:

```
📁 Project Root
├── index.html      ➜ http://localhost:5173/
├── login.html      ➜ http://localhost:5173/login.html
├── signup.html     ➜ http://localhost:5173/signup.html
├── home.html       ➜ http://localhost:5173/home.html
├── dashboard.html  ➜ http://localhost:5173/dashboard.html
└── any-page.html   ➜ http://localhost:5173/any-page.html
```

**You don't need to configure anything!** The build system automatically finds all HTML files.

## 🎨 Making Your Pages Look Good

### Use the Existing Styles

Your pages will automatically use the styles from `src/style.css`. You can also add custom styles:

```html
<head>
    <link rel="stylesheet" href="src/style.css">
    <style>
        .dashboard-card {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin: 1rem 0;
        }
    </style>
</head>
```

### Common Page Template

Here's a template you can copy for new pages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>
    <div id="app">
        <nav>
            <a href="home.html">🏠 Home</a>
            <button id="logoutBtn">🚪 Logout</button>
        </nav>
        
        <main>
            <h1>Your Page Content</h1>
            <!-- Your content here -->
        </main>
    </div>
    <script type="module" src="/src/your-page.js"></script>
</body>
</html>
```

## 🔄 Navigation Between Pages

### Simple Links
```html
<a href="dashboard.html">Go to Dashboard</a>
<a href="home.html">Go to Home</a>
```

### Button Navigation
```javascript
document.getElementById('goDashboard').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});
```

### Conditional Navigation
```javascript
// Redirect based on user status
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Redirect logged-in users
        window.location.href = 'home.html';
    } else {
        // Redirect anonymous users
        window.location.href = 'login.html';
    }
});
```

## ✅ Checklist for New Pages

When creating a new page, make sure you:

- [ ] Created the `.html` file in the root directory
- [ ] Created the corresponding `.js` file in the `src/` directory
- [ ] Added appropriate authentication protection
- [ ] Included navigation to/from other pages
- [ ] Tested both logged-in and logged-out scenarios
- [ ] Added the page to your navigation menu

## 🆘 Common Issues

**Page doesn't redirect to login:**
- Make sure you're using `requireAuth(initializePage)`
- Check that `import { requireAuth } from './auth-guard.js';` is correct

**JavaScript errors:**
- Check the browser console (F12)
- Make sure all imports are correct
- Verify file paths are correct

**Styles not working:**
- Make sure `<link rel="stylesheet" href="src/style.css">` is in your HTML
- Check that the path is correct

**Page not accessible:**
- Make sure the HTML file is in the root directory (same level as `index.html`)
- Restart your dev server: `pnpm dev`

## 🎯 What's Next?

Now that you know how to add pages, you can:
- [Test your app](testing.md) to make sure everything works
- [Deploy your app](deployment.md) to share it with others
- Check out [troubleshooting](troubleshooting.md) if you run into issues

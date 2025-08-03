# 📁 Project Structure

Understanding how your project is organized and what each file does.

## 🗂️ Main Project Layout

```
firebase-test/
├── 📁 docs/                    # Documentation files
├── 📁 public/                  # Static files (images, icons)
├── 📁 src/                     # Your JavaScript code
├── 📄 *.html                   # Your web pages
├── 📄 .env                     # Secret configuration (not in Git)
├── 📄 .env.example             # Template for secrets
├── 📄 .gitignore               # Files Git should ignore
├── 📄 firebase.json            # Firebase settings
├── 📄 package.json             # Project info and dependencies
├── 📄 vite.config.js           # Build tool settings
└── 📄 README.md                # Main documentation
```

## 📄 HTML Pages (Web Pages)

These are the pages users see in their browser:

### `index.html`
- **What it is:** The home page of your app
- **When it loads:** When someone visits your main URL
- **What it does:** Usually redirects to login or home based on auth status

### `login.html`
- **What it is:** The login page
- **When it loads:** When users need to sign in
- **What it does:** Lets users enter email/password to log in

### `signup.html`
- **What it is:** The registration page
- **When it loads:** When new users want to create an account
- **What it does:** Lets users create a new account

### `home.html`
- **What it is:** The main app page (protected)
- **When it loads:** After users successfully log in
- **What it does:** Shows content only for logged-in users

### Adding New Pages
You can add any new `.html` file to the root directory:
```
dashboard.html  → http://yoursite.com/dashboard.html
profile.html    → http://yoursite.com/profile.html
about.html      → http://yoursite.com/about.html
```

## 🔧 JavaScript Files (`src/` folder)

These files contain the logic that makes your app work:

### `firebase_config.js`
- **What it is:** Connects your app to Firebase
- **What it contains:** Your Firebase project settings
- **Why it's important:** Without this, authentication won't work

```javascript
// What this file does:
// 1. Imports Firebase libraries
// 2. Sets up your project configuration
// 3. Exports 'auth' object for other files to use
```

### `auth-guard.js`
- **What it is:** Protection system for your pages
- **What it contains:** Functions to check if users are logged in
- **Why it's important:** Keeps private pages private

**Main functions:**
- `requireAuth()` - Protects entire pages
- `redirectIfAuthenticated()` - Redirects logged-in users away from login/signup

### Page-specific JavaScript files:

**`login.js`**
- Handles the login form
- Shows error messages
- Redirects after successful login

**`signup.js`**
- Handles the signup form
- Creates new user accounts
- Shows validation errors

**`home.js`**
- Loads content for logged-in users
- Handles logout button
- Shows user information

**`main.js`**
- Code for the main index page
- Handles initial routing

### `style.css`
- **What it is:** Makes your app look good
- **What it contains:** Colors, fonts, layouts, responsive design
- **Why it's important:** User experience and visual appeal

## ⚙️ Configuration Files

### `.env`
- **What it is:** Your secret Firebase settings
- **Why it's secret:** Contains your project API keys
- **Important:** Never share this file or commit it to Git

```env
# Example contents:
VITE_FIREBASE_API_KEY=your_secret_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# ... more Firebase settings
```

### `.env.example`
- **What it is:** Template showing what secrets you need
- **Safe to share:** Contains no real secrets
- **How to use:** Copy to `.env` and fill in real values

### `firebase.json`
- **What it is:** Firebase project configuration
- **What it configures:** Hosting settings, database rules
- **Key settings:**
  ```json
  {
    "hosting": {
      "public": "dist",  // Where built files go
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    }
  }
  ```

### `package.json`
- **What it is:** Project information and dependencies
- **Contains:**
  - Project name and description
  - List of libraries you use (Firebase, Vite, etc.)
  - Build commands (`pnpm dev`, `pnpm build`)

**Key scripts:**
```json
{
  "scripts": {
    "dev": "vite",        // Start development server
    "build": "vite build", // Build for production
    "preview": "vite preview" // Preview production build
  }
}
```

### `vite.config.js`
- **What it is:** Build tool configuration
- **What it does:** Tells Vite how to build your app
- **Special feature:** Automatically finds all `.html` files

```javascript
// What this does:
// 1. Finds all .html files in root directory
// 2. Creates entry points for each page
// 3. Builds them all for production
```

### `.gitignore`
- **What it is:** Tells Git what files to ignore
- **Why it's important:** Keeps secrets and build files out of version control
- **Key entries:**
  ```
  .env              # Your secrets
  node_modules/     # Downloaded libraries
  dist/             # Built files
  ```

## 📁 Generated Folders

These folders are created automatically:

### `node_modules/`
- **What it is:** Downloaded libraries and dependencies
- **When it's created:** When you run `pnpm install`
- **Important:** Never edit files here, never commit to Git

### `dist/`
- **What it is:** Your built app ready for deployment
- **When it's created:** When you run `pnpm build`
- **Contains:** Optimized HTML, CSS, and JavaScript files

## 🔄 File Relationships

How files work together:

```
HTML file (login.html)
    ↓ includes
JavaScript file (login.js)
    ↓ imports
Firebase config (firebase_config.js)
    ↓ uses settings from
Environment file (.env)
```

## 📋 File Naming Conventions

**HTML Files:**
- Use lowercase
- Use hyphens for spaces: `my-page.html`
- Descriptive names: `user-profile.html`

**JavaScript Files:**
- Use lowercase
- Use hyphens for spaces: `auth-guard.js`
- Match HTML names: `login.html` → `login.js`

**CSS Files:**
- Use lowercase
- Descriptive names: `style.css`, `components.css`

## 🔍 How to Navigate the Code

### Finding the right file:

**Want to change a page's content?**
→ Edit the `.html` file

**Want to change a page's behavior?**
→ Edit the corresponding `.js` file in `src/`

**Want to change how pages look?**
→ Edit `src/style.css`

**Want to add Firebase features?**
→ Look at `firebase_config.js` and `auth-guard.js`

**Want to change build settings?**
→ Look at `vite.config.js` or `package.json`

## 🛠️ Working with the Structure

### Adding a new page:

1. **Create HTML file:** `new-page.html` (in root)
2. **Create JS file:** `src/new-page.js`
3. **Link them:** Add `<script>` tag in HTML
4. **Add protection:** Use `requireAuth()` if needed

### Organizing larger projects:

```
src/
├── components/         # Reusable code pieces
├── pages/             # Page-specific logic
├── utils/             # Helper functions
├── auth/              # Authentication related
└── styles/            # CSS files
```

## 📚 Learning More

**To understand each file better:**
- Read the comments in the code
- Look at how files import each other
- Check the [Getting Started guide](getting-started.md) for setup
- See [Adding Pages guide](adding-pages.md) for examples

**Common tasks and where to look:**
- **Adding authentication:** `auth-guard.js`
- **Styling pages:** `src/style.css`
- **Firebase setup:** `firebase_config.js`
- **Build configuration:** `vite.config.js`
- **Deployment settings:** `firebase.json`

## 💡 Pro Tips

**Keep it organized:**
- Group related files together
- Use consistent naming
- Add comments to complex code
- Keep files small and focused

**Don't edit these:**
- `node_modules/` folder
- `dist/` folder (gets rebuilt)
- `.git/` folder

**Safe to customize:**
- All `.html` files
- All files in `src/` folder
- `style.css`
- Build scripts in `package.json`

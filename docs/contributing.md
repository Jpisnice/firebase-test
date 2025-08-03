# 🤝 Contributing Guide

Want to help improve this project? We'd love your contributions! This guide shows you how to contribute, whether you're fixing bugs, adding features, or improving documentation.

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:
- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Git
- A Firebase project for testing

### Setting Up for Development

1. **Fork the repository:**
   - Go to the GitHub page
   - Click "Fork" button
   - This creates your own copy

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/firebase-test.git
   cd firebase-test
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Set up your test environment:**
   ```bash
   cp .env.example .env
   # Fill in your Firebase test project details
   ```

5. **Create a branch for your changes:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

## 🎯 Types of Contributions

### 🐛 Bug Fixes
- Found something broken? Help us fix it!
- Look for issues labeled "bug"
- Include steps to reproduce in your PR

### ✨ New Features
- Have an idea for improvement?
- Check existing issues first
- Discuss major changes before implementing

### 📚 Documentation
- Improve guides and examples
- Fix typos or unclear instructions
- Add missing documentation

### 🧪 Testing
- Add test cases
- Improve testing procedures
- Report testing issues

## 📝 Development Workflow

### Making Changes

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Make your changes:**
   - Edit files as needed
   - Test your changes locally
   - Follow the coding standards below

3. **Test thoroughly:**
   - Test authentication flow
   - Check all pages work
   - Verify no console errors
   - Test on different browsers

4. **Build and test production:**
   ```bash
   npm run build
   pnpm preview
   ```

### Committing Changes

**Good commit messages:**
```bash
git commit -m "Fix: Authentication redirect loop on logout"
git commit -m "Add: Dashboard page with user statistics"
git commit -m "Docs: Update deployment guide for Vercel"
```

**Bad commit messages:**
```bash
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"
```

### Creating a Pull Request

1. **Push your changes:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the template

3. **PR Description should include:**
   - What you changed and why
   - How to test the changes
   - Screenshots if UI changes
   - Any breaking changes

## 🎨 Coding Standards

### JavaScript Style

**Use modern JavaScript:**
```javascript
// ✅ Good - ES6 modules
import { auth } from './firebase_config.js';

// ✅ Good - async/await
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Login error:', error);
    }
};

// ✅ Good - const/let
const userEmail = document.getElementById('email');
let isLoading = false;
```

**Avoid old patterns:**
```javascript
// ❌ Avoid - require()
const firebase = require('firebase');

// ❌ Avoid - var
var email = 'test@example.com';

// ❌ Avoid - callbacks when async/await available
signInWithEmailAndPassword(auth, email, password)
    .then(user => { ... })
    .catch(error => { ... });
```

### HTML Structure

**Use semantic HTML:**
```html
<!-- ✅ Good -->
<main>
    <section class="login-form">
        <h1>Login</h1>
        <form>
            <label for="email">Email:</label>
            <input type="email" id="email" required>
        </form>
    </section>
</main>

<!-- ❌ Avoid -->
<div>
    <div class="title">Login</div>
    <div>
        <input type="text" placeholder="Email">
    </div>
</div>
```

### CSS Guidelines

**Use consistent naming:**
```css
/* ✅ Good - BEM-like naming */
.login-form { }
.login-form__input { }
.login-form__button { }
.login-form__button--disabled { }

/* ✅ Good - meaningful names */
.user-profile { }
.error-message { }
.nav-button { }
```

**Responsive design:**
```css
/* ✅ Mobile-first approach */
.container {
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }
}
```

### File Organization

**Keep files focused:**
- One main purpose per file
- Related functions grouped together
- Clear, descriptive names

**Import organization:**
```javascript
// ✅ Good - grouped imports
// Firebase imports
import { auth } from './firebase_config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Local imports
import { requireAuth } from './auth-guard.js';
import { showError } from './utils.js';

// DOM elements
const emailInput = document.getElementById('email');
```

## 🧪 Testing Your Changes

### Manual Testing Checklist

Before submitting a PR, test:

**Authentication Flow:**
- [ ] Signup with new email
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality

**Page Protection:**
- [ ] Protected pages redirect when not logged in
- [ ] Protected pages accessible when logged in
- [ ] Login/signup redirect when already authenticated

**Cross-Browser Testing:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

### Adding Tests

If you're adding new features, consider adding tests:

```javascript
// Example test structure
import { test, expect } from 'vitest';
import { validateEmail } from '../src/utils.js';

test('validates email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
});
```

## 📋 Pull Request Template

When creating a PR, include:

```markdown
## What Changed
Brief description of your changes

## Why
Explain the motivation for this change

## How to Test
1. Step by step testing instructions
2. Include any special setup needed
3. Mention what to look for

## Screenshots
If UI changes, include before/after screenshots

## Checklist
- [ ] Tested locally
- [ ] No console errors
- [ ] Documentation updated if needed
- [ ] Follows coding standards
```

## 🔍 Code Review Process

### What Reviewers Look For

**Functionality:**
- Does it work as described?
- Are there any edge cases missed?
- Is error handling appropriate?

**Code Quality:**
- Is the code readable and maintainable?
- Are there any performance issues?
- Does it follow project conventions?

**Security:**
- Are there any security vulnerabilities?
- Is user input properly validated?
- Are secrets handled correctly?

### Responding to Feedback

**Be receptive:**
- Feedback helps improve the project
- Ask questions if something is unclear
- Make requested changes promptly

**Discussion is good:**
- Explain your reasoning if you disagree
- Suggest alternatives if needed
- Focus on the code, not personal preferences

## 🏷️ Issue Labels

Understanding our labels:

- `bug` - Something is broken
- `enhancement` - New feature request
- `documentation` - Docs need improvement
- `good first issue` - Great for new contributors
- `help wanted` - We need community help
- `priority: high` - Urgent fixes needed

## 🎯 Areas That Need Help

**High Priority:**
- Bug fixes for authentication issues
- Browser compatibility improvements
- Performance optimizations

**Documentation:**
- More examples for common use cases
- Video tutorials
- FAQ section

**Features:**
- Password reset functionality
- Email verification
- User profile management
- Admin dashboard

**Testing:**
- Automated testing setup
- More comprehensive test cases
- Testing documentation

## 💡 Tips for New Contributors

**Start Small:**
- Look for "good first issue" labels
- Fix typos or improve documentation
- Add small features or improvements

**Ask Questions:**
- Use GitHub issues for questions
- Join community discussions
- Don't hesitate to ask for help

**Learn the Codebase:**
- Read through existing code
- Understand the project structure
- Follow the patterns already established

## 🆘 Getting Help

**Stuck on something?**
- Create an issue describing your problem
- Include what you've tried
- Ask specific questions

**Want to discuss a feature?**
- Open an issue with the "enhancement" label
- Describe the use case
- Propose your solution

**Need code review?**
- Create a draft PR early
- Ask for feedback on your approach
- Iterate based on suggestions

## 🙏 Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! Every contribution, no matter how small, helps make this project better for everyone. 🚀

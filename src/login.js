import { auth } from './firebase_config.js';
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail
} from 'firebase/auth';
import { redirectIfAuthenticated } from './auth-guard.js';

// DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');

// Redirect to protected page if already authenticated
redirectIfAuthenticated();

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Disable form during submission
    setLoading(true);
    hideMessages();
    
    try {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('User signed in successfully:', user.email);
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to home page after successful login
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
        
    } catch (error) {
        console.error('Login error:', error);
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
});

// Handle forgot password
forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('Please enter your email address first');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    try {
        await sendPasswordResetEmail(auth, email);
        showSuccess('Password reset email sent! Check your inbox.');
    } catch (error) {
        console.error('Password reset error:', error);
        handleAuthError(error);
    }
});

// Utility functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function setLoading(loading) {
    loginBtn.disabled = loading;
    loginBtn.textContent = loading ? 'Signing in...' : 'Sign In';
    emailInput.disabled = loading;
    passwordInput.disabled = loading;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleAuthError(error) {
    let message = 'An error occurred during login';
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'No account found with this email address';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address';
            break;
        case 'auth/user-disabled':
            message = 'This account has been disabled';
            break;
        case 'auth/too-many-requests':
            message = 'Too many failed attempts. Please try again later';
            break;
        case 'auth/network-request-failed':
            message = 'Network error. Please check your connection';
            break;
        case 'auth/invalid-credential':
            message = 'Invalid email or password';
            break;
        default:
            message = error.message || 'Login failed. Please try again';
    }
    
    showError(message);
}

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

console.log('Login page loaded and ready');

import { auth } from './firebase_config.js';
import { 
    createUserWithEmailAndPassword, 
    updateProfile
} from 'firebase/auth';
import { redirectIfAuthenticated } from './auth-guard.js';

// DOM elements
const signupForm = document.getElementById('signupForm');
const displayNameInput = document.getElementById('displayName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const signupBtn = document.getElementById('signupBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Password requirement elements
const lengthReq = document.getElementById('length-req');
const uppercaseReq = document.getElementById('uppercase-req');
const lowercaseReq = document.getElementById('lowercase-req');
const numberReq = document.getElementById('number-req');

// Redirect to protected page if already authenticated
redirectIfAuthenticated();

// Password validation in real-time
passwordInput.addEventListener('input', validatePassword);

// Handle form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const displayName = displayNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validation
    if (!displayName || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!isValidPassword(password)) {
        showError('Password does not meet requirements');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Disable form during submission
    setLoading(true);
    hideMessages();
    
    try {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with display name
        await updateProfile(user, {
            displayName: displayName
        });
        
        console.log('User created successfully:', user.email);
        showSuccess('Account created successfully! Redirecting...');
        
        // Redirect to home page after successful signup
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
        
    } catch (error) {
        console.error('Signup error:', error);
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
});

// Validate password requirements
function validatePassword() {
    const password = passwordInput.value;
    
    // Check length
    if (password.length >= 8) {
        lengthReq.className = 'requirement-met';
    } else {
        lengthReq.className = 'requirement-unmet';
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
        uppercaseReq.className = 'requirement-met';
    } else {
        uppercaseReq.className = 'requirement-unmet';
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
        lowercaseReq.className = 'requirement-met';
    } else {
        lowercaseReq.className = 'requirement-unmet';
    }
    
    // Check number
    if (/\d/.test(password)) {
        numberReq.className = 'requirement-met';
    } else {
        numberReq.className = 'requirement-unmet';
    }
}

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
    signupBtn.disabled = loading;
    signupBtn.textContent = loading ? 'Creating Account...' : 'Create Account';
    displayNameInput.disabled = loading;
    emailInput.disabled = loading;
    passwordInput.disabled = loading;
    confirmPasswordInput.disabled = loading;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password);
}

function handleAuthError(error) {
    let message = 'An error occurred during account creation';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = 'An account with this email already exists';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address';
            break;
        case 'auth/operation-not-allowed':
            message = 'Email/password accounts are not enabled';
            break;
        case 'auth/weak-password':
            message = 'Password is too weak';
            break;
        case 'auth/network-request-failed':
            message = 'Network error. Please check your connection';
            break;
        default:
            message = error.message || 'Account creation failed. Please try again';
    }
    
    showError(message);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        signupForm.dispatchEvent(new Event('submit'));
    }
});

console.log('Signup page loaded and ready');

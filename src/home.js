import { auth } from './firebase_config.js';
import { signOut } from 'firebase/auth';
import { requireAuth } from './auth-guard.js';

// DOM elements
const userEmail = document.getElementById('userEmail');
const userDisplayName = document.getElementById('userDisplayName');
const userId = document.getElementById('userId');
const logoutBtn = document.getElementById('logoutBtn');

// Create logout function
const logout = async () => {
    try {
        await signOut(auth);
        console.log('User logged out successfully');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if logout fails
        window.location.href = 'login.html';
    }
};

// Initialize page functionality after authentication
function initializePage(user) {
    console.log('Initializing protected home page for user:', user.email);
    
    // Display user information
    userEmail.textContent = user.email || 'Not provided';
    userDisplayName.textContent = user.displayName || 'Not set';
    userId.textContent = user.uid || 'Unknown';
    
    // Add logout button functionality
    logoutBtn.addEventListener('click', logout);
    
    // You can add more page-specific functionality here
    // For example: load user-specific data, set up real-time listeners, etc.
}

// Protect this page using proven Firebase authentication guard pattern
requireAuth(initializePage);

console.log('Home page script loaded');

import { auth } from './firebase_config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// DOM elements
const loadingStatus = document.getElementById('loadingStatus');
const authenticatedStatus = document.getElementById('authenticatedStatus');
const unauthenticatedStatus = document.getElementById('unauthenticatedStatus');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const userDisplayNameDisplay = document.getElementById('userDisplayNameDisplay');
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

// Flag to prevent multiple event listeners
let logoutListenerAdded = false;

// Listen for authentication state changes (public page - no redirects)
onAuthStateChanged(auth, (user) => {
    // Hide loading status
    loadingStatus.style.display = 'none';
    
    if (user) {
        // User is authenticated
        console.log('Index page: User authenticated', user.email);
        
        // Show authenticated status
        authenticatedStatus.classList.remove('hidden');
        unauthenticatedStatus.classList.add('hidden');
        
        // Display user information
        userEmailDisplay.textContent = user.email || 'Not provided';
        userDisplayNameDisplay.textContent = user.displayName || 'Not set';
        
        // Set up logout functionality (only once)
        if (!logoutListenerAdded) {
            logoutBtn.addEventListener('click', logout);
            logoutListenerAdded = true;
        }
        
    } else {
        // User is not authenticated - just show unauthenticated UI (no redirect)
        console.log('Index page: User not authenticated');
        
        // Show unauthenticated status
        authenticatedStatus.classList.add('hidden');
        unauthenticatedStatus.classList.remove('hidden');
    }
});

console.log('Index page script loaded');

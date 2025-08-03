import { auth } from './firebase_config.js';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Auth guard utility functions for Firebase Authentication
 * Proven patterns to prevent redirect loops and handle authentication state properly
 */

/**
 * Protects a page - redirects to login if user is not authenticated
 * @param {function} onAuthenticated - Callback function when user is authenticated
 * @param {string} redirectUrl - URL to redirect unauthenticated users (default: login.html)
 */
export function requireAuth(onAuthenticated, redirectUrl = 'login.html') {
    let authStateResolved = false;
    
    onAuthStateChanged(auth, (user) => {
        if (authStateResolved) return; // Prevent multiple state changes
        authStateResolved = true;
        
        if (user) {
            console.log('User authenticated:', user.email);
            if (typeof onAuthenticated === 'function') {
                onAuthenticated(user);
            }
        } else {
            console.log('User not authenticated, redirecting to login...');
            // Pass current page as redirect parameter to return after login
            const currentPage = window.location.pathname;
            const redirectParam = currentPage !== '/login.html' && currentPage !== '/signup.html' 
                ? `?redirect=${encodeURIComponent(currentPage)}` 
                : '';
            window.location.href = redirectUrl + redirectParam;
        }
    });
}

/**
 * Redirects to protected area if user is already authenticated
 * Use this on login and signup pages
 * @param {string} redirectUrl - URL to redirect authenticated users (default: home.html)
 */
export function redirectIfAuthenticated(redirectUrl = 'home.html') {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User already authenticated, redirecting...');
            // Check if there's a redirect parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const requestedRedirect = urlParams.get('redirect');
            const finalRedirect = requestedRedirect || redirectUrl;
            window.location.href = finalRedirect;
        }
    });
}

/**
 * Gets the current authentication state without setting up a listener
 * Useful for one-time checks
 * @returns {Promise} Promise that resolves with the current user or null
 */
export function getCurrentUser() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

/**
 * Waits for the authentication state to be resolved
 * Prevents race conditions in authentication checks
 * @returns {Promise} Promise that resolves when auth state is determined
 */
export function waitForAuthState() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

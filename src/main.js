import { auth } from "./firebase_config";
import { onAuthStateChanged } from 'firebase/auth';

// Proper Firebase authentication state listener
// This replaces the incorrect immediate check of auth.currentUser
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    // User is authenticated - page-specific logic should be handled by individual page scripts
  } else {
    console.log("No user is signed in");
    // Don't redirect here - let individual pages handle their own authentication requirements
  }
});

console.log("Main authentication listener initialized");
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} from '@env';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore immediately (no native module dependency)
export const db = getFirestore(app);

// Lazy initialize auth - requires manual initialization trigger
let authReady = false;
let auth = null;

export const initializeAuthAsync = async () => {
  if (authReady) {
    console.log('Auth already initialized');
    return auth;
  }
  
  return new Promise((resolve, reject) => {
    const attemptInit = (delay, attempt = 1) => {
      setTimeout(() => {
        console.log(`Attempting auth initialization (attempt ${attempt}, delay ${delay}ms)`);
        try {
          // Import auth modules only when needed
          const { initializeAuth, getReactNativePersistence, getAuth } = require('firebase/auth');
          const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
          
          console.log('Firebase auth modules loaded');
          
          try {
            auth = initializeAuth(app, {
              persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            });
            console.log('Auth initialized with persistence');
          } catch (error) {
            if (error.code === 'auth/already-initialized') {
              console.log('Auth already initialized, using getAuth()');
              auth = getAuth(app);
            } else {
              throw error;
            }
          }
          
          authReady = true;
          console.log('Auth marked as ready');
          resolve(auth);
        } catch (error) {
          console.error(`Auth initialization error (attempt ${attempt}):`, error.message || error);
          
          // Retry with longer delay if it looks like a timing issue
          if (attempt < 3 && error.message && error.message.includes('not been registered')) {
            const nextDelay = delay * 2; // Exponential backoff
            console.log(`Retrying with delay ${nextDelay}ms...`);
            attemptInit(nextDelay, attempt + 1);
          } else {
            reject(error);
          }
        }
      }, delay);
    };
    
    // Start with 1000ms delay, with exponential backoff on retry
    attemptInit(1000);
  });
};

export const getAuthInstance = () => {
  if (!authReady || !auth) {
    throw new Error('Auth not initialized. Call initializeAuthAsync() first.');
  }
  return auth;
};

// Non-throwing version for checking if auth is ready
export const isAuthReady = () => {
  return authReady && !!auth;
};

export { app };
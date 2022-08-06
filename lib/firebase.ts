import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Get this from project settings (Settings -> Project settings -> Found at the bottom.)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}
function createFirebaseApp(config) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()


export const firestore = getFirestore(firebaseApp)

// Storage exports
export const storage = getStorage(firebaseApp)
export const STATE_CHANGED = 'state_changed'
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
  apiKey: "AIzaSyCpwz2YIz-aYfT1hsb-bNVtSb4lWwIVdq4", authDomain: "task-manager-main.firebaseapp.com", databaseURL: "https://task-manager-main-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "task-manager-main", storageBucket: "task-manager-main.appspot.com", messagingSenderId: "333010177142", appId: "1:333010177142:web:15816512aece6c1669a357", measurementId: "G-LVCXQ2SD1J"
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
import { doc, onSnapshot, getFirestore } from 'firebase/firestore'
import { auth, firestore } from './firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (user) {
      const ref = doc(getFirestore(), 'users', user.uid)
      unsubscribe = onSnapshot(ref, (doc) => {console.log('doc', doc)})
    }

    return unsubscribe
  }, [user])

  return { user, authLoading: loading }
}
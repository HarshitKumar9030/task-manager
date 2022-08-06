import { signInWithPopup } from 'firebase/auth'
import { doc, getFirestore, getDoc, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { auth, googleAuthProvider } from '../lib/firebase'

const Home: NextPage = () => {
  const router = useRouter()

  const { user, authLoading } = useContext(UserContext)
  useEffect(() => {
    if (!authLoading && user) {
      // user is already logged in.
      redirectToDashboard()
    }
  }, [user])
  const redirectToDashboard = () => {
    router.push('/Dashboard')
  }

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {

        writeUserToFirestore(res.user)
      })
      .catch((err) => {
      })
  }

  const writeUserToFirestore = async (currentUser) => {
    const userRef = doc(getFirestore(), 'users', currentUser.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      const userData = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
        isAdmin: false,
      }
      await setDoc(userRef, userData)
      redirectToDashboard()
    } else {
      redirectToDashboard()
    }
  }

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
      })
      .catch((err) => {
      })
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#111827]">
        <main className="flex flex-col items-center justify-center">
          <button
            onClick={signInWithGoogle}
            className="rounded-md border border-white px-4 py-2 text-white"
          >
            Sign in with google
          </button>
        </main>
      </div>
    </>
  )

}

export default Home
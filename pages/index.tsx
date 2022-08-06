import { signInWithPopup } from 'firebase/auth'
import { doc, getFirestore, getDoc, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
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
      <div className="mainScreen h-screen w-screen justify-center items-center flex flex-col bg-white">
        <div className=' px-2 py-2'><Image src="/images/tm-logo.svg" height={75} width={75} /></div>
        <div className="text text-center text-lg text-gray-900 font-medium container w-72 sm:w-80 md:w-96"><span className='font-bold'>TaskManager</span> is one of my side <span className='underline' onClick={()=> router.push('https://github.com/harshitkumar9030')}>projects</span>, And It is basically for not letting me get distract lol. And Yeah It is quite useful for me</div>
        <div className="mt-2">
          <button onClick={signInWithGoogle} className='px-4 py-2 hover:bg-blue-100/90 rounded-lg transition-all duration-300 bg-white flex space-x-2'>
            <Image src={'/images/logo-google.svg'} width={30} height={30} />
            <span className='text-base mt-0.5 font-bold tracking-wide text-gray-900 hover:text-black'>Sign in with Google</span>
          </button>
          {/* <button onClick={signInWithGoogle} className='px-4 py-2 mt-3 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 bg-gray-700 flex space-x-2'>
            <Image src={'/images/logo-github-light.svg'} width={30} height={30} />
            <span className='text-base mt-0.5 font-bold tracking-wide'>Sign in with Github</span>
          </button> */}
        </div>
      </div>
    </>
  )

}

export default Home
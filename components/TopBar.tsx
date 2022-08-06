import React from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import { useEffect, useContext, useState } from 'react'

const TopBar = () => {
  const router = useRouter()

  const { user, authLoading } = useContext(UserContext)
  useEffect(() => {
    if (!authLoading && !user) {
      redirectToLogin()
    }
  }, [authLoading, user])


  const redirectToLogin = () => {
    router.push('/')
  }
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/')
      })
      .catch((err) => {
      })
  }
  const [URL, setURL] = useState()
  useEffect(() => {
  if(user){
    setURL(user.photoURL)
  }else{
    setURL('https://i.pravatar.cc/300')
  }
}), [user]
  return (
    <div className='absolute top-0 bg-white w-full rounded-b-xl flex justify-between h-14'>
      <div className="parentMost-left items-center md:ml-16 ml-4 space-x-4 flex">
        <img className="w-10 h-10" src="./images/tm-logo.svg" alt="" />
        <span className='text-base font-normal cursor-pointer underline-offset-1 tracking-wide hover:underline '>Tasks</span>
        <span className='text-base font-normal cursor-pointer underline-offset-1 tracking-wide hover:underline '>About</span>
      </div>
      <div className="parentMost-right flex space-x-4 items-center md:mr-16 mr-4">
        <button className='md:px-4 md:py-2 py-2 px-3 bg-white text-gray-700 hover:text-gray-900 duration-300 hover:bg-gray-200 border border-x-gray-200 rounded-lg' onClick={signOut}>Sign Out</button>
        <img className='rounded-full w-10 h-10' src={URL} alt="profile-image" />
      </div>
    </div>
  )
}

export default TopBar
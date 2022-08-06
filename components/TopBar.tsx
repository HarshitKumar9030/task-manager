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
  const [isOpen, setisOpen] = useState(false)
  const handleHover = () => {
    setisOpen(!isOpen)
  }
  useEffect(() => {
    if (user) {
      setURL(user.photoURL)
    } else {
      setURL('https://i.pravatar.cc/300')
    }
  }), [user]
  return (
    <div className='absolute top-0 bg-white z-50 w-full rounded-b-xl flex justify-between h-14'>
      <div className="parentMost-left items-center md:ml-16 ml-4 space-x-4 flex">
        <img className="w-10 h-10" src="./images/tm-logo.svg" alt="" />
        <span className='text-base font-normal cursor-pointer underline-offset-1 tracking-wide hover:underline '>Tasks</span>
        <span className='text-base font-normal cursor-pointer underline-offset-1 tracking-wide hover:underline '>About</span>
      </div>
      <div className="parentMost-right flex space-x-4 items-center md:mr-16 mr-4">
        <button className='md:px-4 md:py-2 py-2 px-3 bg-white text-gray-700 hover:text-gray-900 duration-300 hover:bg-gray-200 border border-x-gray-200 rounded-lg' onClick={signOut}>Sign Out</button>
        <img onClick={handleHover} className='rounded-full cursor-pointer w-10 h-10' src={URL} alt="profile-image" />
        {isOpen && <div className='absolute right-2 md:right-16 top-[56px] bg-white rounded-lg'>
          <ul className='flex flex-col'>
            <li className='flex text-base bg-gray-50 text-gray-700 rounded-t-lg hover:bg-gray-900 duration-100 hover:text-white font-semibold ease-out cursor-pointer px-3 py-2 '>My account &nbsp;<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg></li>
            <li className='flex text-base bg-gray-50 text-gray-700 rounded-b-lg hover:bg-gray-900 duration-100 hover:text-white font-semibold ease-out cursor-pointer px-3 py-2 '>Coming Soon &nbsp;<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg></li>
          </ul></div>}

      </div>
    </div>
  )
}

export default TopBar
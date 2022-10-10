import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import TopBar from '../components/TopBar'

const Dashboard: NextPage = () => {
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

  return (
    <>
    <TopBar />
    <div className="flex h-screen w-full bg-blue-50">
      <div className="beforeConPanel w-full flex flex-col absolute mt-28 px-4 md:px-16">
        <span className='hover:underline font-normal absolute text-base underline-offset-1 cursor-pointer'>Tasks</span>
        <div className="Strip-1 flex mt-8 w-full flex-row justify-between">
          <div className='text-3xl md:text-4xl font-bold text-gray-900'>Latest Tasks</div>
          <button className='py-2 px-3 sm:px-4 bg-gray-900 md:hover:shadow-md hover:shadow-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-bold'>+ Add Task</button>
        </div>
        <div className="Panel flex flex-col px-16 text-center py-16 bg-white hover:shadow-md duration-300 mt-6 rounded-lg items-center justify-center w-full">
          <div className="headLine text-xl font-semibold text-gray-900 tracking-wide">You have&apost added any tasks yet.</div>
          <div className="belowHead mt-2 tracking-wide text-gray-500 font-medium text-lg">Welcome 👋, Get started.</div>
          <button className='py-2 px-3 sm:px-4 bg-gray-900 md:hover:shadow-md hover:shadow-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all mt-2 duration-300 font-bold'>+ Add Your First Task</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard


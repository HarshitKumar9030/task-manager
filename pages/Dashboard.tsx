import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import TopBar from '../components/TopBar'
import Container from '../components/Container'

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
    <div className="flex h-screen w-full bg-blue-100">
      <div className="beforeConPanel w-full flex absolute mt-28 px-4 md:px-16">
        <span className='hover:underline font-normal absolute text-base underline-offset-1 cursor-pointer'>Tasks</span>
        <div className="Strip-1 flex mt-8 w-full flex-row justify-between">
          <div className='text-3xl md:text-4xl font-bold text-gray-900'>Latest Tasks</div>
          <button className='py-2 px-4 bg-gray-900 md:hover:scale-105 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-bold'>+ Add Task</button>
        </div>
      </div>
      <Container user={user} />
    </div>
    </>
  )
}

export default Dashboard


import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

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
    <div className="flex h-screen w-full items-center justify-center bg-[#111827]">
      <main className="flex flex-col items-center justify-center">
        <p className="text-white">Dashboard</p>
        <button
          onClick={signOut}
          className="rounded-md border border-white px-4 py-2 text-white"
        >
          Signout
        </button>
      </main>
    </div>
  )
}

export default Dashboard


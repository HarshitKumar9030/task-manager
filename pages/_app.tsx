import 'regenerator-runtime/runtime'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  return (
    <>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
import React from 'react'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const Container = ({ user }) => {
    const router = useRouter()


    const redirectToLogin = () => {
        router.push('/')
        return (
            <>
                <div className="main">
                    
                </div>
            </>
        )
    }
}

export default Container
import React from 'react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const account = () => {
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

    const [Show, setShow] = useState(false)
    const [Uid, setUid] = useState()
    const handleShow = () => {
        setShow(!Show)
    }
    useEffect(() => {
        if (!Show) {
            let cut = '******************************'
            setUid(cut)
        } else {
            setUid(user?.uid)
        }
    }, [Show])

    return (
        <>
            <div className="main bg-blue-50 mt-0 h-screen w-full">
                <div onClick={() => router.push('/Dashboard')} className="bottom-0 fixed hover:text-blue-600 cursor-pointer items-center flex ml-4 left-2 text-blue-500 text-4xl font-bold">Go back <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-2  w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg></div>

                <div className="myAccount text-5xl flex text-gray-900 font-bold tracking-wide py-2 justify-center">My Account</div>
                <div className="area mt-6 px-16 py-16 bg-white mx-4 rounded-lg hover:shadow-md">
                    <div className="content flex flex-col mx-2">
                        <div className="text-xl mt-2 ml-2 flex">UserName: <span className="text-blue-600">&nbsp; {user?.displayName}</span></div>
                        <div className="text-xl mt-2 ml-2 flex">Email: <span className="text-blue-600">&nbsp; {user?.email}</span></div>
                        <div className="text-xl mt-2 ml-2 flex">Uid: <span className="text-blue-600">&nbsp; {Uid}</span>
                            <span className="ml-2">
                                {!Show && <svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" className="h-8 text-gray-900 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>}
                                {Show && <svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" className="h-8 cursor-pointer text-gray-900 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default account
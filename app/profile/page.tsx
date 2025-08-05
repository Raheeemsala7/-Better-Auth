import { SignOutButton } from '@/components/sign-out-'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const Page = async() => {

    const session = await auth.api.getSession({
        headers : await headers()
    })


    if (!session) {
        return <h1 className="text-destructive">405 Unauthorized</h1>
    }


    return (

        <div className="max-w-7xl py-16 px-8 mx-auto space-y-8">
            <div className='space-y-8'>
                <h2><SignOutButton /></h2>
                <h2 className='text-3xl bold'>Profile </h2>
            </div>

            <pre className="text-sm overflow-clip ">
                {JSON.stringify(session, null, 2)}
            </pre>


        </div>
    )
}

export default Page
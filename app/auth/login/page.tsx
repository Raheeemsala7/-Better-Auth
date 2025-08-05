import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const Page = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 lg:px-6'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold'>Login From</h1>
            </div>

            <LoginForm />

        </div>
    )
}

export default Page
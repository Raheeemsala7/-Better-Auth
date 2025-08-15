"use client"
import React, { useTransition } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { toast } from 'sonner'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignInWithEmail } from '@/app/actions/signin-email'
import { tryCatch } from '@/hooks/tryCatch'

const LoginForm = () => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        startTransition(async () => {
            const { data, error } = await tryCatch(SignInWithEmail(formData))

            if (data?.status === "success") {

                toast.success(data?.message)
                router.push('/profile')

            } else {
                toast.error(data?.message)
            }

        })


    }
    return (
        <form onSubmit={handelSubmit} className='flex flex-col gap-4 max-w-sm w-full mt-8'>
            <div className="space-y-2">
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' placeholder='Enter your Email' />
            </div>
            <div className="space-y-2">
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' placeholder='Enter your password' />
            </div>

            <Button disabled={isPending} >
                {isPending ?
                    <Loader2 className='size-4 animate-spin transition-all' />
                    :
                    ""
                }
                Register
            </Button>

        </form>
    )
}

export default LoginForm
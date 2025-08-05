"use client"
import React, { useTransition } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { toast } from 'sonner'
import { signUp } from '@/lib/auth-client'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const name = String(formData.get("name"))
        const email = String(formData.get("email"))
        const password = String(formData.get("password"))

        if (!name) return toast.error("Prease Enter Name")
        if (!email) return toast.error("Prease Enter Email")
        if (!password) return toast.error("Prease Enter Password")

        startTransition(async () => {
            await signUp.email({
                email, // user email address
                password, // user password -> min 8 characters by default
                name, // user display name
            }, {
                onRequest: (ctx) => {
                    //show loading
                },
                onSuccess: (ctx) => {
                    //redirect to the dashboard or sign in page
                    toast.success("Sucessfully create Account");
                    router.push("/auth/login")
                },
                onError: (ctx) => {
                    // display the error message
                    toast.error(ctx.error.message);
                },
            });

        })


        console.log({ name, email, password })


    }
    return (
        <form onSubmit={handelSubmit} className='flex flex-col gap-4 max-w-sm w-full'>
            <div className="space-y-2">
                <Label htmlFor='name'>Name</Label>
                <Input id='name' name='name' type='text' placeholder='Enter your name' />
            </div>
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

export default RegisterForm
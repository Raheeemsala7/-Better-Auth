import RegisterForm from '@/components/RegisterForm'
import { SignInOauthButton } from '@/components/sign-in-oauth-button'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-4">
                <Button size="icon" asChild>
                    <Link href="/">
                        <ArrowLeftIcon />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">Register</h1>
            </div>

            <RegisterForm />

            <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="hover:text-foreground">
                    Login
                </Link>
            </p>

            <hr className="max-w-sm" />

            <div className="flex flex-col max-w-sm gap-4">
                <SignInOauthButton provider="google" signUp />
                <SignInOauthButton provider="github" signUp />
            </div>

        </div>
    )
}

export default Page
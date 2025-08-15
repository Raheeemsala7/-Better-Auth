import LoginForm from '@/components/LoginForm'
import { SignInOauthButton } from '@/components/sign-in-oauth-button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-4">
                {/* <ReturnButton href="/" label="Home" /> */}

                <h1 className="text-3xl font-bold">Login</h1>
            </div>

            <div className="space-y-4">
                <LoginForm />

                <p className="text-muted-foreground text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="hover:text-foreground">
                        Register
                    </Link>
                </p>
            </div>

            <hr className="max-w-sm" />

            <div className="flex flex-col max-w-sm gap-4">
                <SignInOauthButton provider="google" />
                <SignInOauthButton provider="github" />
            </div>
        </div>
    )
}

export default Page
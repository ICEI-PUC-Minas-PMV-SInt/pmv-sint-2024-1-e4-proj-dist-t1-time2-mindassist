import { SignIn } from '@clerk/nextjs'
import React from 'react'

const LoginPage = () => {
  return (
    <main className="flex w-full justify-center items-center">
      <SignIn />
    </main>
  )
}

export default LoginPage

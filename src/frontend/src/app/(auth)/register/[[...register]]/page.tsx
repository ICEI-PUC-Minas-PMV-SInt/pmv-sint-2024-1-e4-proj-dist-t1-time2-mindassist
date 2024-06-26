import { SignUp } from '@clerk/nextjs'

const RegisterPage = () => {
  return (
    <main className="flex w-full justify-center items-center">
      <SignUp />
    </main>
  )
}

export default RegisterPage

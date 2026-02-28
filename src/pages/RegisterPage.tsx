import { SignupForm } from "../components/signup-form"

export const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full items-cen ter justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

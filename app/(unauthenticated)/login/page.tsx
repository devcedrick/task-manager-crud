import React from 'react'
import AuthForm from '@/components/auth-form/AuthForm';

const LoginPage = () => {

  return (
    <div className="h-screen w-full flex items-center justify-center text-white">
      <AuthForm isSignIn={true} />
    </div>
  )
}

export default LoginPage;

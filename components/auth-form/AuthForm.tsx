"use client"
import React, {useEffect, useState} from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  isSignIn?: boolean;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({isSignIn}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const router = useRouter();
  const { loading, signUp, session, signIn } = useAuth();

  useEffect(() => {
    if(!loading && session){
      router.push('/');
    }
  }, [session, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!isSignIn) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const result = await signUp(
        formData.email,
        formData.password,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
        
      );

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // If email confirmation is enabled, session may be null until user confirms.
      if (!result.session) {
        setNotice('Check your email to confirm your account.');
        // Optionally navigate to login page
        // router.push('/login?checkEmail=1');
        return;
      }

      router.push('/');
    }

    signIn(formData.email, formData.password);
  }

  return (
    <div className="h-screen w-full flex items-center justify-center text-white">
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-100 h-auto bg-surface border border-border p-8 rounded-lg'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold'>
            {isSignIn ? 'Sign In' : 'Create an account'}
          </h1>
          <p className='text-xs text-gray-600 mb-2'>
            {isSignIn ? "Glad to see you again. Sign in to continue." : "Create an account to get started — it only takes a few seconds!"}
          </p>
          {error && <p className='text-xs text-red-500'>{error}</p>}
          {notice && <p className='text-xs text-green-500'>{notice}</p>}
        </div>
        <div className='flex flex-col gap-4'>
          {
            !isSignIn ? (
              <>
                <input type="text" className='input input-focus' placeholder='First Name' 
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({...formData, firstName: e.target.value})
                  }} />
                <input type="text" className='input input-focus' placeholder='Last Name'
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({...formData, lastName: e.target.value})
                  }} />
              </>
            ) : (<></>)
          }
          <input type="email" className='input input-focus' placeholder='Email' required 
            value={formData.email} 
            onChange={(e) => {
              setFormData({...formData, email: e.target.value})
            }}/>
          <input type="password" className='input input-focus' placeholder='Password'
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({...formData, password: e.target.value})
            }}/>
          {
            !isSignIn && <input type="password" className='input input-focus' required placeholder='Confirm Password' 
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({...formData, confirmPassword: e.target.value})
            }}/>
          }
        </div>
        <button type='submit' className='button bg-accent text-background hover:bg-accent-600 transition-colors mt-2'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='text-xs mt-4 text-center'>
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          {
            isSignIn ?  <a href="/signup" className='text-accent hover:underline'>Register</a> :
            <a href="/login" className='text-accent hover:underline'>Sign In</a>
          } 
        </p>
      </form>
    </div>
  )
}

export default AuthForm

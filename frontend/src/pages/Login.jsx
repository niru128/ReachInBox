import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();
  return (
    <div className='h-screen flex items-center justify-center bg-gray-200' >
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <h1 className='text-2xl font-bold mb-6'>Login to ReachInBox</h1>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);

            const userData = {
              name: decoded.name,
              email: decoded.email,
              avatar: decoded.picture
            }
            login(decoded);
            navigate('/dashboard');
          }}
          onError={() => {
            alert("Login Failed")
          }}
        />
      </div>
    </div>
  )
}

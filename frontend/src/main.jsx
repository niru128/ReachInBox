import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1048258533982-nc41h9mm6abvff8bcf21drfo3kg8kgrs.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
)

// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
// import { Button } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

    </Routes>

    </>
  )
}

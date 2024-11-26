// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
// import { Button } from '@mui/material'
// import { axiosInstance } from './lib/axios'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/MainLayout'
import ChatPage from './pages/chat/ChatPage'

export default function App() {
  // token
  // const getSomeData = async() => {
  //   await axiosInstance.get("/users",{
  //     headers:{
  //       "Authorization": `Bearer ${token}`
  //     }
  //   });
  //   console.log(res)
  // }
  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  )
}

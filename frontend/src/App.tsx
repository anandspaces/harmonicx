// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
// import { Button } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
// import { axiosInstance } from './lib/axios'

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
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

    </Routes>

    </>
  )
}

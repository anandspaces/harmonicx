import { useSignIn } from '@clerk/clerk-react'
import { Button } from '@mui/material'
import React from 'react'

const SignInOAuthButtons = () => {
  const {signIn,isLoaded} = useSignIn()
  if(!isLoaded){
    return null
  }
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
        strategy:"oauth_google",
        redirectUrl:"/sso-callback",
        redirectUrlComplete: "/auth-callback"
    })
  }
    return (
    // <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
    <Button onClick={signInWithGoogle} className="w-full text-white border-zinc-200 h-11">
       continue with google 
    </Button>
  )
}

export default SignInOAuthButtons
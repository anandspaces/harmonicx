
const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	if (import.meta.env.MODE !== "development") {
		return null;
	}
	
	return (
    <button
      onClick={signInWithGoogle}
      className="flex w-60 h-11 items-center justify-center gap-3 rounded-lg border border-zinc-700 
      bg-zinc-800 text-white transition hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-600"
    >
      <img src="/google.png" alt="Google" className="h-5 w-5" />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
};
export default SignInOAuthButtons;

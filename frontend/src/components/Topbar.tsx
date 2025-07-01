import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "../stores/useAuthStore";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	console.log({ isAdmin });
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };
	return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-semibold">
        <img src="/harmonic.png" className="h-8 w-8" alt="HarmonicX logo" />
        <span>HarmonicX</span>
      </div>

      {/* Right Side: Admin Dashboard, OAuth, and User Button */}
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg text-white 
            hover:bg-zinc-800 transition"
          >
            <LayoutDashboardIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Admin Dashboard</span>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
        <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Login with Google</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign in with Google Oauth
      </button>
    </div>
      </div>
    </div>
  );
};
export default Topbar;

import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import SignInOAuthButtons from "../components/SignInOAuthButtons";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	console.log({ isAdmin });

	return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-white font-semibold">
        <img src="/harmonic.png" className="h-8 w-8" alt="HarmonicX logo" />
        <span>HarmonicX</span>
      </div>

      {/* Right Section: Admin Dashboard, OAuth, and User Button */}
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <LayoutDashboardIcon className="w-4 h-4" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";

const AuthCallback = () => {
	const { user, isLoaded } = useUser();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	
	// Handle Google OAuth callback
	useEffect(() => {
		const name = searchParams.get("name");
		const email = searchParams.get("email");
		const token = searchParams.get("token");
		
		if (name && email && token) {
			// This is a Google OAuth callback
			// Store the token in localStorage
			localStorage.setItem("auth_token", token);
			localStorage.setItem("user_name", name);
			localStorage.setItem("user_email", email);
			
			// Update axios default headers
			axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			
			// Redirect to home page
			navigate("/");
			return;
		}
		
		// Handle auth callback
		const handleCallback = async () => {
			if (isLoaded && user) {
				try {
					// Register the user in our backend
					await axiosInstance.post("/auth/callback", {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						imageUrl: user.imageUrl,
						email: user.primaryEmailAddress?.emailAddress,
					});
					
					// Redirect to home page
					navigate("/");
				} catch (error) {
					console.error("Error in auth callback", error);
				}
			}
		};
		
		handleCallback();
	}, [isLoaded, user, navigate, searchParams]);
	
	return (
		<div className="h-screen flex items-center justify-center bg-zinc-900">
			<div className="text-center">
				<Loader className="mx-auto h-8 w-8 animate-spin text-emerald-500" />
				<p className="mt-4 text-zinc-400">Setting up your account...</p>
			</div>
		</div>
	);
};

export default AuthCallback;

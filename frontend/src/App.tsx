import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/Chat";
import Album from "./pages/Album";
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
					/>
				<Route path='/auth-callback' element={<AuthCallback />} />
				<Route path='/admin' element={<Admin />} />

				<Route element={<MainLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/chat' element={<Chat />} />
					<Route path='/albums/:albumId' element={<Album />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
			<Toaster />
		</Router>
	);
}

export default App;

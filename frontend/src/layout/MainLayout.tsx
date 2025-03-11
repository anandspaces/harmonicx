import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import LeftSidebar from "../components/LeftSidebar";
import FriendsActivity from "../components/FriendsActivity";
import { PlaybackControls } from "../components/PlaybackControls";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className="h-screen bg-black text-white flex flex-col">
			<AudioPlayer />

			{/* Main Layout */}
			<div className="flex flex-1 overflow-hidden p-2 gap-2">
				{/* Left Sidebar */}
				{!isMobile && (
					<div className="w-1/5 min-w-[200px] max-w-[300px] bg-zinc-900 rounded-lg overflow-hidden">
						<LeftSidebar />
					</div>
				)}

				{/* Main Content */}
				<div className="flex-1 bg-zinc-800 rounded-lg overflow-auto">
					<Outlet />
				</div>

				{/* Right Sidebar (Friends Activity) */}
				{!isMobile && (
					<div className="w-1/5 min-w-[200px] max-w-[250px] bg-zinc-900 rounded-lg overflow-hidden">
						<FriendsActivity />
					</div>
				)}
			</div>

			{/* Playback Controls */}
			<PlaybackControls />
		</div>
	);
};
export default MainLayout;

import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useMusicStore } from "../stores/useMusicStore";
import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import { Album, Music } from "lucide-react";
import SongsTabContent from "../components/SongsTabContent";
import AlbumsTabContent from "../components/AlbumsTabContent";

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
  const [activeTab, setActiveTab] = useState<"songs" | "albums">("songs");

	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);

	if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
			<Header />
			<DashboardStats />

			<div className="space-y-6">
				{/* Tabs List */}
				<div className="flex bg-zinc-800/50 p-1 rounded-lg">
					<button
						onClick={() => setActiveTab("songs")}
						className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
							activeTab === "songs" ? "bg-zinc-700 text-white" : "hover:bg-zinc-700/50"
						}`}
					>
						<Music className="size-4" />
						Songs
					</button>
					<button
						onClick={() => setActiveTab("albums")}
						className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
							activeTab === "albums" ? "bg-zinc-700 text-white" : "hover:bg-zinc-700/50"
						}`}
					>
						<Album className="size-4" />
						Albums
					</button>
				</div>

				{/* Tabs Content */}
				{activeTab === "songs" && <SongsTabContent />}
				{activeTab === "albums" && <AlbumsTabContent />}
			</div>
		</div>
	);
};
export default AdminPage;

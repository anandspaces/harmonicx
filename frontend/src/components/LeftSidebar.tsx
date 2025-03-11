import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMusicStore } from "../stores/useMusicStore";
import ScrollArea from "./Scrollarea";
import PlaylistSkeleton from "./PlaylistSkeleton";

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	console.log({ albums });

	return (
		<div className="h-full flex flex-col gap-2">
			{/* Navigation menu */}
			<div className="rounded-lg bg-zinc-900 p-4">
				<div className="space-y-2">
					<Link
						to="/"
						className="flex items-center w-full px-4 py-2 text-white bg-transparent hover:bg-zinc-800 rounded-md transition"
					>
						<HomeIcon className="mr-2 h-5 w-5" />
						<span className="hidden md:inline">Home</span>
					</Link>

					<SignedIn>
						<Link
							to="/chat"
							className="flex items-center w-full px-4 py-2 text-white bg-transparent hover:bg-zinc-800 rounded-md transition"
						>
							<MessageCircle className="mr-2 h-5 w-5" />
							<span className="hidden md:inline">Messages</span>
						</Link>
					</SignedIn>
				</div>
			</div>

			{/* Library section */}
			<div className="flex-1 rounded-lg bg-zinc-900 p-4">
				<div className="flex items-center justify-between mb-4 px-2 text-white">
					<Library className="mr-2 h-5 w-5" />
					<span className="hidden md:inline">Playlists</span>
				</div>

				<ScrollArea className="h-[calc(100vh-300px)]">
					<div className="space-y-2">
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-md group cursor-pointer"
								>
									<img
										src={album.imageUrl}
										alt={album.title}
										className="h-12 w-12 rounded-md object-cover"
									/>
									<div className="flex-1 min-w-0 hidden md:block">
										<p className="font-medium truncate">{album.title}</p>
										<p className="text-sm text-zinc-400 truncate">
											Album • {album.artist}
										</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
export default LeftSidebar;

import { useEffect } from "react";
import { useMusicStore } from "../stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse border border-zinc-700">
				{/* Table Header */}
				<thead className="bg-zinc-800 text-white">
					<tr className="border-b border-zinc-700">
						<th className="w-[50px] p-3"></th>
						<th className="p-3 text-left">Title</th>
						<th className="p-3 text-left">Artist</th>
						<th className="p-3 text-left">Release Year</th>
						<th className="p-3 text-left">Songs</th>
						<th className="p-3 text-right">Actions</th>
					</tr>
				</thead>

				{/* Table Body */}
				<tbody>
					{albums.map((album) => (
						<tr key={album._id} className="border-b border-zinc-700 hover:bg-zinc-800/50">
							<td className="p-3">
								<img src={album.imageUrl} alt={album.title} className="w-10 h-10 rounded object-cover" />
							</td>
							<td className="p-3 font-medium text-white">{album.title}</td>
							<td className="p-3 text-zinc-300">{album.artist}</td>
							<td className="p-3 text-zinc-400 flex items-center gap-1">
								<Calendar className="h-4 w-4 text-zinc-500" />
								{album.releaseYear}
							</td>
							<td className="p-3 text-zinc-400 flex items-center gap-1">
								<Music className="h-4 w-4 text-zinc-500" />
								{album.songs.length} songs
							</td>
							<td className="p-3 text-right">
								<button
									onClick={() => deleteAlbum(album._id)}
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default AlbumsTable;

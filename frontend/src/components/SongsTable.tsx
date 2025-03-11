import { useMusicStore } from "../stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
	const { songs, isLoading, error, deleteSong } = useMusicStore();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading songs...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse">
				{/* Table Head */}
				<thead>
					<tr className="bg-zinc-900 text-zinc-400 text-sm border-b border-zinc-700">
						<th className="w-14 p-3"></th>
						<th className="p-3 text-left">Title</th>
						<th className="p-3 text-left">Artist</th>
						<th className="p-3 text-left">Release Date</th>
						<th className="p-3 text-right">Actions</th>
					</tr>
				</thead>

				{/* Table Body */}
				<tbody>
					{songs.map((song) => (
						<tr
							key={song._id}
							className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
						>
							<td className="p-3">
								<img src={song.imageUrl} alt={song.title} className="w-10 h-10 rounded object-cover" />
							</td>
							<td className="p-3 font-medium text-white">{song.title}</td>
							<td className="p-3 text-zinc-300">{song.artist}</td>
							<td className="p-3 text-zinc-300 flex items-center gap-1">
								<Calendar className="w-4 h-4 text-zinc-400" />
								{song.createdAt.split("T")[0]}
							</td>
							<td className="p-3 text-right">
								<button
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded transition"
									onClick={() => deleteSong(song._id)}
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default SongsTable;

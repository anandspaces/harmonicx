import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
	return (
		<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6">
			{/* Header Section */}
			<div className="flex items-center justify-between border-b border-zinc-700 pb-4 mb-4">
				<div>
					<h2 className="flex items-center gap-2 text-lg font-semibold text-white">
						<Music className="w-5 h-5 text-emerald-500" />
						Songs Library
					</h2>
					<p className="text-sm text-zinc-400">Manage your music tracks</p>
				</div>
				<AddSongDialog />
			</div>

			{/* Table Section */}
			<SongsTable />
		</div>
	);
};
export default SongsTabContent;

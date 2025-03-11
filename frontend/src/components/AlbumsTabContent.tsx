import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
	return (
		<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-6 shadow-md">
			{/* Header Section */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-lg font-semibold text-white flex items-center gap-2">
						<Library className="h-5 w-5 text-violet-500" />
						Albums Library
					</h2>
					<p className="text-sm text-zinc-400">Manage your album collection</p>
				</div>
				<AddAlbumDialog />
			</div>

			{/* Content Section */}
			<div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
				<AlbumsTable />
			</div>
		</div>
	);
};

export default AlbumsTabContent;

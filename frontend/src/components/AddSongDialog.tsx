import { useRef, useState } from "react";
import { useMusicStore } from "../stores/useMusicStore";
import toast from "react-hot-toast";
import { Plus, Upload } from "lucide-react";
import { axiosInstance } from "../lib/axios";

interface NewSong {
	title: string;
	artist: string;
	album: string;
	duration: string;
}

const AddSongDialog = () => {
	const { albums } = useMusicStore();
	const [songDialogOpen, setSongDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState<NewSong>({
		title: "",
		artist: "",
		album: "",
		duration: "0",
	});

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});

	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!files.audio || !files.image) {
				return toast.error("Please upload both audio and image files");
			}

			const formData = new FormData();

			formData.append("title", newSong.title);
			formData.append("artist", newSong.artist);
			formData.append("duration", newSong.duration);
			if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}

			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance.post("/admin/songs", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewSong({
				title: "",
				artist: "",
				album: "",
				duration: "0",
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<button
				className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg flex items-center"
				onClick={() => setSongDialogOpen(true)}
			>
				<Plus className="mr-2 h-4 w-4" />
				Add Song
			</button>

			{songDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full p-6 rounded-lg shadow-lg">
						<h2 className="text-lg font-semibold text-white">Add New Song</h2>
						<p className="text-sm text-zinc-400 mb-4">Add a new song to your music library</p>

						{/* Hidden file inputs */}
						<input
							type="file"
							accept="audio/*"
							ref={audioInputRef}
							hidden
							onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
						/>
						<input
							type="file"
							ref={imageInputRef}
							hidden
							accept="image/*"
							onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
						/>

						{/* Image upload area */}
						<div
							className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer mb-4"
							onClick={() => imageInputRef.current?.click()}
						>
							{files.image ? (
								<p className="text-sm text-emerald-500">Selected: {files.image.name.slice(0, 20)}</p>
							) : (
								<>
									<Upload className="h-6 w-6 text-zinc-400" />
									<p className="text-sm text-zinc-400">Upload artwork</p>
								</>
							)}
						</div>

						{/* Audio upload */}
						<div className="mb-4">
							<label className="text-sm font-medium text-white">Audio File</label>
							<button
								onClick={() => audioInputRef.current?.click()}
								className="w-full mt-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm"
							>
								{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
							</button>
						</div>

						{/* Input Fields */}
						<div className="space-y-3">
							<div>
								<label className="text-sm font-medium text-white">Title</label>
								<input
									value={newSong.title}
									onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
									className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-white">Artist</label>
								<input
									value={newSong.artist}
									onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
									className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-white">Duration (seconds)</label>
								<input
									type="number"
									min="0"
									value={newSong.duration}
									onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
									className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
								/>
							</div>

							{/* Album Selection */}
							<div>
								<label className="text-sm font-medium text-white">Album (Optional)</label>
								<select
									value={newSong.album}
									onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
									className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
								>
									<option value="none">No Album (Single)</option>
									{albums.map((album) => (
										<option key={album._id} value={album._id}>
											{album.title}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Footer Buttons */}
						<div className="flex justify-end space-x-2 mt-6">
							<button
								onClick={() => setSongDialogOpen(false)}
								className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white text-sm"
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-black text-sm"
								disabled={isLoading}
							>
								{isLoading ? "Uploading..." : "Add Song"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default AddSongDialog;

import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const AddAlbumDialog = () => {
	const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image");
			}

			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/albums", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Album created successfully");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
    <>
      <button
        onClick={() => setAlbumDialogOpen(true)}
        className="flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md transition"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Album
      </button>

      {albumDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Add New Album</h2>
            <p className="text-zinc-400 text-sm mb-4">Fill in the details to add a new album.</p>

            {/* Image Upload */}
            <div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-violet-500 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <Upload className="h-8 w-8 text-zinc-400 mb-2" />
              <p className="text-sm text-zinc-400">{imageFile ? imageFile.name : "Upload album artwork"}</p>
            </div>

            {/* Album Details */}
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-zinc-400">Album Title</label>
                <input
                  type="text"
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-violet-500 text-white"
                  placeholder="Enter album title"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Artist</label>
                <input
                  type="text"
                  value={newAlbum.artist}
                  onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-violet-500 text-white"
                  placeholder="Enter artist name"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Release Year</label>
                <input
                  type="number"
                  value={newAlbum.releaseYear}
                  onChange={(e) =>
                    setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })
                  }
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-violet-500 text-white"
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setAlbumDialogOpen(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition disabled:opacity-50"
                disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
              >
                {isLoading ? "Creating..." : "Add Album"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddAlbumDialog;

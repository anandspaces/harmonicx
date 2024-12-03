import { Button } from "@mui/material";
import { Song } from "../../../types";
import SectionGridSkeleton from "./SectionGridSkeleton";

type SectionGridProps = {
  title:string;
  songs:Song[];
  isLoading:boolean;
}
const SectionGrid = ({songs,title,isLoading}:SectionGridProps) => {
  if(isLoading) return <SectionGridSkeleton />
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">title</h2>
        <Button className="text-sm text-zinc-400 hover:text-white">
          Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square">
                <img 
                  src={songs.imageUrl}
                  alt={songs.title}
                  className="w-full h-full obkect-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </div>

          </div>

        ))}
      </div>
    </div>
  )
}

export default SectionGrid
import { SignedIn } from '@clerk/clerk-react'
import { Slide } from '@mui/material'
import { HomeIcon, Library, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMusicStore } from '../../stores/useMusicStore'
// import PlaylistSkeleton from '../../components/skeletons/PlaylistSkeleton'

const LeftSidebar = () => {
  const {songs,albums,fetchAlbums,isLoading} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums]);

  console.log({albums});

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}

      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className="w-full justify-start text-white hover:bg-zinc-800"
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">
              Home
            </span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className="w-full justify-start text-white hover:bg-zinc-800"
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">
                Messages
              </span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <Slide appear={false} direction="down" className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? "<PlaylistSkeleton/>" : "some music" }
          </div>
        </Slide>
      </div>
    </div>
  )
}

export default LeftSidebar
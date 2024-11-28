import { useEffect } from 'react';
import Topbar from '../../components/ui/Topbar'
import { useMusicStore } from '../../stores/useMusicStore'

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs]);

  console.log({isLoading,madeForYouSongs,featuredSongs,trendingSongs});
  
  return (
    <div className="rounded-md overflow-hidden">
      <Topbar />
    </div>
  )
}

export default HomePage
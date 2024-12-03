import { useEffect } from 'react';
import Topbar from '../../components/ui/Topbar'
import { useMusicStore } from '../../stores/useMusicStore'
import { Slide } from '@mui/material';
import FeaturedSection from './components/FeaturedSection';
import SectionGrid from './components/SectionGrid';

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
    <main 
      className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-900 to-zinc-800"
    >
      <Topbar />
      <Slide
        className="h-[calc(100vh-180px]"
      >
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeaturedSection />
        <div className="space-y-8">
          <p>made for you </p>
          <p>trending</p>
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
        </div>
        </div>
      </Slide>
    </main>
  )
}

export default HomePage
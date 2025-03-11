import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Currently playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img src={currentSong.imageUrl} alt={currentSong.title} className="w-14 h-14 object-cover rounded-md" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">{currentSong.title}</div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">{currentSong.artist}</div>
              </div>
            </>
          )}
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:flex p-2 text-zinc-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </button>

            <button className="p-2 text-zinc-400 hover:text-white" onClick={playPrevious} disabled={!currentSong}>
              <SkipBack className="h-4 w-4" />
            </button>

            <button className="bg-white text-black rounded-full h-8 w-8 flex items-center justify-center" onClick={togglePlay} disabled={!currentSong}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <button className="p-2 text-zinc-400 hover:text-white" onClick={playNext} disabled={!currentSong}>
              <SkipForward className="h-4 w-4" />
            </button>

            <button className="hidden sm:flex p-2 text-zinc-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full cursor-pointer"
            />

            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <button className="p-2 text-zinc-400 hover:text-white">
            <Mic2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white">
            <ListMusic className="h-4 w-4" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white">
            <Laptop2 className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-white">
              <Volume1 className="h-4 w-4" />
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (audioRef.current) {
                  audioRef.current.volume = Number(e.target.value) / 100;
                }
              }}
              className="w-24 bg-zinc-700 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

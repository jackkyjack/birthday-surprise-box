import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  isVisible?: boolean;
}

const MusicPlayer = ({ isVisible = true }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }} 
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-card/90 backdrop-blur-xl border-t border-border px-4 py-3 shadow-soft">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Play/Pause */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full gradient-birthday flex items-center justify-center text-primary-foreground shadow-soft flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </motion.button>

          {/* Song info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-medium text-foreground truncate flex items-center gap-2">
              River - Yew
              {isPlaying && (
                <span className="flex gap-0.5 items-end h-3">
                  <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-pink-500" />
                  <motion.span animate={{ height: [12, 4, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-pink-500" />
                  <motion.span animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-pink-500" />
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {isPlaying ? "กำลังเล่น..." : "กดเพื่อเล่นเพลง"}
            </p>
          </div>

          {/* Volume */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-16 h-1 rounded-full accent-pink-500 bg-gray-200 appearance-none cursor-pointer"
          />
        </div>
      </div>
      {/* Placeholder audio - user will replace with actual file */}
      <audio ref={audioRef} loop>
        <source src="birthday-song.mp3" type="audio/mpeg" />
      </audio>
    </motion.div>
  );
};

export default MusicPlayer;

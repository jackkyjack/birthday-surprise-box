import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Puzzle, Heart, BookOpen, Lock, ArrowLeft, X } from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import JigsawPuzzle from "./activities/JigsawPuzzle";
import PopBalloon from "./activities/PopBalloon";
import PhotoBook from "./activities/PhotoBook";
import PasswordUnlock from "./activities/PasswordUnlock";

const activities = [
  {
    id: "jigsaw",
    icon: <Puzzle className="w-8 h-8" />,
    title: "ต่อจิ๊กซอว์",
    subtitle: "ต่อภาพให้สำเร็จ",
    emoji: "🧩",
    color: "from-birthday-warm to-birthday-rose",
  },
  {
    id: "balloon",
    icon: <Heart className="w-8 h-8" />,
    title: "กดบอลลูน",
    subtitle: "กดเร็วๆ เลย",
    emoji: "🎈",
    color: "from-birthday-peach to-birthday-gold",
  },
  {
    id: "photobook",
    icon: <BookOpen className="w-8 h-8" />,
    title: "อัลบั้มภาพ",
    subtitle: "ดูรูปความทรงจำ",
    emoji: "📸",
    color: "from-birthday-sage to-birthday-warm",
  },
  {
    id: "password",
    icon: <Lock className="w-8 h-8" />,
    title: "ปลดล็อค",
    subtitle: "ใส่รหัสลับ",
    emoji: "🔐",
    color: "from-birthday-gold to-birthday-peach",
  },
];

const MainPage = () => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const renderActivity = () => {
    switch (activeActivity) {
      case "jigsaw":
        return <JigsawPuzzle />;
      case "balloon":
        return <PopBalloon />;
      case "photobook":
        return <PhotoBook />;
      case "password":
        return <PasswordUnlock />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-warm pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-6 px-4 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-3"
        >
          🎂
        </motion.div>
        <h1 className="text-3xl font-display font-bold text-gradient">
          Happy Birthday!
        </h1>
        <p className="text-muted-foreground font-body mt-1">
          เลือกกิจกรรมที่อยากเล่นได้เลย
        </p>
      </motion.div>

      {/* Activity grid */}
      <div className="max-w-md mx-auto px-4 grid grid-cols-2 gap-4">
        {activities.map((activity, i) => (
          <motion.button
            key={activity.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveActivity(activity.id)}
            className={`relative bg-gradient-to-br ${activity.color} rounded-2xl p-5 text-primary-foreground shadow-soft overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="text-3xl mb-2">{activity.emoji}</div>
              <h3 className="font-display font-semibold text-base">
                {activity.title}
              </h3>
              <p className="text-xs opacity-80 mt-0.5 font-body">
                {activity.subtitle}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Activity modal */}
      <AnimatePresence>
        {activeActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setActiveActivity(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 top-8 md:top-12 bg-background rounded-t-3xl overflow-hidden flex flex-col"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  {activities.find((a) => a.id === activeActivity)?.title}
                </h2>
                <button
                  onClick={() => setActiveActivity(null)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Activity content */}
              <div className="flex-1 overflow-auto">{renderActivity()}</div>

              {/* Back button */}
              <div className="p-4 border-t border-border">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveActivity(null)}
                  className="w-full py-3 rounded-xl bg-muted text-foreground font-display font-medium flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ย้อนกลับ
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer />
    </div>
  );
};

export default MainPage;

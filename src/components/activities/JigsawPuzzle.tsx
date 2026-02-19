import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import puzzleImage from "@/assets/puzzle-image.jpg";

const GRID_SIZE = 5;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const JigsawPuzzle = () => {
  const [pieces, setPieces] = useState<number[]>(() =>
    shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i))
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const isSolved = useCallback(
    (p: number[]) => p.every((v, i) => v === i),
    []
  );

  useEffect(() => {
    if (isSolved(pieces)) {
      setCompleted(true);
    }
  }, [pieces, isSolved]);

  const handleClick = (index: number) => {
    if (completed) return;
    if (selected === null) {
      setSelected(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
      setPieces(newPieces);
      setSelected(null);
    }
  };

  const reset = () => {
    setPieces(shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
    setSelected(null);
    setCompleted(false);
  };

  const pieceSize = 100 / GRID_SIZE;

  return (
    <div className="p-4 flex flex-col items-center">
      <p className="text-sm text-muted-foreground font-body mb-3">
        เล่นดูก่อน กดๆดู
      </p>

      <div className="w-full max-w-sm aspect-square relative rounded-xl overflow-hidden shadow-soft border border-border">
        <div className="grid grid-cols-5 grid-rows-5 w-full h-full">
          {pieces.map((pieceIndex, position) => {
            const correctRow = Math.floor(pieceIndex / GRID_SIZE);
            const correctCol = pieceIndex % GRID_SIZE;
            const isCorrect = pieceIndex === position;

            return (
              <motion.div
                key={position}
                layout
                onClick={() => handleClick(position)}
                className={`relative cursor-pointer border border-border/30 transition-all ${
                  selected === position
                    ? "ring-2 ring-primary z-10 scale-95"
                    : ""
                } ${isCorrect ? "opacity-100" : "opacity-90"}`}
                style={{
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  backgroundPosition: `${correctCol * (100 / (GRID_SIZE - 1))}% ${correctRow * (100 / (GRID_SIZE - 1))}%`,
                }}
                whileTap={{ scale: 0.9 }}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={reset}
        className="mt-4 px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-body font-medium text-sm hover:bg-secondary/80 transition-colors"
      >
        สุ่มใหม่
      </button>

      {/* Win celebration */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-card rounded-3xl p-8 mx-4 text-center shadow-glow max-w-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-display font-bold text-gradient mb-2">
                ยินดีด้วย!
              </h2>
              <p className="text-muted-foreground font-body mb-4">
                คุณต่อจิ๊กซอว์สำเร็จแล้ว!
              </p>
              <img
                src={puzzleImage}
                alt="Completed puzzle"
                className="rounded-xl w-full mb-4"
              />
              <button
                onClick={() => setCompleted(false)}
                className="px-6 py-2 rounded-xl gradient-birthday text-primary-foreground font-display font-medium"
              >
                ปิด
              </button>
            </motion.div>

            {/* Confetti */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["hsl(15,45%,55%)", "hsl(35,40%,70%)", "hsl(38,55%,55%)", "hsl(160,15%,70%)"][i % 4],
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ y: -20, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720,
                  opacity: 0,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: "easeIn",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JigsawPuzzle;

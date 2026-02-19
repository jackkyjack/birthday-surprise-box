import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import balloonImg from "@/assets/balloon.png";
import surpriseImg from "@/assets/surprise-reveal.jpg";

const MAX_SIZE = 300;
const POP_THRESHOLD = 280;
const SHRINK_RATE = 0.5;
const GROW_AMOUNT = 4;

const PopBalloon = () => {
  const [size, setSize] = useState(80);
  const [popped, setPopped] = useState(false);
  const [taps, setTaps] = useState(0);
  const shrinkRef = useRef<number>();

  const startShrinking = useCallback(() => {
    if (shrinkRef.current) cancelAnimationFrame(shrinkRef.current);
    const shrink = () => {
      setSize((prev) => {
        if (prev <= 80) return 80;
        return prev - SHRINK_RATE;
      });
      shrinkRef.current = requestAnimationFrame(shrink);
    };
    shrinkRef.current = requestAnimationFrame(shrink);
  }, []);

  useEffect(() => {
    startShrinking();
    return () => {
      if (shrinkRef.current) cancelAnimationFrame(shrinkRef.current);
    };
  }, [startShrinking]);

  const handleTap = () => {
    if (popped) return;
    setTaps((t) => t + 1);
    setSize((prev) => {
      const next = prev + GROW_AMOUNT;
      if (next >= POP_THRESHOLD) {
        setPopped(true);
        if (shrinkRef.current) cancelAnimationFrame(shrinkRef.current);
        return MAX_SIZE;
      }
      return Math.min(next, MAX_SIZE);
    });
  };

  const reset = () => {
    setSize(80);
    setPopped(false);
    setTaps(0);
    startShrinking();
  };

  const progress = ((size - 80) / (POP_THRESHOLD - 80)) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[60vh] select-none">
      <p className="text-sm text-muted-foreground font-body mb-2">
        กดบอลลูนเร็วๆ! 🎈 ({taps} ครั้ง)
      </p>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full gradient-birthday rounded-full"
          animate={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!popped ? (
          <motion.div
            key="balloon"
            className="cursor-pointer"
            onPointerDown={handleTap}
            animate={{
              width: size,
              height: size * 1.2,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={balloonImg}
              alt="Balloon"
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
              style={{
                filter: size > POP_THRESHOLD * 0.7 
                  ? `hue-rotate(${(size - 80) * 0.5}deg) saturate(${1 + (size - 80) * 0.005})` 
                  : undefined,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="popped"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            {/* Explosion particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: ["hsl(340,65%,65%)", "hsl(25,80%,85%)", "hsl(40,80%,60%)"][i % 3],
                  left: "50%",
                  top: "40%",
                }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 12) * Math.PI * 2) * 120,
                  y: Math.sin((i / 12) * Math.PI * 2) * 120,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            >
              <p className="text-4xl mb-4">💥</p>
              <img
                src={surpriseImg}
                alt="Surprise!"
                className="w-64 h-64 rounded-2xl object-cover mx-auto shadow-glow mb-4"
              />
              <p className="font-display text-lg font-semibold text-gradient">
                เซอร์ไพรส์! 🎉
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1">
                คุณกดไป {taps} ครั้ง!
              </p>
            </motion.div>

            <button
              onClick={reset}
              className="mt-4 px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-body font-medium text-sm"
            >
              เล่นอีกครั้ง 🎈
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopBalloon;

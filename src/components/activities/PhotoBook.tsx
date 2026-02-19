import { useState, useRef, useEffect} from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import { X } from "lucide-react";

const photos = [
  { src: memory1, caption: "รู้จักกันแรกๆ" },
  { src: memory2, caption: "บ้านเพวันเดย์ทริปว่ะะะะ" },
  { src: memory3, caption: "เจอกันครั้งแรกตอนขึ้นมหาลัย" },
  { src: memory4, caption: "นานๆทีหน ส่งท้าย ท้ายปี" },
  { src: memory5, caption: "เกษตรแฟร์ปีล่าสุดว่ะะ" },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const PhotoBook = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const paginate = (newDirection: number) => {
    const nextPage = page + newDirection;
    if (nextPage < 0 || nextPage >= photos.length) return;
    setPage([nextPage, newDirection]);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 30 : -30,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 30 : -30,
    }),
  };

  useEffect(() => {
    if (selectedImg) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedImg]);

  return (
    <div className="flex flex-col items-center p-4 min-h-[60vh]">
      <p className="text-sm text-muted-foreground font-body mb-4">
        ปัดไปมา เหมือนๆหนังสืออ่ะ
      </p>

      {/* Page counter */}
      <div className="flex items-center gap-2 mb-4">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === page ? "w-6 gradient-birthday" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Photo container */}
      <div className="relative w-full max-w-xs aspect-[3/4] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000 }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-soft bg-card border border-border">
              <div className="relative h-[75%] cursor-zoom-in"
                onClick={() => setSelectedImg(photos[page].src)}
              >
                <img
                  src={photos[page].src}
                  alt={photos[page].caption}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>
              <div className="p-4 text-center">
                <p className="font-display font-medium text-foreground text-base">
                  {photos[page].caption}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {page + 1} / {photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => paginate(-1)}
          disabled={page === 0}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={page === photos.length - 1}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.button
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} // กันไม่ให้ปิดเมื่อกดที่ตัวรูป
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoBook;

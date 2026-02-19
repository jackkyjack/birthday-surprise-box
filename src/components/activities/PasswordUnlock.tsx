import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Delete } from "lucide-react";
import birthdayImg from "@/assets/birthday-main.jpg";

const CORRECT_PASSWORD = "200204";

const PasswordUnlock = () => {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleDigit = (digit: string) => {
    if (input.length >= 6) return;
    const newInput = input + digit;
    setInput(newInput);
    setError(false);

    if (newInput.length === 6) {
      if (newInput === CORRECT_PASSWORD) {
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => {
          setInput("");
          setError(false);
        }, 600);
      }
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
    setError(false);
  };

  const reset = () => {
    setInput("");
    setUnlocked(false);
    setError(false);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[60vh]">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-xs"
          >
            <motion.div
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="mb-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg">
                ใส่รหัสผ่าน 6 หลัก
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                ลองเดาดูนะ
              </p>
            </motion.div>

            {/* PIN dots */}
            <div className="flex gap-3 mb-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i < input.length ? 1.2 : 1,
                    backgroundColor:
                      error
                        ? "hsl(0 84.2% 60.2%)"
                        : i < input.length
                        ? "hsl(15 45% 55%)"
                        : "hsl(var(--muted))",
                  }}
                  className="w-4 h-4 rounded-full"
                />
              ))}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((key, i) => {
                if (key === null)
                  return <div key={i} />;

                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      key === "del"
                        ? handleDelete()
                        : handleDigit(String(key))
                    }
                    className="h-14 rounded-xl bg-card border border-border font-display text-xl font-medium text-foreground flex items-center justify-center hover:bg-muted transition-colors active:gradient-birthday active:text-primary-foreground"
                  >
                    {key === "del" ? (
                      <Delete className="w-5 h-5" />
                    ) : (
                      key
                    )}
                  </motion.button>
                );
              })}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm mt-3 font-body"
              >
                รหัสไม่ถูกต้อง ลองใหม่นะ
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              className="w-16 h-16 rounded-full gradient-birthday flex items-center justify-center mx-auto mb-4 shadow-glow"
            >
              <Unlock className="w-7 h-7 text-primary-foreground" />
            </motion.div>

            <img
              src={birthdayImg}
              alt="Birthday surprise"
              className="w-full rounded-2xl shadow-soft mb-4"
            />

            <h2 className="text-2xl font-display font-bold text-gradient mb-2">
              สุขสันต์วันเกิดนะชะเอม
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed px-2">
              มีความสุขท่วมล้น ไม่เจ็บไม่ไข้
              <br />
              สมหวังทุกอย่างที่ตั้งใจไว้ เจอแต่เรื่องดีๆ และคนดีๆ เข้ามาในชีวิต ปีสุดท้ายในรั่วมหาลัยละ
              <br />
              ไปเมกาก็ดูแลตัวเองดีๆด้วย ไม่หักโหมเกินไป แวะกินอะไรอร่อยๆด้วย เติมความสุขวันละนิดก็ยังดี
              <br />
              🩶
              <br />
              ขอบคุณที่คอยเป็นที่รักของเพื่อนๆตลอดมา เอมเป็นคนที่แจ๊คนึกถึงแรกๆเวลาเจออะไรดีๆ หรืออยากเล่าอะไรให้ใครสักคนฟัง ขอบคุณที่เป็นเพื่อนที่ดีมากๆ เป็นที่ปรึกษาที่ดี และเป็นคนที่น่ารักมากๆ
              <br />
              แจ๊คทำสิ่งนี้มา หวังว่ามันจะทำให้เอมยิ้มได้บ้าง แฮปปี้ๆกับวันเกิดนะ
              <br />
              เลิฟๆ
            </p>

            <button
              onClick={reset}
              className="mt-4 px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-body font-medium text-sm"
            >
              ล็อคใหม่
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordUnlock;

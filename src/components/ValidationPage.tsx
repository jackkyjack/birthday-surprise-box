import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, User, Sparkles } from "lucide-react";

interface ValidationPageProps {
  onValidated: () => void;
}

const ValidationPage = ({ onValidated }: ValidationPageProps) => {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [isSpecial, setIsSpecial] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const handleNext = () => {
    setError("");
    if (step === 0 && !date) {
      setError("กรุณาเลือกวันที่");
      return;
    }
    if (step === 1 && !name.trim()) {
      setError("กรุณากรอกชื่อ");
      return;
    }
    if (step === 2 && isSpecial === null) {
      setError("กรุณาเลือกคำตอบ");
      return;
    }
    if (step < 2) {
      setStep(step + 1);
    } else {
      onValidated();
    }
  };

  const questions = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "วันนี้วันที่เท่าไหร่?",
      subtitle: "บอกเราหน่อยนะ 📅",
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "คุณคือใครคะ?",
      subtitle: "อยากรู้จักคุณ 💕",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "คิดว่าวันนี้เป็นวันพิเศษไหม?",
      subtitle: "ลองตอบดูนะ ✨",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-warm px-4">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
          >
            {["🌸", "💖", "🎀", "✨", "🌷", "💫"][i]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-birthday mb-4 shadow-glow">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            ยินดีต้อนรับ
          </h1>
          <p className="text-muted-foreground mt-1 font-body">
            ตอบคำถามสักนิดนะคะ 💕
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex gap-2 mb-8 px-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-500"
              style={{
                background:
                  i <= step
                    ? "var(--gradient-birthday)"
                    : "hsl(var(--muted))",
              }}
            />
          ))}
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-birthday flex items-center justify-center text-primary-foreground">
                {questions[step].icon}
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {questions[step].title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {questions[step].subtitle}
                </p>
              </div>
            </div>

            {step === 0 && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            )}

            {step === 1 && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 100))}
                placeholder="พิมพ์ชื่อของคุณ..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            )}

            {step === 2 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSpecial(true)}
                  className={`flex-1 py-3 rounded-xl font-body font-semibold transition-all ${
                    isSpecial === true
                      ? "gradient-birthday text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  ใช่! ✨
                </button>
                <button
                  onClick={() => setIsSpecial(false)}
                  className={`flex-1 py-3 rounded-xl font-body font-semibold transition-all ${
                    isSpecial === false
                      ? "gradient-birthday text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  ไม่แน่ใจ 🤔
                </button>
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm mt-3 font-body">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full mt-6 py-3 rounded-xl gradient-birthday text-primary-foreground font-display font-semibold text-lg shadow-soft hover:shadow-glow transition-all"
            >
              {step < 2 ? "ถัดไป →" : "เข้าสู่เว็บไซต์ 💖"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ValidationPage;

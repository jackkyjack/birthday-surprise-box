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
    
    if (step === 0) {
      if (!date) {
        setError("เลือกวันก่อนดิวัยรุ่น");
        return;
      }
      if (date !== "2026-02-20") {
        setError("ห๊าาาา เอาใหม่ซิ๊");
        return;
      }
    }

    if (step === 1) {
      if (!name.trim()) {
        setError("ไปพิมพ์ชื่อ!!!");
        return;
      }
      if (name.trim() !== "ชะเอม") {
        alert("แกเป็นใครกันวะ");
        window.location.reload();
        return;
      }
    }

    if (step === 2) {
      if (isSpecial === null) {
        setError("กดดิ กดๆๆๆๆๆ");
        return;
      }
      if (isSpecial === false) {
        alert("ไปกดมาใหม่หมดเลย");
        window.location.reload(); 
        return;
      }
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
      subtitle: "วันเพ็ญเดือนสิบสองน้ำตนองเต็มตลิ่ง",
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "ใครกดเข้ามาเอ่ย?",
      subtitle: "นี่จะไม่ใบ้ให้นะว่าให้พิมพ์ชื่อเล่นลงไปอ่ะ",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "วันนี้วันเกิดใครมั้ยนะะะะะ?",
      subtitle: "กดดิ กดๆๆๆๆๆ",
    },
  ];

  const handleBack = () => {
    setError("");
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-warm px-4">
      {/* Subtle floating dots */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          />
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-birthday mb-4 shadow-glow">
            <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            ยินดีต้อนรับ
          </h1>
          <p className="text-muted-foreground mt-1 font-body">
            มีคำถามนิดหน่อย
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
                placeholder="พิมพ์มา"
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
                  ใช่!
                </button>
                <button
                  onClick={() => setIsSpecial(false)}
                  className={`flex-1 py-3 rounded-xl font-body font-semibold transition-all ${
                    isSpecial === false
                      ? "gradient-birthday text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  ไม่นะ
                </button>
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm mt-3 font-body">{error}</p>
            )}

            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-display font-semibold text-lg border border-border hover:bg-secondary/80 transition-all"
                >
                  ย้อนกลับ
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className={`${
                  step > 0 ? "flex-[2]" : "w-full"
                } py-3 rounded-xl gradient-birthday text-primary-foreground font-display font-semibold text-lg shadow-soft hover:shadow-glow transition-all`}
              >
                {step < 2 ? "ถัดไป →" : "เข้าสู่โลกเวทมนตร์"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ValidationPage;

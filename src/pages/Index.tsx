import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ValidationPage from "@/components/ValidationPage";
import MainPage from "@/components/MainPage";

const Index = () => {
  const [validated, setValidated] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!validated ? (
        <motion.div
          key="validation"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ValidationPage onValidated={() => setValidated(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MainPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;

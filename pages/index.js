import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const titles = useMemo(() => ["PRODUCT", "UX", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0D0D0D",
      color: "#fff",
      font: "Space Grotesk",
    
      fontSize: "2rem",
      fontWeight: "bold",
    }}>
      <span>You are&nbsp;</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-block" }}
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

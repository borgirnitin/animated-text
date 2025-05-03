import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

  // Get longest word for layout stability
  const longest = useMemo(
    () => titles.reduce((a, b) => (a.length > b.length ? a : b), ""),
    [titles]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <>
      {/* Import General Sans font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;700&display=swap');
        body {
          font-family: 'General Sans', sans-serif;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0D0D0D",
        }}
      >
        <div
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>Hi, I'm Nitin 💫 I am</span>

          {/* Container to stabilize animation area width */}
          <div
            style={{
              width: `${longest.length}ch`, // Reserve enough space for the longest word
              position: "relative",
              textAlign: "center",
              margin: "0 0.5rem",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  color: "transparent",
                  background: "linear-gradient(90deg, #F8D442, #FF6E7F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>

            {/* Ghost element to prevent layout shift */}
            <span style={{ visibility: "hidden" }}>{longest}</span>
          </div>

          <span>Designer</span>
        </div>
      </div>
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;700&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'General Sans', sans-serif;
          background-color: #0D0D0D;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            lineHeight: 1.2,
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>Hi, I'm Nitin 💫 I am</span>

          <div
            style={{
              position: "relative",
              minWidth: "8ch", // responsive base width
              margin: "0 0.5rem",
              display: "inline-block",
              height: "1em",
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
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  color: "transparent",
                  background: "linear-gradient(90deg, #F8D442, #FF6E7F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>

            <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{longest}</span>
          </div>

          <span style={{ marginLeft: "0.5rem" }}>Designer</span>
        </div>
      </div>
    </>
  );
}

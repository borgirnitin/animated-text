import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);
  const longest = "EXPERIENCE"; // for consistent width

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
            alignItems: "center",
            fontFamily: "'General Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
          
            color: "#ffffff",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>Hi, I'm Nitin 💫 I am</span>

          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: `${longest.length + 1}ch`,
              margin: "0 0.5rem",
              position: "relative",
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
                  display: "inline-block",
                  backgroundImage:
                    "linear-gradient(to bottom, #D4D8ED, #929ED1 50%, #D4D8ED)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span style={{ marginLeft: "0.5rem" }}>Designer</span>
        </div>
      </div>
    </>
  );
}

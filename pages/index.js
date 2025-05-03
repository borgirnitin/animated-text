import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["a PRODUCT", "a UX / UI", "an EXPERIENCE", "an INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

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
          height: "100vh",
          width: "100%",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "'General Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            letterSpacing: "0.05em",
            color: "#FFFFFF",
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>Hi, I'm Nitin 💫 I am</span>

          {/* FIXED-WIDTH pill */}
          <div
            style={{
              position: "relative",
              width: "12ch", // hardcoded for "EXPERIENCE" + padding
              padding: "0.3em 1.2em",
              borderRadius: "9999px",
              backgroundColor: "#1A1A1A",
              display: "block",
              textAlign: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
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

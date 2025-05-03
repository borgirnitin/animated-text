import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

  const longest = "EXPERIENCE"; // For consistent pill size

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
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            fontFamily: "'General Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            lineHeight: 1.2,
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>Hi, I'm Nitin 💫 I am</span>

          <div
            style={{
              position: "relative",
              minWidth: `${longest.length + 1}ch`,
              margin: "0 0.5rem",
              padding: "0.3em 1em",
              backgroundColor: "#1a1a1a",
              borderRadius: "9999px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
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
                  backgroundImage:
                    "linear-gradient(to bottom, #D4D8ED, #929ED1 50%, #D4D8ED)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>

            <span
              aria-hidden="true"
              style={{
                visibility: "hidden",
                height: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                position: "absolute",
              }}
            >
              {longest}
            </span>
          </div>

          <span style={{ marginLeft: "0.5rem" }}>Designer</span>
        </div>
      </div>
    </>
  );
}

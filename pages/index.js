import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <>
      {/* Inject General Sans font */}
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
            position: "relative",
            fontFamily: "'General Sans', sans-serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {/* Fixed "Designer" at right end */}
          <span
            style={{
              position: "relative",
              zIndex: 1,
              paddingLeft: "200px", // Adjust this to control the distance from the animated word
            }}
          >
            Designer
          </span>

          {/* Animated Word Positioned Absolutely to Left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200px", // Same as paddingLeft on "Designer"
              overflow: "hidden",
              textAlign: "right",
              zIndex: 0,
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
                  background: "linear-gradient(90deg, #F8D442, #FF6E7F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

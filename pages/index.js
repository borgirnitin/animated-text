import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
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

        .pill-wrapper {
          position: relative;
          width: 13ch;
          padding: 0.5em 1em;
          border-radius: 9999px;
          background: rgba(87, 153, 204, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            0 0 8px rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .pill-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .orbit {
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          position: relative;
          animation: rotate 4s linear infinite;
        }

        .glow-dot {
          width: 6px;
          height: 6px;
          background: #8aaaff;
          border-radius: 50%;
          box-shadow: 0 0 10px 5px rgba(138, 170, 255, 0.4);
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .text-animate {
          z-index: 2;
          font-weight: 600;
          font-size: clamp(1.25rem, 3.5vw, 2rem);
          color: white;
          letter-spacing: 0.03em;
          white-space: nowrap;
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
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span>Hi, I'm Nitin 💫 I am</span>

          <div className="pill-wrapper">
            <div className="pill-glow">
              <div className="orbit">
                <div className="glow-dot" />
              </div>
            </div>
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
                className="text-animate"
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span>Designer</span>
        </div>
      </div>
    </>
  );
}

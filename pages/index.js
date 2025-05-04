import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(titleInterval);
  }, [titles.length]);

  // Animate trail dot along border
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      setProgress((prev) => (prev + 1) % 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const dashOffset = 1000 - progress;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;700&display=swap');

        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: 'General Sans', sans-serif;
          background-color: #0D0D0D;
        }

        .pill-wrapper {
          position: relative;
          width: 13ch;
          height: 3.5rem;
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            0 0 8px rgba(255, 255, 255, 0.06);
        }

        .animated-text {
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: 0.03em;
          background: linear-gradient(to bottom, #D4D8ED, #929ED1, #D4D8ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
          z-index: 2;
        }

        .border-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          overflow: visible;
          pointer-events: none;
        }

        .trail-path {
          stroke: #a2b7ff88;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 1000;
          fill: none;
          filter: drop-shadow(0 0 4px #a2b7ffcc);
        }

        .glow-dot {
          r: 4;
          fill: #a2b7ff;
          filter: drop-shadow(0 0 6px #a2b7ff88);
        }
      `}</style>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
        fontFamily: "'General Sans', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        color: "#fff",
        gap: "0.75rem",
        flexWrap: "wrap"
      }}>
        <span>Hi, I'm Nitin 💫 I am</span>

        <div className="pill-wrapper">
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
              className="animated-text"
            >
              {titles[index]}
            </motion.span>
          </AnimatePresence>

          <svg className="border-svg" viewBox="0 0 300 56" preserveAspectRatio="none">
            <path
              d="M 28,0 H 272 A 28,28 0 0 1 300,28 A 28,28 0 0 1 272,56 H 28 A 28,28 0 0 1 0,28 A 28,28 0 0 1 28,0 Z"
              className="trail-path"
              strokeDashoffset={dashOffset}
            />
            <circle
              className="glow-dot"
              r="3"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#movingPath" />
                <path
                  id="movingPath"
                  d="M 28,0 H 272 A 28,28 0 0 1 300,28 A 28,28 0 0 1 272,56 H 28 A 28,28 0 0 1 0,28 A 28,28 0 0 1 28,0 Z"
                />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <span>Designer</span>
      </div>
    </>
  );
}

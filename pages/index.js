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
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: 'General Sans', sans-serif;
          background-color: #0D0D0D;
        }
        .pill-container {
          position: relative;
          width: 18ch;
          height: 3.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            0 0 8px rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .animated-text {
          z-index: 2;
          font-weight: 600;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          letter-spacing: 0.03em;
          background: linear-gradient(to bottom, #D4D8ED, #929ED1, #D4D8ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }

        .orbit-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .glow-dot {
          r: 3.5;
          fill: #A2B7FF;
          filter: drop-shadow(0 0 4px #A2B7FF) drop-shadow(0 0 8px #A2B7FF88);
        }

        .trail-path {
          stroke: none;
          fill: none;
        }

        @keyframes dash {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
        color: "#fff",
        fontFamily: "'General Sans', sans-serif",
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <span>Hi, I'm Nitin 💫 I am</span>

        <div className="pill-container">
          <AnimatePresence mode="wait">
            <motion.span
              key={titles[index]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
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

          {/* SVG trail animation */}
          <svg className="orbit-svg" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path id="pill-path"
              d="M20,50 Q20,10 60,10 H340 Q380,10 380,50 Q380,90 340,90 H60 Q20,90 20,50 Z"
              stroke="none" fill="none"
            />
            <circle>
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#pill-path" />
              </animateMotion>
              <animate
                attributeName="r"
                values="3.5;2;3.5"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <span>Designer</span>
      </div>
    </>
  );
}

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
          width: 15ch;
          height: 3.5rem;
          padding: 0 1.25rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            0 0 8px rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .animated-text {
          font-weight: 600;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          letter-spacing: 0.03em;
          background: linear-gradient(to bottom, #D4D8ED, #929ED1, #D4D8ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
          z-index: 2;
        }

        .pill-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3; /* Front layer */
          pointer-events: none;
        }

        .moving-stroke {
          stroke: rgba(162,183,255,0.3);
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 60 260;
          animation: draw 4s linear infinite;
          filter: drop-shadow(0 0 8px #A2B7FFaa);
        }

        @keyframes draw {
          to {
            stroke-dashoffset: -320;
          }
        }
      `}</style>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
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

          {/* Trail stroke animation */}
          <svg className="pill-svg" viewBox="0 0 300 56" preserveAspectRatio="none">
            <defs>
              <path
                id="trailPath"
                d="
                  M 28,1
                  H 272
                  A 27,27 0 0 1 299,28
                  A 27,27 0 0 1 272,55
                  H 28
                  A 27,27 0 0 1 1,28
                  A 27,27 0 0 1 28,1 Z
                "
              />
            </defs>

            <use href="#trailPath" className="moving-stroke" />
          </svg>
        </div>

        <span>Designer</span>
      </div>
    </>
  );
}

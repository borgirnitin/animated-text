import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [titles.length]);

  // Animate dot manually
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360);
    }, 10); // adjust speed
    return () => clearInterval(interval);
  }, []);

  // Calculate dot position
  const radiusX = 135; // horizontal pill radius (half of pill width - padding)
  const radiusY = 28;  // vertical pill radius (half height)
  const centerX = radiusX + 20; // offset for pill position
  const centerY = radiusY + 10;

  const rad = (angle * Math.PI) / 180;
  const x = centerX + radiusX * Math.cos(rad);
  const y = centerY + radiusY * Math.sin(rad);

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
          height: 3.5rem;
          padding: 0 1.25rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.08),
                      0 0 6px rgba(255,255,255,0.06);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
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

        .glow-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #a2b7ff;
          box-shadow:
            0 0 6px #a2b7ff,
            0 0 12px #a2b7ff99,
            0 0 16px #a2b7ff44;
          pointer-events: none;
          z-index: 10;
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

          {/* Moving dot via JS */}
          <div
            className="glow-dot"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <span>Designer</span>
      </div>
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);
  const pathRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const length = path.getTotalLength();
    let progress = 0;
    const speed = 1; // pixels per frame

    const animate = () => {
      const point = path.getPointAtLength(progress);
      dot.style.transform = `translate(${point.x - 4}px, ${point.y - 4}px)`;

      // Sparkle Trail
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle-dot";
      sparkle.style.transform = `translate(${point.x - 3}px, ${point.y - 3}px)`;
      dot.parentElement.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 400);

      progress = (progress + speed) % length;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;700&display=swap');

        body {
          margin: 0;
          font-family: 'General Sans', sans-serif;
          background: #0D0D0D;
        }

        .pill-wrapper {
          position: relative;
          width: 12ch;
          height: 3.5rem;
          padding: 0 1.25rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
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

        .pill-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #a2b7ff;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 0 6px #a2b7ff, 0 0 12px #a2b7ff88;
          z-index: 3;
        }

        .sparkle-dot {
          width: 6px;
          height: 6px;
          background: #d4d8ed;
          border-radius: 50%;
          position: absolute;
          pointer-events: none;
          box-shadow:
            0 0 4px #d4d8ed,
            0 0 10px #d4d8ed99,
            0 0 20px #929ed199;
          opacity: 0.8;
          animation: fadeOut 0.4s ease-out forwards;
        }

        @keyframes fadeOut {
          to { opacity: 0; transform: scale(0.5); }
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

          <svg className="pill-svg" viewBox="0 0 300 56">
            <path
              ref={pathRef}
              d="
                M 28,0
                H 272
                A 28,28 0 0 1 300,28
                A 28,28 0 0 1 272,56
                H 28
                A 28,28 0 0 1 0,28
                A 28,28 0 0 1 28,0 Z
              "
              fill="none"
              stroke="transparent"
            />
          </svg>

          <div className="dot" ref={dotRef} />
        </div>

        <span>Designer</span>
      </div>
    </>
  );
}

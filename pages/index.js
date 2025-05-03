import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedHero() {
  const titles = useMemo(() => ["PRODUCT", "UX / UI", "EXPERIENCE", "INDUSTRIAL"], []);
  const [index, setIndex] = useState(0);
  const [dotPos, setDotPos] = useState(0);

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000);

    const dotTimer = setInterval(() => {
      setDotPos((prev) => (prev + 1) % 400); // simple loop
    }, 16); // ~60fps

    return () => {
      clearInterval(titleTimer);
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #0d0d0d;
          font-family: 'General Sans', sans-serif;
        }

        .pill {
          position: relative;
          width: 13ch;
          height: 4rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.08),
            0 0 16px rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .text-animate {
          font-weight: 600;
          font-size: clamp(1.25rem, 3.5vw, 2rem);
          letter-spacing: 0.03em;
          white-space: nowrap;
          background: linear-gradient(to bottom, #D4D8ED, #929ED1 50%, #D4D8ED);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .dot {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #9bb3ff;
          border-radius: 50%;
          box-shadow: 0 0 10px 4px rgba(147, 168, 255, 0.6);
        }
      `}</style>

      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          gap: "1rem",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: "bold",
        }}
      >
        <span>Hi, I'm Nitin 💫 I am</span>

        {/* PILL */}
        <div className="pill">
          {/* TRAIL DOT */}
          <span
            className="dot"
            style={{
              top: trailPath(dotPos).y,
              left: trailPath(dotPos).x,
            }}
          />
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
    </>
  );
}

// Trail path logic for pill perimeter
function trailPath(t) {
  const w = 272; // width of pill
  const h = 64; // height of pill
  const r = h / 2;

  const perimeter = 2 * (Math.PI * r + (w - h));
  const progress = (t / 400) * perimeter;

  if (progress < w - h) {
    return { x: progress, y: 0 };
  } else if (progress < w - h + Math.PI * r) {
    const angle = ((progress - (w - h)) / (Math.PI * r)) * Math.PI;
    return { x: w - r + Math.cos(angle) * r, y: r + Math.sin(angle) * r };
  } else if (progress < 2 * (w - h) + Math.PI * r) {
    return { x: w - (progress - (w - h + Math.PI * r)), y: h };
  } else {
    const angle = ((progress - (2 * (w - h) + Math.PI * r)) / (Math.PI * r)) * Math.PI;
    return { x: r + Math.cos(angle + Math.PI) * r, y: r + Math.sin(angle + Math.PI) * r };
  }
}

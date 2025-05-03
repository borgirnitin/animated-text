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

        body {
          margin: 0;
          font-family: 'General Sans', sans-serif;
          background-color: #0D0D0D;
        }

        .glow-container {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 9999px;
          padding: 1em 1.5em;
          position: relative;
          width: 15ch;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        }

        .glow-container::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(270deg, #d4d8ed, #929ed1, #d4d8ed);
          background-size: 400% 400%;
          animation: borderLoop 8s linear infinite;
          filter: blur(3px);
        }

        @keyframes borderLoop {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animated-text {
          font-weight: 700;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          background-image: linear-gradient(to bottom, #D4D8ED, #929ED1 50%, #D4D8ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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

          <div className="glow-container">
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
          </div>

          <span style={{ marginLeft: "0.5rem" }}>Designer</span>
        </div>
      </div>
    </>
  );
}

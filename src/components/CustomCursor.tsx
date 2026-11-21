"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-target")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const updateRingPosition = () => {
      setRingPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(updateRingPosition);
    };
    animationFrameId = requestAnimationFrame(updateRingPosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-cyan rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan/50 pointer-events-none z-[9998]"
        animate={{
          x: ringPosition.x - (isHovering ? 28 : 16),
          y: ringPosition.y - (isHovering ? 28 : 16),
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? "rgba(53, 230, 196, 1)" : "rgba(53, 230, 196, 0.5)",
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </div>
  );
}


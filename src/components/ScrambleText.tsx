"use client";
import { useEffect, useRef } from "react";

export function ScrambleText({ text, className, triggerOnHover = false }: { text: string; className?: string, triggerOnHover?: boolean }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const animating = useRef(false);

  useEffect(() => {
    const startAnimation = () => {
      if (animating.current) return;
      animating.current = true;
      
      const el = elRef.current;
      if (!el) {
        animating.current = false;
        return;
      }
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$01";
      let frame = 0;
      const totalFrames = 24;

      const tick = () => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
            continue;
          }
          const revealAt = (i / text.length) * totalFrames;
          if (frame >= revealAt + 6) {
            out += text[i];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        el.textContent = out;
        frame++;
        if (frame <= totalFrames + 6) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = text;
          animating.current = false;
        }
      };

      requestAnimationFrame(tick);
    };

    // Initial animation
    const timer = setTimeout(() => {
      startAnimation();
    }, 200);

    // Setup hover listener on the element itself
    const el = elRef.current;
    let handleHover: () => void;
    
    if (el && triggerOnHover) {
      handleHover = () => startAnimation();
      el.addEventListener("mouseenter", handleHover);
    }

    return () => {
      clearTimeout(timer);
      if (el && triggerOnHover && handleHover) {
        el.removeEventListener("mouseenter", handleHover);
      }
    };
  }, [text, triggerOnHover]);

  return (
    <span 
      ref={elRef} 
      className={className}
    >
      {text}
    </span>
  );
}

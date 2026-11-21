"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "side";
  delay?: number;
}

export function Reveal({ children, className, direction = "up", delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants: any = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 28 : 0,
      x: direction === "side" ? -24 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: direction === "up" ? 0.8 : 0.7, 
        ease: direction === "up" ? [0.16, 1, 0.3, 1] : "easeOut",
        delay 
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

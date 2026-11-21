"use client";
import { useRef, MouseEvent } from "react";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export function MagneticButton({ href, variant = "primary", children, className, type }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const classes = clsx(
    "relative inline-flex items-center gap-[8px] px-[26px] py-[14px] text-[14px] font-semibold overflow-hidden border border-transparent transition-transform duration-200 hover-target group",
    variant === "primary" ? "bg-cyan text-[#05070a]" : "border-line text-ink hover:border-cyan hover:text-cyan",
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[120%] transition-transform duration-600 ease-out group-hover:translate-x-[120%]" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classes}
    >
      {inner}
    </button>
  );
}


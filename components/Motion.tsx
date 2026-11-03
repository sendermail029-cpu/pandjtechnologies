"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Respect the visitor's reduced-motion setting for everything inside
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// A line of a headline that slides up out of a mask
export function MaskLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Fades and slides in; on load by default, or when scrolled into view with `inView`
export function FadeIn({
  children,
  delay = 0,
  x = 0,
  y = 24,
  inView = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  inView?: boolean;
  className?: string;
}) {
  const shown = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      {...(inView ? { whileInView: shown, viewport: { once: true, amount: 0.25 } } : { animate: shown })}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// A rule that draws itself across
export function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, ease, delay }}
    />
  );
}

const list: Variants = {
  hidden: {},
  shown: (delay: number) => ({ transition: { staggerChildren: 0.08, delayChildren: delay } }),
};
const item: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -12 },
  shown: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 16 } },
};

// A list whose items pop in one after another
export function PopList({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.ul
      className={className}
      variants={list}
      initial="hidden"
      animate="shown"
      custom={delay}
    >
      {children}
    </motion.ul>
  );
}

export function PopItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}

// Gentle press feedback for a call to action
export function Press({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.div>
  );
}

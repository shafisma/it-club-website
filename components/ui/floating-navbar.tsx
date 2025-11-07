"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  // Floating nav is always present now (no scroll-hide). Use soft pastel background.
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "h-12 flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full bg-gradient-to-r from-rose-50 via-amber-50 to-pink-50 dark:from-rose-900/10 dark:via-amber-900/6 dark:to-pink-900/6 border border-neutral-200 dark:border-white/[0.06] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.06),0px_1px_0px_0px_rgba(25,28,33,0.02)] z-[5000] pr-5 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-neutral-700 hover:text-accent dark:text-neutral-50"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

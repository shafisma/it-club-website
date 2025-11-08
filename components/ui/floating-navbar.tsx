"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";


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
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "h-12 flex max-w-fit fixed bottom-6 inset-x-0 mx-auto rounded-full bg-linear-to-r from-rose-50 via-amber-50 to-pink-50 dark:from-rose-900/10 dark:via-amber-900/6 dark:to-pink-900/6 border border-neutral-200 dark:border-white/6 shadow-lg z-5000 px-8 items-center justify-center space-x-6",
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
            <span className="text-sm font-medium">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

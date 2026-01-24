"use client";

import React from "react";
import AnimatedElement from "./AnimatedElement";

/**
 * SectionTitle Component
 * Provides a consistent, styled header for all sections with optional decorative bar
 */
interface SectionTitleProps {
  title: string;
  withBar?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  withBar = false,
}) => {
  return (
    <AnimatedElement animation="fade-up" duration={800}>
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
          {title}
        </span>
        {withBar && (
          <span className="absolute bottom-0 left-1/2 w-10 h-1 bg-primary-light dark:bg-primary-dark transform -translate-x-1/2 mt-2"></span>
        )}
      </h2>
    </AnimatedElement>
  );
};

export default SectionTitle;

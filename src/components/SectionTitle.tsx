"use client";

import React from "react";

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
    <h2 className="relative mb-6 text-xl font-bold text-center md:text-2xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
        {title}
      </span>
      {withBar && (
        <span className="absolute bottom-0 w-10 h-1 mt-2 transform -translate-x-1/2 left-1/2 bg-primary-light dark:bg-primary-dark"></span>
      )}
    </h2>
  );
};

export default SectionTitle;

"use client";

import Link from "next/link";
// import { Button } from './Button';
import { Mail, Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-10 mt-8 text-xs text-left text-gray-500">
      <div className="flex justify-between py-4">
        <Link
          href="/"
          className="font-mono text-base font-bold text-gray-500 hover:text-primary-light"
        >
          DtoD
        </Link>
        <div className="flex gap-5 text-sm font-medium">
          <a
            href="mailto:jdyoung1031@gmail.com"
            className="hover:text-primary"
            title="mail"
          >
            <Mail className="w-4" />
          </a>
          <a
            href="https://github.com/diayeri"
            className="hover:text-primary"
            title="github"
            target="_blank"
            rel="noopener"
          >
            <Github className="w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/diayeri/"
            className="hover:text-primary"
            title="linkedin"
            target="_blank"
            rel="noopener"
          >
            <Linkedin className="w-4" />
          </a>
        </div>
      </div>
      <div className="w-full py-5 text-xs text-center border-t">
        &copy; {new Date().getFullYear()} UI Dev Portfolio - Dayoung Jung. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

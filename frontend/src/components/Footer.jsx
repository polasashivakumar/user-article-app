// src/components/Footer.jsx
import { mutedText, divider } from "../styles/common";

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className={divider}></div>
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className={mutedText}>© 2026 User Articles. All rights reserved.</p>
        <p className={mutedText}>Built with React, Tailwind, and MongoDB.</p>
      </div>
    </footer>
  );
};

export default Footer;
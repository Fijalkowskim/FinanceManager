import React from "react";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { IoIosFitness } from "react-icons/io";

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-background-50 p-2 text-primary-950 shadow-lg">
      <div className="flex w-full flex-row items-center justify-center gap-4 text-center text-2xl">
        <div className="h-[0.1px] flex-grow bg-primary-600/30" />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <p className="text-base -mb-3">Finance</p>
          <p className="text-primary-800">Manager</p>
        </div>
        <a
          className="cursor-pointer transition-colors text-primary-900 hover:text-primary-600"
          target="_blank"
          href="https://github.com/Fijalkowskim/FinanceManager"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          className="cursor-pointer transition-colors text-primary-900 hover:text-primary-600"
          target="_blank"
          href="https://www.linkedin.com/in/mateusz-fija%C5%82kowski-a880742b5/"
          rel="noreferrer"
        >
          <CiLinkedin />
        </a>
        <div className="h-[0.1px] flex-grow bg-primary-600/30" />
      </div>

      <p className="text-sm font-light">&copy; 2024 All rights reserved</p>
    </div>
  );
}

export default Footer;

import React, { useEffect, useRef, useState } from "react";
import { useSettingsContext } from "../../context/SettingsContext";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";
import NavbarLink from "./NavbarLink";

export interface NavlinkData {
  name: string;
  to: string;
  button?: boolean;
}
const navlinks: NavlinkData[] = [
  { name: "Add expense", to: "/Finance-Manager/add", button: true },
  { name: "Dashboard", to: "/Finance-Manager" },
  { name: "History", to: "/Finance-Manager/history" },
  { name: "Planned", to: "/Finance-Manager/planned" },
  { name: "Analize", to: "/Finance-Manager/analize" },
];

function Navbar() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setDisableScroll } = useSettingsContext();

  const toggleMobileMenu = () => {
    setDisableScroll(!isMobileMenuOpen);
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };
  useEffect(() => {
    if (isMobileMenuOpen && !isInView) setIsMobileMenuOpen(false);
  }, [isInView, isMobileMenuOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-20 flex w-screen flex-row items-center justify-center gap-8 bg-background-50 px-5 py-3 text-primary-950 shadow-sm sm:px-24 xl:px-60 text-lg`}
    >
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <p className="text-base -mb-3">Finance</p>
        <p className="text-primary-800">Manager</p>
      </div>

      <div
        className={`hidden flex-row items-center justify-end gap-8 lg:flex w-full`}
      >
        {navlinks.map((n) => (
          <NavbarLink key={n.to} data={n} />
        ))}
      </div>
      <motion.button
        ref={ref}
        className="ml-auto cursor-pointer text-3xl lg:hidden"
        whileHover={{ scaleY: 1.1 }}
        onClick={toggleMobileMenu}
      >
        <RxHamburgerMenu />
      </motion.button>
      {/* Hamburger menu */}
      <AnimatePresence>
        {isInView && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 z-50 h-screen w-screen overflow-hidden bg-black/40"
          >
            <div
              className="absolute inset-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileMenu();
              }}
            />
            <motion.ul
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-0 flex h-full w-fit flex-col items-end gap-4 bg-background-50 p-4 px-8 text-right text-2xl shadow-md"
            >
              <motion.button
                className="cursor-pointer text-4xl"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMobileMenu}
              >
                <GoX />
              </motion.button>
              {navlinks.map((n) => (
                <div
                  key={n.to}
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                >
                  <NavbarLink data={n} />
                </div>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Performance", href: "#performance" },
  { name: "Fees", href: "#fees" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <nav
        className={`fixed top-9 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-white/30 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-width flex justify-between items-center px-5">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kanhaiya Classes"
              width={55}
              height={55}
              className="rounded-full"
            />

            <div>
              <h2 className="heading-font text-xl font-bold text-[#163232]">
                Kanhaiya Classes
              </h2>

              <p className="text-xs text-gray-500">
                Learn • Grow • Succeed
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-gray-700 hover:text-[#3ED6C1] transition"
              >
                {link.name}
              </a>
            ))}
            <Link
                href="/student/login"
                className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-5 py-3 rounded-full font-semibold"
              >
                Student Login
            </Link>
              <Link
                href="/student/register"
                className="border border-[#163232] text-[#163232] px-5 py-3 rounded-full font-semibold"
              >
                Register
              </Link>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            {mobileMenu ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-[80%] h-screen bg-white z-[100] shadow-2xl p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-7 mt-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >
                  {link.name}
                </a>
              ))}

              <Link
                href="/student/login"
                className="bg-linear-to-r from-[#3ED6C1] to-[#2CB5A0] text-white px-5 py-3 rounded-full font-semibold"
              >
                Student Login
              </Link>
              <Link
                href="/student/register"
                className="border border-[#163232] text-[#163232] px-5 py-3 rounded-full font-semibold"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
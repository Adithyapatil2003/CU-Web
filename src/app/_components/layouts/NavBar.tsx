"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/themeContext";
import { Sun, Moon, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-lg backdrop-blur-md dark:bg-gray-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br"
            >
              <span className="text-xl font-bold text-white">T</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TapOnn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  location === item.path
                    ? "text-primary-600 dark:text-primary-400"
                    : "hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
                {location === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="bg-primary-600 dark:bg-primary-400 absolute right-0 -bottom-1 left-0 h-0.5"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="group relative">
                <button className="bg-primary-600 hover:bg-primary-700 flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors">
                  <User size={16} />
                  <span>{user?.name}</span>
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown Menu */}
                <div className="invisible absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="space-y-4 px-4 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block text-base font-medium ${
                    location === item.path
                      ? "text-primary-600 dark:text-primary-400"
                      : "hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      className="hover:text-primary-600 dark:hover:text-primary-400 block text-base font-medium text-gray-700 dark:text-gray-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-base font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="hover:text-primary-600 dark:hover:text-primary-400 block text-base font-medium text-gray-700 dark:text-gray-300"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary w-full text-center"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

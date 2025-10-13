"use client";

import { motion } from "framer-motion";
// Replaced "next/link" with standard HTML components to resolve compilation error
// import Link from "next/link";
import { Frown } from "lucide-react";

/**
 * NotFoundPage Component
 * A responsive and aesthetically pleasing 404 error page.
 * Uses Tailwind CSS and Framer Motion for subtle entry animation.
 */
const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Added dark:shadow-lg for better contrast in dark mode
        className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-2xl md:p-12 dark:bg-gray-800 dark:shadow-lg"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary-500 mb-6"
          >
            <Frown size={64} strokeWidth={1.5} />
          </motion.div>
        </div>

        <h1 className="text-8xl font-extrabold text-gray-900 md:text-9xl dark:text-white">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-3xl dark:text-gray-200">
          Page Not Found
        </h2>

        <p className="mb-8 text-gray-500 dark:text-gray-400">
          Oops! The page you were looking for doesn't exist or has been moved.
          It looks like you took a wrong turn.
        </p>

        {/* FIX: Changed Link component to a standard <a> tag */}
        <motion.a
          href="/"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 25px -5px rgba(99, 102, 241, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-800 inline-flex cursor-pointer items-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 focus:ring-4 focus:outline-none"
        >
          Go back to Homepage
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

"use client";
import {
  useAnalytics,
  type AppPlatform,
  type DemoProduct,
  type DemoSource,
} from "@/contexts/analyticsContext";
import { motion } from "framer-motion";
import { Play, ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const textToType = [
  "Connect your digital presence with a single tap.",
  "Manage leads, contacts, and appointments instantly.",
];
const typingSpeed = 100;
const erasingSpeed = 50;
const delayAfterTyped = 2000;
const delayAfterErased = 1000;

function TypingEffect() {
  const [displayText, setDisplayText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [textIndex, setTextIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(true);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentText = textToType[textIndex];

    if (!currentText) {
      return;
    }

    if (isTyping) {
      if (index < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[index]);
          setIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayAfterTyped);
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, erasingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
          setTextIndex((prev) => (prev + 1) % textToType.length);
        }, delayAfterErased);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isTyping, textIndex]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
}

export default function Home() {
  const { trackDemoBooking, trackAppDownload } = useAnalytics();

  const handleDemoBooking = (product: DemoProduct, source: DemoSource) => {
    trackDemoBooking(product, source);
  };

  const handleAppDownload = (platform: AppPlatform) => {
    trackAppDownload(platform);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #3b82f6; /* Fallback */
        }
        .btn-primary {
          background-image: linear-gradient(145deg, #3b82f6, #6366f1);
          color: white;
          border-radius: 9999px;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }
        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
        .btn-secondary {
          background-color: #f3f4f6;
          color: #1f2937;
          border-radius: 9999px;
          transition:
            transform 0.2s,
            background-color 0.2s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .dark .btn-secondary {
          background-color: #374151;
          color: #d1d5db;
        }
        .typing-cursor {
          opacity: 1;
          animation: blink 0.7s infinite;
          font-weight: 300;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
      <section
        className="from-primary-50 to-accent-50 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br via-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="bg-primary-300 animate-float absolute top-20 left-20 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter"></div>
            <div
              className="bg-accent-300 animate-float absolute top-40 right-20 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="bg-secondary-300 animate-float absolute -bottom-8 left-40 h-72 w-72 rounded-full mix-blend-multiply blur-xl filter"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="animate-float absolute top-20 left-10 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ animationDelay: "0s" }}
          >
            🌱 Eco-friendly
          </motion.div>

          <motion.div
            className="animate-float absolute top-32 right-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ animationDelay: "1s" }}
          >
            ⚡ Instant Sharing
          </motion.div>

          <motion.div
            className="animate-float absolute bottom-32 left-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ animationDelay: "2s" }}
          >
            🌍 Global Network
          </motion.div>

          <motion.div
            className="animate-float absolute right-10 bottom-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{ animationDelay: "3s" }}
          >
            🎯 Lead Management
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Main Title */}
            <motion.h1
              className="text-stable relative z-10 mb-6 text-5xl font-bold text-gray-900 md:text-7xl lg:text-8xl dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="gradient-text text-stable">TapOnn</span>
            </motion.h1>

            {/* Typed Subtitle */}
            <motion.div
              className="text-stable relative z-10 mb-8 min-h-[3rem] text-2xl font-medium text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <span className="typed-text text-stable"></span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="text-stable relative z-10 mt-12 mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <Link href="/app/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
                >
                  <Sparkles size={20} />
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDemoBooking("Standard", "cta_button")}
                className="btn-secondary flex items-center space-x-2 px-8 py-4 text-lg"
              >
                <Play size={20} />
                <span>Book Demo</span>
              </motion.button>
            </motion.div>

            {/* App Download Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppDownload("Android")}
                className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <Download size={20} />
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppDownload("IOS")}
                className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <Download size={20} />
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 h-3 w-1 rounded-full bg-gray-400"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

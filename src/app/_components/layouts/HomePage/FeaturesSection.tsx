'use client'

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Star,
  Mail,
  Brain,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Disabled GSAP animations to prevent homepage conflicts
    // Using Framer Motion animations instead for stability
  }, []);

  const features = [
    {
      id: "lead-management",
      icon: Briefcase,
      title: "💼 Lead Management",
      subtitle: "AI-powered lead capture and management",
      description:
        "Automatically capture and manage leads with AI-powered card scanning and intelligent form auto-fill.",
      highlights: [
        "AI card scanner for instant data extraction",
        "Automatic form filling and validation",
        "Lead scoring and prioritization",
        "Integration with popular CRM platforms",
        "Real-time lead tracking and analytics",
        "Custom lead capture forms",
      ],
      color: "from-blue-500 to-purple-600",
      gradient: "from-blue-50 to-purple-50",
    },
    {
      id: "review-management",
      icon: Star,
      title: "⭐ Review Management",
      subtitle: "Multi-platform review collection",
      description:
        "Collect and manage customer reviews across Google, Justdial, and other platforms automatically.",
      highlights: [
        "Multi-platform review collection",
        "Automated review requests",
        "Review response management",
        "Review analytics and insights",
        "Custom review landing pages",
        "Review monitoring and alerts",
      ],
      color: "from-yellow-500 to-orange-600",
      gradient: "from-yellow-50 to-orange-50",
    },
    {
      id: "email-signature",
      icon: Mail,
      title: "📧 Email Signature & Virtual Background",
      subtitle: "Professional branding tools",
      description:
        "Enhance your professional image with customizable email signatures and virtual backgrounds.",
      highlights: [
        "Custom email signature templates",
        "Virtual background library",
        "Brand consistency tools",
        "Easy integration with email clients",
        "Analytics on signature clicks",
        "Team signature management",
      ],
      color: "from-green-500 to-teal-600",
      gradient: "from-green-50 to-teal-50",
    },
    {
      id: "ai-suggestions",
      icon: Brain,
      title: "🧠 AI Suggestions",
      subtitle: "Smart networking recommendations",
      description:
        "Get intelligent suggestions for connections and networking opportunities based on your industry and goals.",
      highlights: [
        "Industry-based connection suggestions",
        "Smart networking recommendations",
        "Event and conference suggestions",
        "Content sharing recommendations",
        "Follow-up reminders",
        "Networking strategy insights",
      ],
      color: "from-purple-500 to-pink-600",
      gradient: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 dark:bg-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Discover the advanced features that make TapOnn the ultimate digital
            networking platform for modern professionals and teams.
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "from-primary-500 to-accent-500 bg-gradient-to-r text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
          >
            {/* Left Side - Feature Details */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div
                  className={`h-16 w-16 bg-gradient-to-br mb-6 flex items-center justify-center rounded-2xl`}
                >
                  {features[activeTab] &&
                    React.createElement(features[activeTab].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                </div>

                <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                  {features[activeTab]?.title}
                </h3>

                <p className="text-primary-600 dark:text-primary-400 mb-6 text-lg font-medium">
                  {features[activeTab]?.subtitle}
                </p>

                <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                  {features[activeTab]?.description}
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {features[activeTab]?.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="btn-primary mt-8 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Side - Feature Mockup */}
            <motion.div
              className={`feature-card rounded-3xl bg-gradient-to-br p-8 dark:from-gray-800 dark:to-gray-700`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
                {/* Mockup Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 bg-gradient-to-br flex items-center justify-center rounded-lg`}
                    >
                      {features[activeTab]?.icon &&
                        React.createElement(features[activeTab].icon, {
                          className: "w-5 h-5 text-white",
                        })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {features[activeTab]?.title.split(" ")[1]}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + item * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                          <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
                          <div className="mt-1 h-2 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                      </div>
                      <div className="bg-primary-500 h-6 w-12 rounded-full"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Total", value: "1,247" },
                    { label: "Active", value: "892" },
                    { label: "Growth", value: "+23%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Ready to Experience These Features?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Start using TapOnn today and discover how these powerful features
            can transform your networking experience.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

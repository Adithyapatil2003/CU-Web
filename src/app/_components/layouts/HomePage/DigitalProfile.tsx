"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Link as LinkIcon,
  Target,
  Zap,
  Users,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";

const DigitalProfile = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Disabled GSAP animations to prevent conflicts with homepage
    // Using Framer Motion animations instead for stability
  }, []);

  const benefits = [
    {
      icon: Brain,
      title: "🧠 Smart First Impressions",
      description:
        "Make lasting impressions with dynamic, interactive digital profiles that showcase your expertise and personality.",
      features: [
        "AI-powered suggestions",
        "Dynamic content updates",
        "Professional branding",
      ],
    },
    {
      icon: LinkIcon,
      title: "🔗 One Tap All Links",
      description:
        "Share all your important links, social media, and contact information with a single tap or scan.",
      features: [
        "Instant sharing",
        "Multiple platform links",
        "Custom landing pages",
      ],
    },
    {
      icon: Target,
      title: "🎯 Professional Identity",
      description:
        "Build and maintain a consistent, professional digital identity across all platforms and interactions.",
      features: [
        "Brand consistency",
        "Professional templates",
        "Custom branding",
      ],
    },
    {
      icon: Zap,
      title: "⚡ Lightning Fast",
      description:
        "Share your information instantly without the hassle of physical cards or manual data entry.",
      features: ["Instant sharing", "No manual entry", "Real-time updates"],
    },
    {
      icon: Users,
      title: "👥 Network Growth",
      description:
        "Expand your professional network effortlessly with smart connections and lead management.",
      features: [
        "Smart networking",
        "Lead tracking",
        "Relationship management",
      ],
    },
    {
      icon: Shield,
      title: "🔒 Secure & Private",
      description:
        "Keep your information secure while maintaining full control over what you share and with whom.",
      features: ["Data encryption", "Privacy controls", "Secure sharing"],
    },
  ];

  const stats = [
    { number: "10x", label: "Faster Sharing", icon: Zap },
    { number: "50%", label: "More Connections", icon: Users },
    { number: "100%", label: "Eco-friendly", icon: Globe },
    { number: "24/7", label: "Always Available", icon: TrendingUp },
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
            Why Choose <span className="gradient-text">Digital Profiles?</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Transform your networking experience with smart, efficient, and
            eco-friendly digital solutions that make connecting effortless and
            professional.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card h-full p-8 transition-all duration-300 group-hover:-translate-y-2 hover:shadow-2xl">
                {/* Icon */}
                <div className="benefit-icon from-primary-500 to-accent-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div className="bg-primary-500 mr-3 h-2 w-2 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="from-primary-600 to-accent-500 rounded-3xl bg-gradient-to-r p-8 text-white md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold md:text-4xl">
              The Numbers Speak for Themselves
            </h3>
            <p className="text-primary-100 text-xl">
              See how digital profiles are transforming networking worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-3xl font-bold md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-primary-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Ready to Transform Your Networking?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Join thousands of professionals who have already upgraded to digital
            profiles and are experiencing the benefits of smart networking.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalProfile;

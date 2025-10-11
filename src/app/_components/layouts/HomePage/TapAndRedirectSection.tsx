'use client'

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  QrCode,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  Zap,
} from "lucide-react";

const TapAndRedirectSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate steps on scroll
    gsap.from(".step-card", {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate phone mockup
    gsap.from(".phone-mockup", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Auto-advance steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: CreditCard,
      title: "1. Tap Your Card",
      description: "Simply tap your NFC-enabled TapOnn card on any smartphone",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: QrCode,
      title: "2. Scan QR Code",
      description:
        "Or scan the QR code with your phone camera for instant access",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Smartphone,
      title: "3. Instant Profile",
      description:
        "Your personalized digital profile opens instantly on their device",
      color: "from-orange-500 to-red-600",
    },
  ];

  const contactLinks = [
    {
      icon: Phone,
      label: "Call",
      color: "bg-green-500",
      href: "tel:+1234567890",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      color: "bg-green-600",
      href: "https://wa.me/1234567890",
    },
    {
      icon: Mail,
      label: "Email",
      color: "bg-blue-500",
      href: "mailto:hello@taponn.com",
    },
    {
      icon: Instagram,
      label: "Instagram",
      color: "bg-pink-500",
      href: "https://instagram.com/taponn",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      color: "bg-blue-600",
      href: "https://linkedin.com/in/taponn",
    },
    {
      icon: Twitter,
      label: "Twitter",
      color: "bg-blue-400",
      href: "https://twitter.com/taponn",
    },
    {
      icon: Youtube,
      label: "YouTube",
      color: "bg-red-500",
      href: "https://youtube.com/taponn",
    },
    {
      icon: Globe,
      label: "Website",
      color: "bg-purple-500",
      href: "https://taponn.com",
    },
    {
      icon: Calendar,
      label: "Calendly",
      color: "bg-blue-700",
      href: "https://calendly.com/taponn",
    },
    {
      icon: MapPin,
      label: "Location",
      color: "bg-red-600",
      href: "https://maps.google.com",
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
            Tap & <span className="gradient-text">Redirect</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Experience the magic of instant sharing. One tap or scan opens your
            complete digital profile with all your important links and contact
            information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Side - Steps */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h3>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`step-card card p-6 transition-all duration-300 ${
                    activeStep === index
                      ? "ring-primary-500 shadow-lg ring-2"
                      : ""
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`h-12 w-12 bg-gradient-to-br ${step.color} flex flex-shrink-0 items-center justify-center rounded-xl`}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <motion.div
              className="from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 mt-8 rounded-2xl bg-gradient-to-r p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <Zap className="text-primary-600 mr-2 h-5 w-5" />
                Instant Features
              </h4>
              <ul className="space-y-2">
                {[
                  "No app installation required",
                  "Works on all smartphones",
                  "Real-time profile updates",
                  "Analytics and insights",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    <div className="bg-primary-500 mr-3 h-2 w-2 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            className="phone-mockup relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Phone Frame */}
            <div className="relative mx-auto h-[600px] w-80 rounded-[3rem] bg-gray-900 p-2 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-800">
                {/* Status Bar */}
                <div className="from-primary-500 to-accent-500 flex h-8 items-center justify-between bg-gradient-to-r px-6 text-xs text-white">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-1 rounded-full bg-white"></div>
                    <div className="h-5 w-1 rounded-full bg-white"></div>
                    <div className="h-7 w-1 rounded-full bg-white"></div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="h-full overflow-y-auto p-6">
                  {/* Profile Header */}
                  <div className="mb-8 text-center">
                    <div className="from-primary-500 to-accent-500 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br">
                      <span className="text-2xl font-bold text-white">JD</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      John Doe
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Digital Marketing Specialist
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Helping businesses grow through innovative digital
                      solutions
                    </p>
                  </div>

                  {/* Contact Links Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {contactLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} flex flex-col items-center justify-center rounded-xl p-4 text-center text-white transition-transform duration-200 hover:scale-105`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <link.icon className="mb-2 h-6 w-6" />
                        <span className="text-xs font-medium">
                          {link.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="from-primary-500 to-accent-500 mt-6 flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r py-3 font-semibold text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Connect Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-500 shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="h-8 w-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <QrCode className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Ready to Experience Instant Sharing?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Get your personalized TapOnn card and start sharing your digital
            profile instantly.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Get Your Card
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Try Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TapAndRedirectSection;

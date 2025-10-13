'use client'

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Download,
  QrCode,
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
  CheckCircle,
  BarChart3,
  Globe,
} from "lucide-react";
import Link from "next/link";

const AppSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const appFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant profile sharing and connection",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security for your data",
    },
    {
      icon: Users,
      title: "Team Sync",
      description: "Seamless team collaboration and management",
    },
    {
      icon: Star,
      title: "Smart Analytics",
      description: "Detailed insights and performance tracking",
    },
  ];

  const appStats = [
    { number: "4.8", label: "App Store Rating", icon: Star },
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "1M+", label: "Connections Made", icon: Zap },
    { number: "99.9%", label: "Uptime", icon: Shield },
  ];

  return (
    <section
      ref={sectionRef}
      className="from-primary-50 to-accent-50 relative overflow-hidden bg-gradient-to-br via-white py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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
            TapOnn <span className="gradient-text">Mobile App</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Take your digital networking anywhere with our powerful mobile app.
            Available on iOS and Android with seamless sync across all devices.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Side - App Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              Powerful Mobile Experience
            </h3>

            <div className="mb-8 space-y-6">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="app-feature flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="from-primary-500 to-accent-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-2 gap-6">
              {appStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl bg-white p-4 text-center shadow-lg dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="from-primary-500 to-accent-500 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            className="phone-mockup relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Phone Frame */}
            <div className="relative">
              <div className="h-[600px] w-80 rounded-[3rem] bg-gray-900 p-2 shadow-2xl">
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

                  {/* App Content */}
                  <div className="h-full overflow-y-auto p-6">
                    {/* App Header */}
                    <div className="mb-8 text-center">
                      <div className="from-primary-500 to-accent-500 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br">
                        <span className="text-2xl font-bold text-white">T</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        TapOnn
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Digital Networking Platform
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: Smartphone,
                          label: "Scan Card",
                          color: "bg-blue-500",
                        },
                        {
                          icon: QrCode,
                          label: "QR Code",
                          color: "bg-green-500",
                        },
                        {
                          icon: Users,
                          label: "Contacts",
                          color: "bg-purple-500",
                        },
                        {
                          icon: BarChart3,
                          label: "Analytics",
                          color: "bg-orange-500",
                        },
                      ].map((action, index) => (
                        <motion.div
                          key={index}
                          className={`${action.color} rounded-xl p-4 text-center text-white`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <action.icon className="mx-auto mb-2 h-6 w-6" />
                          <div className="text-xs font-medium">
                            {action.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                      </h4>
                      {[
                        {
                          name: "Sarah Johnson",
                          action: "viewed your profile",
                          time: "2m ago",
                        },
                        {
                          name: "Mike Chen",
                          action: "connected with you",
                          time: "5m ago",
                        },
                        {
                          name: "Emma Davis",
                          action: "shared your card",
                          time: "10m ago",
                        },
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.6 + index * 0.1,
                          }}
                        >
                          <div className="from-primary-500 to-accent-500 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br">
                            <span className="text-xs font-bold text-white">
                              {activity.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {activity.action} • {activity.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-500 shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CheckCircle className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Download Section */}
        <motion.div
          className="rounded-3xl bg-white p-8 shadow-xl md:p-12 dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Download TapOnn App
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get the app and start networking smarter today
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {/* App Store Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <Download className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <Download className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.button>

              <Link href="/app/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 flex items-center space-x-3 rounded-lg bg-gradient-to-r px-6 py-3 text-white transition-colors"
                >
                  <Globe className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs">Try it now</div>
                    <div className="text-sm font-semibold">Web App</div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-xl bg-white p-4 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan to download
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              "Offline access to your profile",
              "Push notifications for connections",
              "Biometric authentication",
              "Dark mode support",
              "Multi-language support",
              "Regular updates and improvements",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppSection;

'use client'

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  BarChart3,
  TrendingUp,
  Target,
  Calendar,
  Plus,
  DollarSign,
} from "lucide-react";

const TeamsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate dashboard elements
    gsap.from(".dashboard-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate metrics
    gsap.from(".metric-item", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Sales Manager",
      avatar: "SJ",
      status: "online",
      leads: 45,
    },
    {
      name: "Mike Chen",
      role: "Marketing Lead",
      avatar: "MC",
      status: "online",
      leads: 32,
    },
    {
      name: "Emma Davis",
      role: "Account Executive",
      avatar: "ED",
      status: "away",
      leads: 28,
    },
    {
      name: "Alex Rodriguez",
      role: "Business Dev",
      avatar: "AR",
      status: "offline",
      leads: 19,
    },
  ];

  const metrics = [
    {
      icon: Users,
      label: "Team Members",
      value: "12",
      change: "+2",
      color: "text-blue-600",
    },
    {
      icon: Target,
      label: "Total Leads",
      value: "1,247",
      change: "+15%",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: "23.4%",
      change: "+2.1%",
      color: "text-purple-600",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "$45.2K",
      change: "+8.3%",
      color: "text-orange-600",
    },
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
            TapOnn for <span className="gradient-text">Teams</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Empower your entire team with unified digital profiles, advanced CRM
            integrations, and comprehensive lead management tools.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Side - Dashboard Mockup */}
          <motion.div
            className="dashboard-mockup"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
              {/* Dashboard Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Team Dashboard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Real-time performance overview
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Live
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="metric-item rounded-xl bg-gray-50 p-4 dark:bg-gray-700"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {metric.value}
                        </p>
                      </div>
                      <div
                        className={`from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br`}
                      >
                        <metric.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        {metric.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Team Members
                  </h4>
                  <button className="bg-primary-500 flex h-6 w-6 items-center justify-center rounded-full">
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                </div>
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="dashboard-card flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
                          <span className="text-sm font-semibold text-white">
                            {member.avatar}
                          </span>
                        </div>
                        <div
                          className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.leads}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        leads
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              Powerful Team Features
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: "Team Profile Management",
                  description:
                    "Manage all team member profiles from a centralized dashboard with role-based permissions.",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description:
                    "Track team performance, lead generation, and conversion rates with detailed insights.",
                },
                {
                  icon: Target,
                  title: "CRM Integrations",
                  description:
                    "Seamlessly integrate with popular CRM platforms like Salesforce, HubSpot, and Zoho.",
                },
                {
                  icon: Calendar,
                  title: "Sub-team Management",
                  description:
                    "Organize your team into departments and manage permissions efficiently.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
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
          </motion.div>
        </div>

        {/* Demo Booking Form */}
        <motion.div
          className="rounded-3xl bg-white p-8 shadow-xl md:p-12 dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Scale Your Team?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {"Book a personalized demo and see how TapOnn can transform your team's networking."}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Team Size
              </label>
              <select className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option>Select team size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>200+ employees</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Email
              </label>
              <input
                type="email"
                className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Book Team Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamsSection;

"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Target,
  Heart,
  Globe,
  Zap,
  Award,
  TrendingUp,
  Lightbulb,
  Rocket,
} from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate timeline
    gsap.from(".timeline-item", {
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

    // Animate floating icons
    gsap.to(".floating-icon", {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "TapOnn was founded with a vision to revolutionize digital networking",
      icon: Lightbulb,
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Launched our first NFC business card solution",
      icon: Rocket,
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Grew to 50+ team members and 10,000+ users",
      icon: Users,
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 25+ countries with 100,000+ users",
      icon: Globe,
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Leading the future of digital networking worldwide",
      icon: TrendingUp,
    },
  ];

  const founders = [
    {
      name: "Priya Sharma",
      role: "CEO & Co-Founder",
      avatar: "PS",
      bio: "Former Google Product Manager with 10+ years in tech",
      emoji: "👩‍💼",
    },
    {
      name: "Rahul Patel",
      role: "CTO & Co-Founder",
      avatar: "RP",
      bio: "Ex-Microsoft engineer with expertise in NFC technology",
      emoji: "👨‍💼",
    },
    {
      name: "Amit Kumar",
      role: "COO & Co-Founder",
      avatar: "AK",
      bio: "Serial entrepreneur with 3 successful exits",
      emoji: "👨‍💼",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries in digital networking",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making networking accessible to everyone worldwide",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering the highest quality products and service",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-800"
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

      {/* Floating Icons */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="floating-icon from-primary-500 to-accent-500 absolute top-20 left-20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Lightbulb className="h-6 w-6 text-white" />
        </motion.div>
        <motion.div
          className="floating-icon from-accent-500 to-primary-500 absolute top-40 right-20 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="h-5 w-5 text-white" />
        </motion.div>
        <motion.div
          className="floating-icon from-secondary-500 to-primary-500 absolute bottom-20 left-40 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="h-4 w-4 text-white" />
        </motion.div>
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
            About <span className="gradient-text">TapOnn</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Learn about our journey, mission, and the team behind the revolution
            in digital networking.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="card h-full p-8">
              <div className="from-primary-500 to-accent-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                To revolutionize the way people connect and network by providing
                innovative, eco-friendly digital solutions that make sharing
                information instant, professional, and meaningful.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card h-full p-8">
              <div className="from-accent-500 to-primary-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                To become the global standard for digital networking, connecting
                millions of professionals worldwide through seamless,
                intelligent, and sustainable networking solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Our Journey
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="from-primary-500 to-accent-500 absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`timeline-item flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <div className="card p-6">
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-primary-600 text-2xl font-bold">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="from-primary-500 to-accent-500 h-4 w-4 rounded-full border-4 border-white bg-gradient-to-br shadow-lg dark:border-gray-800"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Meet Our Founders
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                className="card p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="mb-4 text-4xl">{founder.emoji}</div>
                <div className="from-primary-500 to-accent-500 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                  <span className="text-xl font-bold text-white">
                    {founder.avatar}
                  </span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {founder.name}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 mb-3 font-medium">
                  {founder.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Our Values
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="from-primary-500 to-accent-500 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Join Our Mission
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {
              "Be part of the revolution in digital networking. Together, we're building the future of professional connections."
            }
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Join Our Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

const TrustedBySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate logos on scroll
    gsap.from(".brand-logo", {
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

    // Animate testimonials
    gsap.from(".testimonial-card", {
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const brands = [
    { name: "Microsoft", logo: "MS", color: "from-blue-500 to-blue-600" },
    { name: "Google", logo: "G", color: "from-red-500 to-red-600" },
    { name: "Apple", logo: "A", color: "from-gray-500 to-gray-600" },
    { name: "Amazon", logo: "AM", color: "from-orange-500 to-orange-600" },
    { name: "Meta", logo: "M", color: "from-blue-600 to-blue-700" },
    { name: "Netflix", logo: "N", color: "from-red-600 to-red-700" },
    { name: "Tesla", logo: "T", color: "from-red-500 to-red-600" },
    { name: "Salesforce", logo: "SF", color: "from-blue-500 to-blue-600" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director",
      company: "TechCorp",
      content:
        "TapOnn has revolutionized how our sales team networks. The instant sharing and lead tracking features have increased our conversion rates by 40%.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "InnovateLab",
      content:
        "The digital profiles are incredibly professional and the analytics help us understand our networking ROI. Highly recommended for any business.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      role: "Business Development",
      company: "GrowthCo",
      content:
        "Our team loves the ease of use and the professional appearance. It's made networking events so much more productive and efficient.",
      rating: 5,
      avatar: "ED",
    },
    {
      name: "Alex Rodriguez",
      role: "CEO",
      company: "StartupXYZ",
      content:
        "TapOnn has been a game-changer for our startup. The cost savings from not printing business cards and the professional image it creates is invaluable.",
      rating: 5,
      avatar: "AR",
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
            Trusted by <span className="gradient-text">Leading Brands</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Join thousands of professionals and companies who trust TapOnn for
            their digital networking needs.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="brand-logo group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`h-16 w-16 bg-gradient-to-br ${brand.color} mx-auto flex items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-lg`}
              >
                <span className="text-lg font-bold text-white">
                  {brand.logo}
                </span>
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              What Our Customers Say
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Real feedback from professionals who have transformed their
              networking with TapOnn
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card card h-full p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Quote Icon */}
                <div className="from-primary-500 to-accent-500 mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br">
                  <Quote className="h-4 w-4 text-white" />
                </div>

                {/* Rating */}
                <div className="mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="from-primary-500 to-accent-500 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
                    <span className="text-sm font-semibold text-white">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="from-primary-600 to-accent-500 rounded-3xl bg-gradient-to-r p-8 text-center text-white md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="mb-8 text-3xl font-bold md:text-4xl">
            Join the TapOnn Community
          </h3>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Connections Made" },
              { number: "500+", label: "Companies" },
              { number: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
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
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Ready to Join Them?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Start your journey with TapOnn today and experience the future of
            digital networking.
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
              View Success Stories
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;

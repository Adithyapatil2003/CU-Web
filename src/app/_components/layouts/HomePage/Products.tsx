"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CreditCard,
  Monitor,
  Star,
  Package,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";

const ProductsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Disabled GSAP animations to prevent homepage conflicts
    // Using CSS hover effects and Framer Motion instead
  }, []);

  const products = [
    {
      id: "nfc-cards",
      icon: CreditCard,
      title: "NFC Business Cards",
      subtitle: "Visiting + Complete Cards",
      description:
        "Revolutionary NFC-enabled business cards that instantly share your digital profile with a simple tap.",
      features: [
        "Instant contact sharing",
        "Customizable design",
        "Lead tracking",
        "Analytics dashboard",
      ],
      price: "From $29",
      popular: true,
      gradient: "from-blue-500 to-purple-600",
      badge: "Most Popular",
    },
    {
      id: "smart-standee",
      icon: Monitor,
      title: "Smart Standee",
      subtitle: "Interactive Display",
      description:
        "Interactive digital displays that engage visitors and collect leads automatically through NFC technology.",
      features: [
        "Interactive displays",
        "Lead collection",
        "Content management",
        "Real-time analytics",
      ],
      price: "From $199",
      gradient: "from-green-500 to-teal-600",
      badge: "New",
    },
    {
      id: "review-cards",
      icon: Star,
      title: "Review Cards",
      subtitle: "Feedback Collection",
      description:
        "Smart cards designed to collect customer reviews and feedback across multiple platforms instantly.",
      features: [
        "Multi-platform reviews",
        "Automated collection",
        "Review management",
        "Response tracking",
      ],
      price: "From $19",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      id: "bundle-cards",
      icon: Package,
      title: "Bundle Cards",
      subtitle: "Complete Solution",
      description:
        "Complete networking solution combining NFC cards, digital profiles, and lead management tools.",
      features: [
        "Complete package",
        "Team management",
        "Advanced analytics",
        "Priority support",
      ],
      price: "From $99",
      gradient: "from-purple-500 to-pink-600",
      badge: "Best Value",
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Our Smart <span className="gradient-text">Products</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Choose from our range of innovative NFC products designed to
            transform your networking and lead generation experience.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="card-inner card relative h-full overflow-hidden p-6">
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 right-4 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${product.gradient}`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`h-16 w-16 bg-gradient-to-br ${product.gradient} mb-6 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <product.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {product.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium">
                    {product.subtitle}
                  </p>
                  <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                      >
                        <div className="bg-primary-500 mr-2 h-1.5 w-1.5 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 dark:text-primary-400 group-hover:text-primary-700 text-sm font-medium transition-colors">
                      Learn More
                    </span>
                    <ArrowRight className="text-primary-600 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="from-primary-500/10 to-accent-500/10 absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          className="rounded-3xl bg-white p-8 shadow-xl md:p-12 dark:bg-gray-900"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Why Choose TapOnn Products?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built with cutting-edge technology and designed for modern
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Instant sharing and connection",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Enterprise-grade security",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Works anywhere in the world",
              },
              {
                icon: Users,
                title: "Team Ready",
                desc: "Perfect for teams and organizations",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="from-primary-500 to-accent-500 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
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
            Ready to Get Started?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Choose the perfect product for your needs and start transforming
            your networking experience today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              View All Products
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Compare Products
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

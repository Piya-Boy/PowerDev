"use client";
import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { pricing, tabs } from '@/data/pricing';
import { motion, AnimatePresence } from 'framer-motion';

type PricingTab = keyof typeof pricing;
type Plan = (typeof pricing)[keyof typeof pricing]['plans'][number];
type Tab = typeof tabs[number];

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};
const titleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.2 + i * 0.1 },
  }),
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.3 } },
};

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState<PricingTab>('website');

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-[#0A0F1F] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose a package that suits your business. Or inquire to customize more
          </p>
        </motion.div>
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-16"
          variants={tabVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap">
              {tabs.map((tab: Tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PricingTab)}
                  className={`px-6 py-3 m-1 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Service Category Title */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {pricing[activeTab].title}
          </h3>
        </motion.div>
        {/* Pricing Cards */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {pricing[activeTab].plans.map((plan: Plan, index: number) => (
              <motion.div
                key={index}
                className={`relative ${plan.bgColor} ${plan.textColor} rounded-2xl shadow-xl border ${plan.borderColor} transition-all duration-300 hover:shadow-2xl hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-500 lg:scale-105' : ''}`}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="p-8">
                  {/* Plan Name */}
                  <h4 className={`text-2xl font-bold mb-3 ${plan.popular ? 'text-blue-400' : ''}`}>
                    {plan.name}
                  </h4>
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className={`text-lg ml-2 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                      /project
                    </span>
                  </div>
                  {/* Description */}
                  <p className={`text-base mb-8 leading-relaxed ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-400' : 'text-green-500'}`} />
                        <span className={`text-base ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(PricingSection);
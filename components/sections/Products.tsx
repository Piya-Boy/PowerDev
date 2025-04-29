"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const [activeTab, setActiveTab] = useState("ai-assistant");

  const products = [
    {
      id: "ai-assistant",
      title: "AssistAI",
      description:
        "An AI-powered assistant designed specifically for people with disabilities, offering voice control, screen reading, and interface adaptation.",
      features: [
        "Voice-activated commands",
        "Adaptive interface based on user needs",
        "Custom shortcuts for frequent tasks",
        "Screen reading with natural voice",
      ],
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "accessibility-toolkit",
      title: "AccessKit",
      description:
        "A comprehensive toolkit for developers to integrate accessibility features into their applications quickly and efficiently.",
      features: [
        "Plug-and-play accessibility components",
        "Automatic WCAG compliance checking",
        "User testing simulations",
        "Documentation and best practices",
      ],
      image:
        "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "remote-collab",
      title: "CollabSpace",
      description:
        "A remote collaboration platform designed to be fully accessible and inclusive for team members with diverse abilities.",
      features: [
        "Fully accessible video conferencing",
        "Real-time captioning and transcription",
        "Keyboard-navigable interfaces",
        "Customizable workspace layouts",
      ],
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <section id="products" className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Our Products
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            We develop innovative tech products that combine accessibility with
            cutting-edge functionality.
          </p>
        </motion.div>

        <Tabs
          defaultValue="ai-assistant"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/70">
              {products.map((product) => (
                <TabsTrigger
                  key={product.id}
                  value={product.id}
                  className="cursor-pointer data-[state=active]:text-white data-[state=active]:text-glow data-[state=active]:bg-[#1a1a1a]  px-4 py-2 transition-all duration-200"
                >
                  {product.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 bg-[#131628] overflow-hidden animated-gradient-border">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-6 md:p-8 flex flex-col h-full">
                        <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--neon-blue))] text-glow">
                          {product.title}
                        </h3>
                        <p className="text-gray-300 mb-6">
                          {product.description}
                        </p>

                        <h4 className="text-lg font-semibold mb-3 text-white">
                          Key Features
                        </h4>
                        <ul className="mb-6 space-y-2">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[hsl(var(--neon-green))] mr-2">
                                •
                              </span>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button className="mt-auto w-fit group bg-[hsl(var(--neon-blue)/0.1)] text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue)/0.3)] hover:bg-[hsl(var(--neon-blue)/0.2)]">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                      <div className="h-64 md:h-auto bg-gray-800 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Products;

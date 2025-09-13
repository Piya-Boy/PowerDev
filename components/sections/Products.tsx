"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  // State สำหรับการดูเพิ่มแต่ละ category
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
        setActiveTab("All"); // ตั้ง activeTab เป็น All เสมอหลังโหลดข้อมูล
      } catch (e) {
        setProducts([]);
        setActiveTab("All"); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
        <div className="container mx-auto px-4 text-center text-white">Loading products...</div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section id="products" className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
        <div className="container mx-auto px-4 text-center text-white">No products found.</div>
      </section>
    );
  }

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
          defaultValue="All"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/70 ">
              {/* ตัวเลือกประเภทสินค้า */}
              {[
                { label: 'All', value: 'All' },
                { label: 'Web App', value: 'web app' },
                { label: 'Mobile App', value: 'mobile app' },
                { label: 'Other', value: 'other' },
              ].map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="cursor-pointer data-[state=active]:text-white data-[state=active]:text-glow data-[state=active]:bg-[#1a1a1a] px-4 py-2 transition-all duration-200"
                  onClick={() => setActiveTab(cat.value)}
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* แสดงเฉพาะสินค้าตามประเภทที่เลือก */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((product) =>
                activeTab === 'All' ||
                product.category?.toLowerCase() === activeTab.toLowerCase()
              )
              .slice(0, showMore[activeTab] ? undefined : 3)
              .map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring', stiffness: 80 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15)' }}
                >
                  <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-0 shadow-xl transition-transform duration-300 h-full flex flex-col justify-between">
                    <div className="flex flex-col h-full ">
                      <div className="h-56 w-full overflow-hidden rounded-t-lg bg-gray-900 flex items-center justify-center relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                        />
                        <span className="absolute top-3 right-3 text-gray-900 bg-amber-500 rounded-3xl text-base font-bold px-4 py-1 z-10">
                          ${product.price?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col p-6">
                        <h3 className="text-xl font-bold text-[hsl(var(--neon-blue))] text-glow truncate mb-2">{product.name}</h3>
                        <p className="text-gray-300 mb-4 line-clamp-3">{product.description}</p>
                        <div className="flex flex-col gap-2 mt-auto">
                          <span className="inline-block bg-[hsl(var(--neon-green)/0.1)] text-[hsl(var(--neon-green))] px-3 py-1 rounded-full text-xs font-semibold w-fit mb-1">{product.category}</span>
                          <Button className="w-full mt-2 group bg-[hsl(var(--neon-blue)/0.1)] text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue)/0.3)] hover:bg-[hsl(var(--neon-blue)/0.2)]">
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
          {/* ปุ่มดูเพิ่ม */}
          {products.filter((product) =>
            activeTab === 'All' ||
            product.category?.toLowerCase() === activeTab.toLowerCase()
          ).length > 3 && !showMore[activeTab] && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowMore((prev) => ({ ...prev, [activeTab]: true }))}
                className="cursor-pointer px-8 py-2 text-lg font-semibold rounded-full bg-[hsl(var(--neon-blue)/0.2)] text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue)/0.3)] hover:bg-[hsl(var(--neon-blue)/0.3)]"
              >
                Show more
              </Button>
            </div>
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default React.memo(Products);

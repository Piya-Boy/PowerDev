'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const { name, email, message } = data;
    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;
    
    window.location.href = `mailto:powerdev.tech@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast.success('Opening email client...');
    form.reset();
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Contact Us</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Have a project in mind or interested in learning more about our services? Get in touch with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[hsl(var(--neon-blue))/0.1] mr-4">
                  <Mail className="w-6 h-6 text-[hsl(var(--neon-blue))]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Email</h4>
                  <p className="text-gray-300">powerdev.tech@hotmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[hsl(var(--neon-purple))/0.1] mr-4">
                  <Phone className="w-6 h-6 text-[hsl(var(--neon-purple))]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Phone</h4>
                  <p className="text-gray-300"></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[hsl(var(--neon-green))/0.1] mr-4">
                  <MessageSquare className="w-6 h-6 text-[hsl(var(--neon-green))]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-white">Social Media</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
                    <a href="https://www.facebook.com/profile.php?id=61575847232619" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-0 bg-[#131628] animated-gradient-border">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-[hsl(var(--background))] border-[hsl(var(--border))]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              {...field} 
                              className="bg-[hsl(var(--background))] border-[hsl(var(--border))]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              {...field} 
                              rows={5}
                              className="bg-[hsl(var(--background))] border-[hsl(var(--border))] text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[hsl(var(--neon-blue))] text-black hover:bg-[hsl(var(--neon-blue)/0.8)] cyberpunk-glow transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
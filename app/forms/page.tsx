'use client';

import { useState, useEffect } from 'react';
import { Testimonial } from '@/types/testimonial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MultiSelect } from "@/components/ui/multi-select"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ThemeProvider } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95 
  }
};

const positions = [
  { value: "Developer", label: "Developer" },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "Designer", label: "Designer" },
  { value: "Tester", label: "Tester" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Project Manager", label: "Project Manager" },
  { value: "Content Creator", label: "Content Creator" },
  { value: "Sales", label: "Sales" },
  { value: "Support", label: "Support" },
  { value: "Other", label: "Other" }
];

type FormValues = {
  name: string;
  position: string[];
  content: string;
  image: string;
  profile_link: string;
};

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  position: z.array(z.string()).min(1, 'Select at least one position'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  image: z.string().url('Please enter a valid image URL'),
  profile_link: z.string().url('Please enter a valid URL'),
});

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
};

const dialogVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const formItemVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  }
};

const deleteDialogVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const deleteContentVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      delay: 0.1
    }
  }
};

const deleteButtonVariants = {
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95 
  }
};

export default function FormsPage() {
  const [forms, setForms] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<Testimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      position: [],
      content: '',
      image: '',
      profile_link: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    loadForms();
  }, [open, deleteDialogOpen]);

  const loadForms = async () => {
    try {
      const response = await fetch('/api/forms');
      const data = await response.json();
      setForms(data.forms);
    } catch (error) {
      console.error('Error loading forms:', error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/forms/${editingId}` : '/api/forms';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Server error:', error);
        throw new Error(error.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      // รอ mockapi sync
      await new Promise(res => setTimeout(res, 1200));
      await loadForms(); // Wait for data to reload
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('testimonialDataChanged'));
      
      // Reset form and close dialog
      reset();
      setImagePreview(null);
      setEditingId(null);
      setOpen(false); // Close the dialog
      
      toast({
        title: 'Success',
        description: editingId ? 'Form updated successfully' : 'Form created successfully',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit form',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (formData: Testimonial) => {
    form.reset({
      name: formData.name,
      position: formData.position,
      content: formData.content,
      image: formData.image,
      profile_link: formData.profile_link,
    });
    setImagePreview(formData.image);
    setEditingId(formData.id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // รอ mockapi sync
        await new Promise(res => setTimeout(res, 1200));
        await loadForms(); // Wait for data to reload
        setDeleteDialogOpen(false);
        setFormToDelete(null);
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('testimonialDataChanged'));
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#0a0520] to-[#2e0a3a] text-[#d9d9d9]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8 mt-16">
            <motion.h1 
              className="text-3xl font-bold"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Manage Forms
            </motion.h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
                    onClick={() => {
                      reset({
                        name: '',
                        position: [],
                        content: '',
                        image: '',
                        profile_link: '',
                      });
                      setImagePreview(null);
                      setEditingId(null);
                      setOpen(true);
                    }}
                  >
                    Add New Testimonial
                  </Button>
                </motion.div>
              </DialogTrigger>
              <AnimatePresence>
                {open && (
                  <>
                    <motion.div
                      className="fixed inset-0 bg-black/40 z-50"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                    <motion.div
                      className="fixed inset-0 flex items-center justify-center z-50"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div
                        variants={dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#2d1b3d] p-6 rounded-xl shadow-2xl w-full max-w-md relative border border-purple-500/20"
                      >
                        <motion.button
                          className="absolute right-4 top-4 p-1 rounded-full hover:bg-purple-500/20 text-purple-300 hover:text-purple-100 transition-colors"
                          onClick={() => setOpen(false)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                        <DialogHeader className="mb-4">
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </DialogTitle>
                          </motion.div>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                            <motion.div
                              variants={formItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.3 }}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter name" 
                                        {...field} 
                                        className="bg-[#2a2a42] border-purple-500/30 focus:border-purple-500 transition-colors"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-pink-400" />
                                  </FormItem>
                                )}
                              />
                            </motion.div>

                            <motion.div
                              variants={formItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.4 }}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Positions</FormLabel>
                                    <FormControl>
                                      <MultiSelect
                                        selected={field.value}
                                        setSelected={(positions) => {
                                          field.onChange(positions);
                                        }}
                                        options={positions}
                                        placeholder="Select positions..."
                                        className="bg-[#2a2a42] border-purple-500/30"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-pink-400" />
                                  </FormItem>
                                )}
                              />
                            </motion.div>

                            <motion.div
                              variants={formItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.5 }}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Content</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Enter content" 
                                        {...field}
                                        className="bg-[#2a2a42] border-purple-500/30 focus:border-purple-500 transition-colors min-h-[120px]"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-pink-400" />
                                  </FormItem>
                                )}
                              />
                            </motion.div>

                            <motion.div
                              variants={formItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.6 }}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Profile Image URL</FormLabel>
                                    <FormControl>
                                      <div className="bg-[#2a2a42] border border-purple-500/30 rounded-lg p-4 hover:border-purple-500 transition-colors">
                                        <div className="flex flex-col items-center gap-4">
                                          {field.value ? (
                                            <div className="relative group">
                                              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500/30">
                                                <img
                                                  src={field.value}
                                                  alt="Preview"
                                                  className="w-full h-full object-cover"
                                                />
                                              </div>
                                            </div>
                                          ) : null}
                                          <Input 
                                            placeholder="Enter image URL" 
                                            {...field}
                                            className="bg-[#2a2a42] border-purple-500/30 focus:border-purple-500 transition-colors"
                                          />
                                        </div>
                                      </div>
                                    </FormControl>
                                    <FormMessage className="text-pink-400" />
                                  </FormItem>
                                )}
                              />
                            </motion.div>

                            <motion.div
                              variants={formItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.7 }}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="profile_link"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-purple-200">Profile Link</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter profile link" 
                                        {...field}
                                        className="bg-[#2a2a42] border-purple-500/30 focus:border-purple-500 transition-colors"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-pink-400" />
                                  </FormItem>
                                )}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (editingId ? 'กำลังอัปเดต...' : 'กำลังเพิ่ม...') : (editingId ? 'Update Testimonial' : 'Add Testimonial')}
                              </Button>
                            </motion.div>
                          </form>
                        </Form>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </Dialog>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {forms.map((form) => (
                <motion.div
                  key={form.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  layout
                >
                  <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b3d] border border-purple-500/20 shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <motion.div 
                          className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-2 border-purple-500/30 hover:border-purple-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <img
                            src={form.image}
                            alt={form.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <motion.h3 
                          className="text-xl font-semibold mb-1 text-gray-100"
                          whileHover={{ scale: 1.05 }}
                        >
                          {form.name}
                        </motion.h3>
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                          {form.position.map((pos) => (
                            <motion.div
                              key={pos}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge variant="secondary" className="bg-purple-500/10 text-purple-200 hover:bg-purple-500/20">
                                {positions.find(p => p.value === pos)?.label || pos}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <motion.p 
                          className="text-purple-200/80 text-sm mb-4"
                          style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          whileHover={{ 
                            WebkitLineClamp: 'unset',
                            height: 'auto'
                          }}
                        >
                          {form.content}
                        </motion.p>
                        <motion.a
                          href={form.profile_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 font-medium inline-block"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Profile
                        </motion.a>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(form)}
                            size="sm"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 cursor-pointer"
                          >
                            Edit
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setFormToDelete(form);
                              setDeleteDialogOpen(true);
                            }}
                            size="sm"
                            className="bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200 cursor-pointer"
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'กำลังลบ...' : 'Delete'}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AnimatePresence>
            {deleteDialogOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/40 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-transparent border-none shadow-none p-0 m-0 w-full max-w-md">
                  <motion.div
                    variants={deleteDialogVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#2d1b3d] p-6 rounded-xl shadow-2xl border border-purple-500/20 mx-4"
                  >
                    <motion.button
                      className="absolute right-4 top-4 p-1 rounded-full hover:bg-purple-500/20 text-purple-300 hover:text-purple-100 transition-colors"
                      onClick={() => {
                        setDeleteDialogOpen(false);
                        setFormToDelete(null);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>

                    <DialogHeader>
                      <motion.div
                        variants={deleteContentVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                          Confirm Delete
                        </DialogTitle>
                      </motion.div>
                    </DialogHeader>

                    <motion.div 
                      className="py-4"
                      variants={deleteContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <p className="text-gray-300">
                        Are you sure you want to delete this testimonial? This action cannot be undone.
                      </p>
                      {formToDelete && (
                        <motion.div 
                          className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              type: "spring",
                              damping: 20,
                              stiffness: 300,
                              delay: 0.2
                            }
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <motion.img
                              src={formToDelete.image}
                              alt={formToDelete.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-red-500/30"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            />
                            <div>
                              <motion.h4 
                                className="font-semibold text-gray-100"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: 1, 
                                  x: 0,
                                  transition: { delay: 0.3 }
                                }}
                              >
                                {formToDelete.name}
                              </motion.h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {formToDelete.position.map((pos, index) => (
                                  <motion.div
                                    key={pos}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ 
                                      opacity: 1, 
                                      scale: 1,
                                      transition: { delay: 0.3 + (index * 0.1) }
                                    }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="bg-red-500/10 text-red-200"
                                    >
                                      {positions.find(p => p.value === pos)?.label || pos}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div 
                      className="flex justify-end gap-3 mt-4"
                      variants={deleteContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        variants={deleteButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variant="outline"
                          onClick={() => {
                            setDeleteDialogOpen(false);
                            setFormToDelete(null);
                          }}
                          className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={deleteButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variant="destructive"
                          onClick={() => formToDelete && handleDelete(formToDelete.id)}
                          className="bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200"
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'กำลังลบ...' : 'Delete'}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </DialogContent>
              </>
            )}
          </AnimatePresence>
        </Dialog>
      </main>
    </ThemeProvider>
  );
}

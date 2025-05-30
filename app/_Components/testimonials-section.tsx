import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      content:
        "This diff checker has revolutionized our code review process. The visual clarity is unmatched, especially with the new dark mode support.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Technical Writer",
      company: "DocuFlow",
      content:
        "Finally, a diff tool that makes document comparison actually enjoyable. Love the clean interface and seamless dark mode transition.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      company: "StartupXYZ",
      content:
        "The folder comparison feature saved us hours of manual work. Incredibly powerful yet simple, and works great in both light and dark modes.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Loved by Professionals
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See what developers, writers, and teams are saying about DiffChecker
            Pro
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4 dark:border-slate-700/50">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

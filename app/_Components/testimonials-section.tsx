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
        "The GitHub comparison feature saved us hours of manual work. Incredibly powerful yet simple, and works great in both light and dark modes.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 relative">
      {/* Removed space-bg class as it's now in the parent container */}

      {/* Enhanced star field */}
      <div className="twinkling absolute inset-0 opacity-20 z-0"></div>
      <div className="cosmic-dust absolute inset-0 opacity-30 z-0"></div>

      {/* Comets */}
      <div
        className="comet absolute top-[35%] right-[15%]"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="comet absolute bottom-[40%] left-[20%]"
        style={{ animationDelay: "6s" }}
      ></div>

      {/* Enhanced nebula effect */}
      <motion.div
        className="nebula w-[50rem] h-[50rem] opacity-25 left-[-10%] top-[20%]"
        style={{
          background:
            "linear-gradient(215deg, var(--nebula3), var(--nebula1), var(--nebula2))",
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.15, 1],
          borderRadius: [
            "70% 30% 50% 50% / 30% 70% 50% 50%",
            "50% 50% 70% 30% / 50% 50% 30% 70%",
            "70% 30% 50% 50% / 30% 70% 50% 50%",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4 sci-fi-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, repeat: Infinity }}
            animate={{
              textShadow: [
                "0 0 8px rgba(98, 54, 255, 0.2)",
                "0 0 15px rgba(98, 54, 255, 0.6)",
                "0 0 8px rgba(98, 54, 255, 0.2)",
              ],
            }}
            // transition={{ duration: 3, repeat: Infinity }}
          >
            Loved by Professionals
          </motion.h2>
          <motion.p
            className="text-xl text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See what developers, writers, and teams are saying about DiffMate
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="backdrop-blur-md bg-black/40 border-none sci-fi-glow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <motion.div
                    className="flex mb-4"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1"
                      />
                    ))}
                  </motion.div>
                  <p className="text-blue-300 mb-5 italic flex-grow text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4 border-indigo-900/50">
                    <p className="font-semibold text-blue-100 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-indigo-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>
    </section>
  );
};

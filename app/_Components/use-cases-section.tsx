import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileText, GitBranch, Users } from "lucide-react";
import { motion } from "framer-motion";

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Code Reviews",
      description:
        "Perfect for reviewing code changes, pull requests, and version comparisons",
      users: "Developers",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Document Editing",
      description:
        "Track changes in documents, contracts, and collaborative writing",
      users: "Writers & Editors",
    },
    {
      icon: <GitBranch className="w-8 h-8 text-purple-600" />,
      title: "Version Control",
      description:
        "Compare different versions of files and track evolution over time",
      users: "Project Managers",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Share and discuss changes with team members efficiently",
      users: "Teams",
    },
  ];

  return (
    <section id="use-cases" className="py-24 px-6 relative">
      {/* Removed space-bg class as it's now in the parent container */}

      {/* Enhanced cosmic effects */}
      <div className="cosmic-dust absolute inset-0 z-0"></div>

      {/* Comets */}
      <div
        className="comet absolute top-[15%] right-[25%]"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="comet absolute bottom-[25%] left-[15%]"
        style={{ animationDelay: "5.5s" }}
      ></div>

      {/* Enhanced nebula effects with animation */}
      <motion.div
        className="nebula w-[50rem] h-[50rem] bottom-[5%] right-[0%]"
        style={{
          background: "linear-gradient(45deg, var(--nebula2), var(--nebula3))",
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.08, 1],
          borderRadius: [
            "60% 40% 60% 40% / 40% 60% 40% 60%",
            "40% 60% 40% 60% / 60% 40% 60% 40%",
            "60% 40% 60% 40% / 40% 60% 40% 60%",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 sci-fi-text"
            animate={{
              textShadow: [
                "0 0 8px rgba(98, 54, 255, 0.2)",
                "0 0 15px rgba(98, 54, 255, 0.6)",
                "0 0 8px rgba(98, 54, 255, 0.2)",
              ],
            }}
          >
            Perfect for Every Use Case
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto px-2 sm:px-0"
          >
            From code reviews to document editing, DiffMate adapts to your
            workflow
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full text-center backdrop-blur-md bg-black/40 border-none sci-fi-glow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <motion.div
                    className="mb-6 flex justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {React.cloneElement(useCase.icon, {
                      className: `w-12 h-12 text-indigo-400`,
                    })}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-100">
                    {useCase.title}
                  </h3>
                  <p className="text-blue-300 text-sm mb-5">
                    {useCase.description}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-900/50 text-indigo-300 border-none px-3 py-1"
                  >
                    {useCase.users}
                  </Badge>
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

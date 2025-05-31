import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Eye,
  FolderOpen,
  Palette,
  Shield,
  Zap,
  Copy,
  CheckCircle,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Text Comparison",
      description: "Compare any text content with precision and clarity",
      details:
        "Paste text directly or upload files. Get instant, accurate comparisons with line-by-line analysis.",
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "File Support",
      description: "Support for 20+ file formats including code files",
      details:
        "JavaScript, TypeScript, Python, Java, C++, HTML, CSS, JSON, Markdown, and many more.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visual Diff",
      description: "Beautiful, color-coded diff visualization",
      details:
        "Side-by-side and unified views with syntax highlighting and customizable themes for optimal readability.",
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Folder Comparison",
      description: "Compare entire directory structures",
      details:
        "Recursive folder analysis, missing file detection, and bulk file comparison.",
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Dark Mode Support",
      description: "Comfortable viewing in any lighting condition",
      details:
        "Toggle between light and dark themes with beautiful transitions and optimized color palettes.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Removed space-bg class as it's now in the parent container */}

      {/* Enhanced cosmic dust */}
      <div className="cosmic-dust absolute inset-0 z-0"></div>

      {/* Random comet effect */}
      <div className="comet absolute top-[30%] right-[20%]"></div>
      <div
        className="comet absolute bottom-[20%] left-[30%]"
        style={{ animationDelay: "4.5s" }}
      ></div>

      {/* Enhanced nebula effects with more vibrant colors */}
      <motion.div
        className="nebula w-[60rem] h-[60rem] top-[5%] left-[10%]"
        style={{
          background:
            "linear-gradient(135deg, var(--nebula1), var(--nebula2), var(--nebula3))",
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
          borderRadius: [
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "50% 60% 40% 70% / 40% 50% 60% 40%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 sci-fi-text"
            animate={{
              textShadow: [
                "0 0 8px rgba(98, 54, 255, 0.2)",
                "0 0 12px rgba(98, 54, 255, 0.6)",
                "0 0 8px rgba(98, 54, 255, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Powerful Features
          </motion.h2>
          <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto px-2 sm:px-0">
            Everything you need for professional text and file comparison
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                // transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 backdrop-blur-md bg-black/40 border-none ${
                    activeFeature === index
                      ? "sci-fi-glow border-indigo-500 shadow-lg"
                      : "hover:shadow-md hover:border-indigo-800/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  {/* Card content with enhanced styles */}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`p-3 rounded-lg ${
                          activeFeature === index
                            ? "bg-indigo-900/70 text-indigo-300"
                            : "bg-slate-800/70 text-slate-400"
                        }`}
                        animate={
                          activeFeature === index
                            ? {
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                  "0 0 0 rgba(98, 54, 255, 0)",
                                  "0 0 20px rgba(98, 54, 255, 0.5)",
                                  "0 0 0 rgba(98, 54, 255, 0)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="flex-1">
                        {/* Enhanced text styles */}
                        <h3 className="text-lg font-semibold mb-2 text-blue-100">
                          {feature.title}
                        </h3>
                        <p className="text-blue-200 mb-2">
                          {feature.description}
                        </p>
                        {activeFeature === index && (
                          <motion.p
                            className="text-sm text-indigo-300 font-medium"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            {feature.details}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 blur-3xl"></div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card className="relative border-none sci-fi-glow shadow-xl backdrop-blur-md bg-black/40">
                <CardContent className="p-0">
                  <div className="bg-black/60 px-4 py-3 border-b border-indigo-900/50">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-indigo-600 text-indigo-300"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          +15 additions
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs border-indigo-600 text-indigo-300"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          -8 deletions
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900/70">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-blue-400" />
                        <span className="font-medium text-blue-200">
                          Beautiful Visual Diff
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-blue-200">
                          Secure & Private
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-medium text-blue-200">
                          Lightning Fast
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Copy className="w-5 h-5 text-purple-400" />
                        <span className="font-medium text-blue-200">
                          Export & Share
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-indigo-400" />
                        <span className="font-medium text-blue-200">
                          Dark Mode Support
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>
    </section>
  );
};

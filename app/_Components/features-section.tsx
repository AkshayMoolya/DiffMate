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
    <section id="features" className="py-20 px-6 dark:bg-slate-900/40">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional text and file comparison
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "border-blue-500 shadow-lg dark:border-blue-400 dark:shadow-blue-900/5"
                      : "hover:shadow-md dark:hover:shadow-blue-900/5"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          activeFeature === index
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                            : "bg-muted dark:bg-muted/40"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {feature.description}
                        </p>
                        {activeFeature === index && (
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {feature.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl dark:from-blue-400/5 dark:to-purple-400/5"></div>
            <Card className="relative border-2 shadow-xl dark:border-slate-700">
              <CardContent className="p-0">
                <div className="bg-muted/70 dark:bg-muted/20 px-4 py-3 border-b dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        +15 additions
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        -8 deletions
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6 dark:bg-slate-800/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">Beautiful Visual Diff</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-medium">Lightning Fast</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Copy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-medium">Export & Share</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium">Dark Mode Support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

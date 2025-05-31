import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Play, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export const Herosection = () => {
  return (
    <section className="py-20 px-6 relative min-h-[90vh] flex items-center overflow-visible">
      {/* Star field backgrounds are now moved to the main page background */}

      {/* Comet animation */}
      <div className="comet absolute top-[20%] left-[10%]"></div>
      <div
        className="comet absolute top-[40%] left-[60%]"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Animated nebula effects */}
      <motion.div
        className="nebula w-[50rem] h-[50rem] left-[-15rem] top-[5rem]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="nebula w-[40rem] h-[40rem] right-[-10rem] bottom-[0rem]"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.2, 1],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Content container */}
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 py-1.5 px-3 shadow-sm backdrop-blur-sm bg-white/10 border-none pulse"
          >
            <Zap className="w-4 h-4 mr-2 text-purple-300" />
            Professional Diff Tool
          </Badge>
          <div className="absolute top-6 right-6 md:right-10">
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Enhanced title with better animation */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="sci-fi-text inline-block"
            animate={{
              textShadow: [
                "0 0 8px rgba(98, 54, 255, 0.2)",
                "0 0 12px rgba(98, 54, 255, 0.6)",
                "0 0 8px rgba(98, 54, 255, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Compare Text & Files
          </motion.span>
          <br />
          <span className="text-white">Like Never Before</span>
        </motion.h1>

        <motion.p
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Professional-grade text and file comparison tool with beautiful
          visualizations, advanced features, GitHub integration, and support for
          20+ file formats. Perfect for developers, writers, and teams.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 sci-fi-glow bg-indigo-600 hover:bg-indigo-700 border-none"
            asChild
          >
            <Link href="/compare">
              <Play className="w-5 h-5 mr-2" />
              Try It Now - Free
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-indigo-400 text-indigo-300 hover:bg-indigo-900/30"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </Button>
        </motion.div>

        {/* Demo Preview - Enhanced with floating animation */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 blur-3xl"></div>
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Card className="relative border-none shadow-2xl sci-fi-glow backdrop-blur-md bg-black/40">
              <CardContent className="p-0">
                {/* Card content remains the same */}
                <div className="bg-black/60 backdrop-blur-sm px-4 py-3 border-b border-indigo-900/50 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium ml-4 text-blue-200">
                    DiffMate
                  </span>
                </div>
                <div className="grid grid-cols-2 min-h-[300px] bg-slate-900/80">
                  {/* Rest of the card content remains unchanged */}
                  <div className="border-r border-indigo-900/50">
                    <div className="bg-slate-800/80 px-4 py-2 text-sm font-medium border-b border-indigo-900/50 text-blue-200">
                      Original.js
                    </div>
                    <div className="p-4 font-mono text-sm space-y-1">
                      <div className="text-blue-300">
                        1 function calculateTotal(items) {"{"}
                      </div>
                      <div className="bg-red-950/30 text-red-300 px-2 -mx-2 rounded">
                        2 let total = 0;
                      </div>
                      <div className="text-blue-300">
                        3 for (let item of items) {"{"}
                      </div>
                      <div className="bg-yellow-950/30 text-yellow-300 px-2 -mx-2 rounded">
                        4 total += item.price;
                      </div>
                      <div className="text-blue-300">5 {"}"}</div>
                      <div className="text-blue-300">6 return total;</div>
                      <div className="text-blue-300">7 {"}"}</div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-slate-800/80 px-4 py-2 text-sm font-medium border-b border-indigo-900/50 text-blue-200">
                      Modified.js
                    </div>
                    <div className="p-4 font-mono text-sm space-y-1">
                      <div className="text-blue-300">
                        1 function calculateTotal(items) {"{"}
                      </div>
                      <div className="bg-green-950/30 text-green-300 px-2 -mx-2 rounded">
                        2 let total = 0;
                      </div>
                      <div className="bg-green-950/30 text-green-300 px-2 -mx-2 rounded">
                        3 const tax = 0.08;
                      </div>
                      <div className="text-blue-300">
                        4 for (let item of items) {"{"}
                      </div>
                      <div className="bg-yellow-950/30 text-yellow-300 px-2 -mx-2 rounded">
                        5 total += item.price * (1 + tax);
                      </div>
                      <div className="text-blue-300">6 {"}"}</div>
                      <div className="text-blue-300">7 return total;</div>
                      <div className="text-blue-300">8 {"}"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Section transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>
    </section>
  );
};

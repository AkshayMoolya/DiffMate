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
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/50 dark:via-slate-900 dark:to-purple-950/50">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="mb-6 py-1.5 px-3 shadow-sm">
            <Zap className="w-4 h-4 mr-2" />
            Professional Diff Tool
          </Badge>
          <div className="absolute top-6 right-6 md:right-10">
            <ThemeToggle />
          </div>
        </div>
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Compare Text & Files
          <br />
          Like Never Before
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
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
          <Button size="lg" className="text-lg px-8 glow" asChild>
            <Link href="/compare">
              <Play className="w-5 h-5 mr-2" />
              Try It Now - Free
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </Button>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl dark:from-blue-400/10 dark:to-purple-400/10"></div>
          <Card className="relative border-2 shadow-2xl dark:border-slate-700">
            <CardContent className="p-0">
              <div className="bg-muted/70 dark:bg-slate-800 px-4 py-3 border-b dark:border-slate-700 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium ml-4">
                  DiffMate
                </span>
              </div>
              <div className="grid grid-cols-2 min-h-[300px] dark:bg-slate-900">
                <div className="border-r dark:border-slate-700">
                  <div className="bg-muted/50 dark:bg-slate-800/50 px-4 py-2 text-sm font-medium border-b dark:border-slate-700">
                    Original.js
                  </div>
                  <div className="p-4 font-mono text-sm space-y-1">
                    <div className="text-muted-foreground">
                      1 function calculateTotal(items) {"{"}
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 px-2 -mx-2 rounded">
                      2 let total = 0;
                    </div>
                    <div className="text-muted-foreground">
                      3 for (let item of items) {"{"}
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300 px-2 -mx-2 rounded">
                      4 total += item.price;
                    </div>
                    <div className="text-muted-foreground">5 {"}"}</div>
                    <div className="text-muted-foreground">6 return total;</div>
                    <div className="text-muted-foreground">7 {"}"}</div>
                  </div>
                </div>
                <div>
                  <div className="bg-muted/50 dark:bg-slate-800/50 px-4 py-2 text-sm font-medium border-b dark:border-slate-700">
                    Modified.js
                  </div>
                  <div className="p-4 font-mono text-sm space-y-1">
                    <div className="text-muted-foreground">
                      1 function calculateTotal(items) {"{"}
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 px-2 -mx-2 rounded">
                      2 let total = 0;
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 px-2 -mx-2 rounded">
                      3 const tax = 0.08;
                    </div>
                    <div className="text-muted-foreground">
                      4 for (let item of items) {"{"}
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300 px-2 -mx-2 rounded">
                      5 total += item.price * (1 + tax);
                    </div>
                    <div className="text-muted-foreground">6 {"}"}</div>
                    <div className="text-muted-foreground">7 return total;</div>
                    <div className="text-muted-foreground">8 {"}"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

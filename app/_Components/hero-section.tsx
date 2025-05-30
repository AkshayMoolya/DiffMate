import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Play, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Herosection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="secondary" className="mb-6">
          <Zap className="w-4 h-4 mr-2" />
          Professional Diff Tool
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compare Text & Files
          <br />
          Like Never Before
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Professional-grade text and file comparison tool with beautiful
          visualizations, advanced features, GitHub integration, and support for
          20+ file formats. Perfect for developers, writers, and teams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/compare">
              <Play className="w-5 h-5 mr-2" />
              Try It Now - Free
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </Button>
        </div>

        {/* Demo Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
          <Card className="relative border-2 shadow-2xl">
            <CardContent className="p-0">
              <div className="bg-muted px-4 py-3 border-b flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium ml-4">
                  DiffChecker Pro
                </span>
              </div>
              <div className="grid grid-cols-2 min-h-[300px]">
                <div className="border-r">
                  <div className="bg-muted px-4 py-2 text-sm font-medium border-b">
                    Original.js
                  </div>
                  <div className="p-4 font-mono text-sm space-y-1">
                    <div className="text-muted-foreground">
                      1 function calculateTotal(items) {"{"}
                    </div>
                    <div className="bg-red-50 text-red-800 px-2 -mx-2 rounded">
                      2 let total = 0;
                    </div>
                    <div className="text-muted-foreground">
                      3 for (let item of items) {"{"}
                    </div>
                    <div className="bg-yellow-50 text-yellow-800 px-2 -mx-2 rounded">
                      4 total += item.price;
                    </div>
                    <div className="text-muted-foreground">5 {"}"}</div>
                    <div className="text-muted-foreground">6 return total;</div>
                    <div className="text-muted-foreground">7 {"}"}</div>
                  </div>
                </div>
                <div>
                  <div className="bg-muted px-4 py-2 text-sm font-medium border-b">
                    Modified.js
                  </div>
                  <div className="p-4 font-mono text-sm space-y-1">
                    <div className="text-muted-foreground">
                      1 function calculateTotal(items) {"{"}
                    </div>
                    <div className="bg-green-50 text-green-800 px-2 -mx-2 rounded">
                      2 let total = 0;
                    </div>
                    <div className="bg-green-50 text-green-800 px-2 -mx-2 rounded">
                      3 const tax = 0.08;
                    </div>
                    <div className="text-muted-foreground">
                      4 for (let item of items) {"{"}
                    </div>
                    <div className="bg-yellow-50 text-yellow-800 px-2 -mx-2 rounded">
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
        </div>
      </div>
    </section>
  );
};

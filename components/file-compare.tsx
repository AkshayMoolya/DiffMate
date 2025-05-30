"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Eye, RotateCcw, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

interface FileCompareProps {
  onFileUpload: (file: File, side: "left" | "right") => void;
  onCompare: () => void;
  onClear: () => void;
  hasFiles: boolean;
  onSwapFiles?: () => void;
  leftFileName?: string;
  rightFileName?: string;
}

export function FileCompare({
  onFileUpload,
  onCompare,
  onClear,
  hasFiles,
  onSwapFiles,
  leftFileName,
  rightFileName,
}: FileCompareProps) {
  return (
    <Card className="shadow-lg dark:border-slate-700">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-transparent dark:from-blue-900/20 dark:via-purple-900/10 dark:to-transparent">
        <CardTitle>File Comparison</CardTitle>
        <CardDescription>
          Upload two files to compare their contents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="space-y-2">
              <Label className="text-blue-700 dark:text-blue-400">
                Original File{" "}
                {leftFileName && (
                  <span className="text-sm text-blue-500 dark:text-blue-300">
                    ({leftFileName})
                  </span>
                )}
              </Label>
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-b from-blue-50/50 to-transparent dark:border-blue-700/50 dark:hover:border-blue-600/80 dark:from-blue-900/30 dark:to-transparent">
                <Upload className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop a file here, or click to browse
                </p>
                <Input
                  type="file"
                  accept=".txt,.js,.jsx,.ts,.tsx,.css,.html,.json,.md,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFileUpload(file, "left");
                  }}
                  className="max-w-xs mx-auto border-blue-200 focus-visible:ring-blue-500 dark:border-blue-800 dark:focus-visible:ring-blue-500/50"
                />
              </div>
            </div>
          </motion.div>

          {onSwapFiles && (
            <div className="self-center flex justify-center py-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all dark:bg-slate-800 dark:hover:bg-blue-900/30 dark:border-slate-700"
                onClick={onSwapFiles}
                title="Swap files"
              >
                <ArrowLeftRight className="w-5 h-5" />
                <span className="sr-only">Swap files</span>
              </Button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1"
          >
            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-purple-400">
                Modified File{" "}
                {rightFileName && (
                  <span className="text-sm text-purple-500 dark:text-purple-300">
                    ({rightFileName})
                  </span>
                )}
              </Label>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-400 transition-colors bg-gradient-to-b from-purple-50/50 to-transparent dark:border-purple-700/50 dark:hover:border-purple-600/80 dark:from-purple-900/30 dark:to-transparent">
                <Upload className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop a file here, or click to browse
                </p>
                <Input
                  type="file"
                  accept=".txt,.js,.jsx,.ts,.tsx,.css,.html,.json,.md,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFileUpload(file, "right");
                  }}
                  className="max-w-xs mx-auto border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-500/50"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4 justify-center"
          >
            <Button
              onClick={onCompare}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600"
            >
              <Eye className="w-4 h-4" />
              Compare Files
            </Button>
            <Button
              variant="outline"
              onClick={onClear}
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-800 dark:hover:bg-blue-900/30"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Github, Search, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FolderTree } from "./folder-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FolderItem, FolderComparison } from "@/types/diff";

interface GithubCompareProps {
  onCompare: (url: string) => void;
  onClear: () => void;
  isLoading: boolean;
  error?: string | null;
  fileTree?: FolderItem | null;
  folderComparison?: FolderComparison | null;
  selectedFile?: string | null;
  onFileSelect?: (filePath: string) => void;
  commitInfo?: any;
}

export function GithubCompare({
  onCompare,
  onClear,
  isLoading,
  error,
  fileTree,
  folderComparison,
  selectedFile,
  onFileSelect,
  commitInfo,
}: GithubCompareProps) {
  const [commitUrl, setCommitUrl] = useState("");

  const handleCompare = () => {
    if (commitUrl) {
      onCompare(commitUrl);
    }
  };

  return (
    <Card className="shadow-lg border dark:border-slate-800">
      <CardHeader className="bg-gradient-to-r from-blue-50/80 via-purple-50/50 to-transparent dark:from-blue-950/30 dark:via-purple-950/20 dark:to-transparent">
        <CardTitle>GitHub Commit Comparison</CardTitle>
        <CardDescription>
          Paste a GitHub commit URL to view changes and compare files in the
          <span className="font-semibold"> file tree</span>. You can also
          <span className="font-semibold"> select files</span> to see detailed
          changes. This tool supports both{" "}
          <span className="font-semibold">text</span> and{" "}
          <span className="font-semibold">file comparisons</span> for any GitHub
          commit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Github className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <Input
                value={commitUrl}
                onChange={(e) => setCommitUrl(e.target.value)}
                placeholder="https://github.com/username/repo/commit/hash"
                className="pl-10 pr-24 py-6 text-base focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 dark:border-slate-700"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Button
                  onClick={handleCompare}
                  disabled={!commitUrl || isLoading}
                  className="h-8"
                >
                  {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Loading..." : "Compare"}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground truncate max-w-full">
              Example: https://github.com/facebook/react/commit/abcdef123456
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            variant="outline"
            onClick={onClear}
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-300"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
        </motion.div>

        {/* File tree visualization for GitHub commit */}
        {fileTree && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6"
          >
            <Card className="shadow-sm border dark:border-slate-800">
              <CardHeader className="py-3 bg-muted/50 dark:bg-muted/20">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Github className="w-4 h-4 flex-shrink-0" />
                  {commitInfo && (
                    <span className="wrap-break-word block">
                      {commitInfo.commitMessage}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                  <div className="p-3">
                    <FolderTree
                      folder={fileTree}
                      folderComparison={folderComparison}
                      selectedFile={selectedFile}
                      onFileSelect={onFileSelect}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

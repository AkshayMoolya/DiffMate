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

interface GithubCompareProps {
  onCompare: (url: string) => void;
  onClear: () => void;
  isLoading: boolean;
  error?: string | null;
}

export function GithubCompare({
  onCompare,
  onClear,
  isLoading,
  error,
}: GithubCompareProps) {
  const [commitUrl, setCommitUrl] = useState("");

  const handleCompare = () => {
    if (commitUrl) {
      onCompare(commitUrl);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-transparent">
        <CardTitle>GitHub Commit Comparison</CardTitle>
        <CardDescription>
          Paste a GitHub commit URL to view changes compared to its parent
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
                <Github className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                value={commitUrl}
                onChange={(e) => setCommitUrl(e.target.value)}
                placeholder="https://github.com/username/repo/commit/hash"
                className="pl-10 pr-20 py-6 text-base focus-visible:ring-blue-500"
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
            <p className="text-sm text-muted-foreground">
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
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, RotateCcw, Copy, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ComparisonControlsProps {
  onCompare: () => void;
  onClear: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  viewMode: "side-by-side" | "unified";
  onViewModeChange: (mode: "side-by-side" | "unified") => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (show: boolean) => void;
  ignoreWhitespace: boolean;
  onIgnoreWhitespaceChange: (ignore: boolean) => void;
  showExportButtons?: boolean;
}

export function ComparisonControls({
  onCompare,
  onClear,
  onCopy,
  onDownload,
  viewMode,
  onViewModeChange,
  showLineNumbers,
  onShowLineNumbersChange,
  ignoreWhitespace,
  onIgnoreWhitespaceChange,
  showExportButtons = false,
}: ComparisonControlsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={onCompare}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
          >
            <Eye className="w-4 h-4" />
            Compare
          </Button>

          <Button
            variant="outline"
            onClick={onClear}
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </Button>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Label htmlFor="view-mode" className="text-muted-foreground">
              View:
            </Label>
            <select
              id="view-mode"
              value={viewMode}
              onChange={(e) =>
                onViewModeChange(e.target.value as "side-by-side" | "unified")
              }
              className="px-3 py-1 border rounded-md text-sm bg-white hover:border-blue-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
            >
              <option value="side-by-side">Side by Side</option>
              <option value="unified">Unified</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="line-numbers"
              checked={showLineNumbers}
              onChange={(e) => onShowLineNumbersChange(e.target.checked)}
              className="rounded border-blue-300 text-blue-600 focus:ring-blue-600 w-4 h-4"
            />
            <Label
              htmlFor="line-numbers"
              className="text-muted-foreground cursor-pointer"
            >
              Line Numbers
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ignore-whitespace"
              checked={ignoreWhitespace}
              onChange={(e) => onIgnoreWhitespaceChange(e.target.checked)}
              className="rounded border-blue-300 text-blue-600 focus:ring-blue-600 w-4 h-4"
            />
            <Label
              htmlFor="ignore-whitespace"
              className="text-muted-foreground cursor-pointer"
            >
              Ignore Whitespace
            </Label>
          </div>

          {showExportButtons && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 ml-auto"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy Diff"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

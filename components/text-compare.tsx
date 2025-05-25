"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

interface TextCompareProps {
  leftText: string;
  rightText: string;
  leftFileName: string;
  rightFileName: string;
  onLeftTextChange: (text: string) => void;
  onRightTextChange: (text: string) => void;
  onLeftFileNameChange: (name: string) => void;
  onRightFileNameChange: (name: string) => void;
  onSwapContents?: () => void;
}

export function TextCompare({
  leftText,
  rightText,
  leftFileName,
  rightFileName,
  onLeftTextChange,
  onRightTextChange,
  onLeftFileNameChange,
  onRightFileNameChange,
  onSwapContents,
}: TextCompareProps) {
  return (
    <div className="relative flex flex-col lg:flex-row gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-2">
            <CardTitle className="flex items-center gap-2">
              <Input
                value={leftFileName}
                onChange={(e) => onLeftFileNameChange(e.target.value)}
                className="font-semibold border-none p-0 h-auto bg-transparent text-blue-700"
                placeholder="Original"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={leftText}
              onChange={(e) => onLeftTextChange(e.target.value)}
              placeholder="Paste your original text here..."
              className="min-h-[300px] font-mono text-sm resize-none focus-visible:ring-blue-500"
            />
          </CardContent>
        </Card>
      </motion.div>

      {onSwapContents && (
        <div className="self-center flex justify-center py-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all"
            onClick={onSwapContents}
            title="Swap content"
          >
            <ArrowLeftRight className="w-5 h-5" />
            <span className="sr-only">Swap content</span>
          </Button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1"
      >
        <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent pb-2">
            <CardTitle className="flex items-center gap-2">
              <Input
                value={rightFileName}
                onChange={(e) => onRightFileNameChange(e.target.value)}
                className="font-semibold border-none p-0 h-auto bg-transparent text-purple-700"
                placeholder="Modified"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={rightText}
              onChange={(e) => onRightTextChange(e.target.value)}
              placeholder="Paste your modified text here..."
              className="min-h-[300px] font-mono text-sm resize-none focus-visible:ring-purple-500"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

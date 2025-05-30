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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderOpen, Eye, RotateCcw, ArrowLeftRight } from "lucide-react";
import type { FolderItem, FolderComparison } from "@/types/diff";
import { FolderTree } from "./folder-tree";
import { motion } from "framer-motion";

interface FolderCompareProps {
  leftFolder: FolderItem | null;
  rightFolder: FolderItem | null;
  folderComparison: FolderComparison | null;
  selectedFile: string | null;
  onFolderUpload: (files: FileList, side: "left" | "right") => void;
  onCompare: () => void;
  onClear: () => void;
  onFileSelect: (filePath: string) => void;
  onSwapFolders?: () => void;
}

export function FolderCompare({
  leftFolder,
  rightFolder,
  folderComparison,
  selectedFile,
  onFolderUpload,
  onCompare,
  onClear,
  onFileSelect,
  onSwapFolders,
}: FolderCompareProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg overflow-hidden dark:border-slate-700">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-transparent dark:from-blue-900/20 dark:via-purple-900/10 dark:to-transparent">
          <CardTitle>Folder Comparison</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Upload two folders to compare their structure and contents
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
                  Original Folder
                </Label>
                <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors rounded-lg p-8 text-center bg-gradient-to-b from-blue-50/50 to-transparent dark:border-blue-700/50 dark:hover:border-blue-600/80 dark:from-blue-900/30 dark:to-transparent">
                  <FolderOpen className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Select a folder to upload
                  </p>
                  <Input
                    type="file"
                    webkitdirectory=""
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        onFolderUpload(files, "left");
                      }
                    }}
                    className="max-w-xs mx-auto border-blue-200 focus-visible:ring-blue-500 dark:border-blue-800 dark:focus-visible:ring-blue-500/50"
                  />
                  {leftFolder && (
                    <p className="text-sm text-green-600 mt-2 font-medium dark:text-green-400">
                      ✓ Folder uploaded ({leftFolder.children.length} items)
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {onSwapFolders && leftFolder && rightFolder && (
              <div className="self-center flex justify-center py-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all dark:bg-slate-800 dark:hover:bg-blue-900/30 dark:border-slate-700"
                  onClick={onSwapFolders}
                  title="Swap folders"
                >
                  <ArrowLeftRight className="w-5 h-5" />
                  <span className="sr-only">Swap folders</span>
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
                  Modified Folder
                </Label>
                <div className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors rounded-lg p-8 text-center bg-gradient-to-b from-purple-50/50 to-transparent dark:border-purple-700/50 dark:hover:border-purple-600/80 dark:from-purple-900/30 dark:to-transparent">
                  <FolderOpen className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Select a folder to upload
                  </p>
                  <Input
                    type="file"
                    webkitdirectory=""
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        onFolderUpload(files, "right");
                      }
                    }}
                    className="max-w-xs mx-auto border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-500/50"
                  />
                  {rightFolder && (
                    <p className="text-sm text-green-600 mt-2 font-medium dark:text-green-400">
                      ✓ Folder uploaded ({rightFolder.children.length} items)
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {leftFolder && rightFolder && (
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
                Compare Folders
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

      {/* Folder Comparison Results */}
      {folderComparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-1 shadow-lg dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
              <CardTitle>Folder Structure</CardTitle>
              <CardDescription className="dark:text-slate-400">
                Click on files to view differences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {leftFolder && (
                  <FolderTree
                    folder={leftFolder}
                    folderComparison={folderComparison}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                  />
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 shadow-lg dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent">
              <CardTitle>Comparison Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-100 dark:bg-green-950/30 dark:border-green-900/50">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {folderComparison.addedFiles.length}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-400">
                    Added Files
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50 border border-red-100 dark:bg-red-950/30 dark:border-red-900/50">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {folderComparison.removedFiles.length}
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-400">
                    Removed Files
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {folderComparison.modifiedFiles.length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">
                    Modified Files
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100 dark:bg-slate-800/50 dark:border-slate-700">
                  <div className="text-2xl font-bold text-gray-600 dark:text-slate-300">
                    {folderComparison.unchangedFiles.length}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-slate-400">
                    Unchanged Files
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {folderComparison.addedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2 dark:text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Added Files
                    </h4>
                    <div className="space-y-1">
                      {folderComparison.addedFiles.map((file) => (
                        <div
                          key={file}
                          className="text-sm bg-green-50 p-2 rounded border border-green-100 hover:bg-green-100 transition-colors dark:bg-green-950/30 dark:border-green-900/50 dark:hover:bg-green-900/40"
                        >
                          + {file}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {folderComparison.removedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2 dark:text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Removed Files
                    </h4>
                    <div className="space-y-1">
                      {folderComparison.removedFiles.map((file) => (
                        <div
                          key={file}
                          className="text-sm bg-red-50 p-2 rounded border border-red-100 hover:bg-red-100 transition-colors dark:bg-red-950/30 dark:border-red-900/50 dark:hover:bg-red-900/40"
                        >
                          - {file}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {folderComparison.modifiedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2 dark:text-blue-400">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Modified Files
                    </h4>
                    <div className="space-y-1">
                      {folderComparison.modifiedFiles.map((file) => (
                        <button
                          key={file}
                          onClick={() => onFileSelect(file)}
                          className="text-sm bg-blue-50 p-2 rounded w-full text-left hover:bg-blue-100 border border-blue-100 transition-colors dark:bg-blue-950/30 dark:border-blue-900/50 dark:hover:bg-blue-900/40"
                        >
                          ~ {file}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

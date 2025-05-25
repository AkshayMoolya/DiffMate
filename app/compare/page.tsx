"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, FolderOpen, Home, Sparkles } from "lucide-react";
import Link from "next/link";

import type {
  DiffLine,
  DiffStats,
  FolderItem,
  FolderComparison,
} from "@/types/diff";
import { calculateTextDiff } from "@/utils/diff-calculator";
import { TextCompare } from "@/components/text-compare";
import { FileCompare } from "@/components/file-compare";
import { FolderCompare } from "@/components/folder-compare";
import { ComparisonControls } from "@/components/comparison-controls";
import { DiffStatsComponent } from "@/components/diff-stats";
import { DiffViewer } from "@/components/diff-viewer";
import { motion } from "framer-motion";

export default function ComparePage() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [leftFileName, setLeftFileName] = useState("Original");
  const [rightFileName, setRightFileName] = useState("Modified");
  const [diffLines, setDiffLines] = useState<DiffLine[]>([]);
  const [hasFiles, setHasFiles] = useState(false);
  const [diffStats, setDiffStats] = useState<DiffStats>({
    additions: 0,
    deletions: 0,
    modifications: 0,
    unchanged: 0,
  });
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">(
    "side-by-side"
  );
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  // Folder comparison state
  const [leftFolder, setLeftFolder] = useState<FolderItem | null>(null);
  const [rightFolder, setRightFolder] = useState<FolderItem | null>(null);
  const [folderComparison, setFolderComparison] =
    useState<FolderComparison | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const diffResultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    setTimeout(() => {
      diffResultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleCompare = () => {
    const { diffLines: newDiffLines, stats } = calculateTextDiff(
      leftText,
      rightText,
      ignoreWhitespace
    );
    setDiffLines(newDiffLines);
    setDiffStats(stats);
    scrollToResults();
  };

  const handleFileUpload = (file: File, side: "left" | "right") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (side === "left") {
        setLeftText(content);
        setLeftFileName(file.name);
      } else {
        setRightText(content);
        setRightFileName(file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleFolderUpload = async (
    files: FileList,
    side: "left" | "right"
  ) => {
    const folderStructure: FolderItem = {
      name: "root",
      path: "",
      type: "folder",
      children: [],
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });

      // Build folder structure
      const pathParts = file.webkitRelativePath.split("/");
      let currentFolder = folderStructure;

      for (let j = 0; j < pathParts.length - 1; j++) {
        const folderName = pathParts[j];
        let existingFolder = currentFolder.children.find(
          (child) => child.type === "folder" && child.name === folderName
        ) as FolderItem;

        if (!existingFolder) {
          existingFolder = {
            name: folderName,
            path: pathParts.slice(0, j + 1).join("/"),
            type: "folder",
            children: [],
          };
          currentFolder.children.push(existingFolder);
        }
        currentFolder = existingFolder;
      }

      // Add file
      currentFolder.children.push({
        name: pathParts[pathParts.length - 1],
        path: file.webkitRelativePath,
        content,
        type: "file",
      });
    }

    if (side === "left") {
      setLeftFolder(folderStructure);
    } else {
      setRightFolder(folderStructure);
    }
  };

  const handleFolderCompare = () => {
    if (!leftFolder || !rightFolder) return;

    const leftFiles = new Map<string, string>();
    const rightFiles = new Map<string, string>();

    const extractFiles = (folder: FolderItem, fileMap: Map<string, string>) => {
      folder.children.forEach((child) => {
        if (child.type === "file") {
          fileMap.set(child.path, child.content);
        } else {
          extractFiles(child, fileMap);
        }
      });
    };

    extractFiles(leftFolder, leftFiles);
    extractFiles(rightFolder, rightFiles);

    const allPaths = new Set([...leftFiles.keys(), ...rightFiles.keys()]);
    const addedFiles: string[] = [];
    const removedFiles: string[] = [];
    const modifiedFiles: string[] = [];
    const unchangedFiles: string[] = [];

    allPaths.forEach((path) => {
      const leftContent = leftFiles.get(path);
      const rightContent = rightFiles.get(path);

      if (!leftContent && rightContent) {
        addedFiles.push(path);
      } else if (leftContent && !rightContent) {
        removedFiles.push(path);
      } else if (leftContent !== rightContent) {
        modifiedFiles.push(path);
      } else {
        unchangedFiles.push(path);
      }
    });

    setFolderComparison({
      leftFiles,
      rightFiles,
      addedFiles,
      removedFiles,
      modifiedFiles,
      unchangedFiles,
    });

    scrollToResults();
  };

  const handleFileSelect = (filePath: string) => {
    if (!folderComparison) return;

    const leftContent = folderComparison.leftFiles.get(filePath) || "";
    const rightContent = folderComparison.rightFiles.get(filePath) || "";

    setLeftText(leftContent);
    setRightText(rightContent);
    setLeftFileName(filePath);
    setRightFileName(filePath);
    setSelectedFile(filePath);

    const { diffLines: newDiffLines, stats } = calculateTextDiff(
      leftContent,
      rightContent,
      ignoreWhitespace
    );
    setDiffLines(newDiffLines);
    setDiffStats(stats);
  };

  const handleClearAll = () => {
    setLeftText("");
    setRightText("");
    setLeftFileName("Original");
    setRightFileName("Modified");
    setDiffLines([]);
    setDiffStats({
      additions: 0,
      deletions: 0,
      modifications: 0,
      unchanged: 0,
    });
    setLeftFolder(null);
    setRightFolder(null);
    setFolderComparison(null);
    setSelectedFile(null);
  };

  const handleSwapContents = () => {
    const tempText = leftText;
    const tempFileName = leftFileName;

    setLeftText(rightText);
    setRightText(tempText);
    setLeftFileName(rightFileName);
    setRightFileName(tempFileName);

    // If there are diff results, recalculate them
    if (diffLines.length > 0) {
      handleCompare();
    }
  };

  const handleSwapFolders = () => {
    const tempFolder = leftFolder;
    setLeftFolder(rightFolder);
    setRightFolder(tempFolder);

    // Reset the comparison
    setFolderComparison(null);
    setSelectedFile(null);
  };

  const handleCopyDiff = () => {
    const diffText = diffLines
      .map((line) => {
        const prefix =
          line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  ";
        return prefix + line.content;
      })
      .join("\n");
    navigator.clipboard.writeText(diffText);
  };

  const handleDownloadDiff = () => {
    const diffText = diffLines
      .map((line) => {
        const prefix =
          line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  ";
        return prefix + line.content;
      })
      .join("\n");

    const blob = new Blob([diffText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diff-${leftFileName}-${rightFileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Reset diff results when text changes
    if (leftText && rightText) {
      setHasFiles(true);
    }
  }, [leftText, rightText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                DiffChecker Pro
              </span>
            </div>
            <Button variant="outline" asChild className="group">
              <Link href="/" className="flex items-center gap-2 transition-all">
                <Home className="w-4 h-4 group-hover:text-blue-600" />
                <span className="group-hover:text-blue-600">Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4 mr-1" />
            Professional Diff Tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Text Diff Checker
          </h1>
          <p className="text-muted-foreground text-lg">
            Compare text, files, and folders with professional-grade diff
            visualization
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid max-w-2xl mx-auto grid-cols-3 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger
                value="text"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <FileText className="w-4 h-4" />
                Text Compare
              </TabsTrigger>
              <TabsTrigger
                value="file"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <Upload className="w-4 h-4" />
                File Compare
              </TabsTrigger>
              <TabsTrigger
                value="folder"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <FolderOpen className="w-4 h-4" />
                Folder Compare
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="text" className="space-y-6">
                <TextCompare
                  leftText={leftText}
                  rightText={rightText}
                  leftFileName={leftFileName}
                  rightFileName={rightFileName}
                  onLeftTextChange={setLeftText}
                  onRightTextChange={setRightText}
                  onLeftFileNameChange={setLeftFileName}
                  onRightFileNameChange={setRightFileName}
                  onSwapContents={handleSwapContents}
                />

                <ComparisonControls
                  onCompare={handleCompare}
                  onClear={handleClearAll}
                  onCopy={handleCopyDiff}
                  onDownload={handleDownloadDiff}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  showLineNumbers={showLineNumbers}
                  onShowLineNumbersChange={setShowLineNumbers}
                  ignoreWhitespace={ignoreWhitespace}
                  onIgnoreWhitespaceChange={setIgnoreWhitespace}
                  showExportButtons={diffLines.length > 0}
                />
              </TabsContent>

              <TabsContent value="file" className="space-y-6">
                <FileCompare
                  onFileUpload={handleFileUpload}
                  onCompare={handleCompare}
                  onClear={handleClearAll}
                  hasFiles={hasFiles}
                  onSwapFiles={handleSwapContents}
                  leftFileName={leftFileName}
                  rightFileName={rightFileName}
                />
              </TabsContent>

              <TabsContent value="folder" className="space-y-6">
                <FolderCompare
                  leftFolder={leftFolder}
                  rightFolder={rightFolder}
                  folderComparison={folderComparison}
                  selectedFile={selectedFile}
                  onFolderUpload={handleFolderUpload}
                  onCompare={handleFolderCompare}
                  onClear={handleClearAll}
                  onFileSelect={handleFileSelect}
                  onSwapFolders={handleSwapFolders}
                />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Results Section */}
        <div ref={diffResultsRef}>
          {diffLines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 mt-10 pt-10 border-t"
            >
              <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Comparison Results
              </h2>
              <DiffStatsComponent stats={diffStats} />
              <div className="bg-white rounded-lg shadow-xl border overflow-hidden">
                <DiffViewer
                  diffLines={diffLines}
                  leftFileName={leftFileName}
                  rightFileName={rightFileName}
                  viewMode={viewMode}
                  showLineNumbers={showLineNumbers}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

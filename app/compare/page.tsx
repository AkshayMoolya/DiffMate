"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Home, Sparkles, Github } from "lucide-react";
import Link from "next/link";

import type {
  DiffLine,
  DiffStats,
  FolderItem,
  FolderComparison,
} from "@/types/diff";
import { calculateTextDiff } from "@/utils/diff-calculator";
import { getCommitComparison } from "@/utils/github-api";
import { TextCompare } from "@/components/text-compare";
import { FileCompare } from "@/components/file-compare";
import { GithubCompare } from "@/components/github-compare";
import { ComparisonControls } from "@/components/comparison-controls";
import { DiffStatsComponent } from "@/components/diff-stats";
import { DiffViewer } from "@/components/diff-viewer";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  // GitHub comparison state
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubCommitInfo, setGithubCommitInfo] = useState<any>(null);
  const [selectedGithubFile, setSelectedGithubFile] = useState<string | null>(
    null
  );
  const [githubFileTree, setGithubFileTree] = useState<FolderItem | null>(null);
  const [githubFolderComparison, setGithubFolderComparison] =
    useState<FolderComparison | null>(null);

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

  const handleGithubCompare = async (commitUrl: string) => {
    setIsGithubLoading(true);
    setGithubError(null);

    try {
      const commitData = await getCommitComparison(commitUrl);
      setGithubCommitInfo(commitData);

      // Create a folder structure from the file paths
      const rootFolder: FolderItem = {
        name: "root",
        path: "",
        type: "folder",
        children: [],
      };

      // Process files to build a tree
      if (commitData.files && commitData.files.length > 0) {
        // Create folder comparison data
        const addedFiles: string[] = [];
        const removedFiles: string[] = [];
        const modifiedFiles: string[] = [];
        const unchangedFiles: string[] = [];
        const leftFiles = new Map<string, string>();
        const rightFiles = new Map<string, string>();

        // Process files and categorize them
        commitData.files.forEach((file: any) => {
          // Add to appropriate category
          if (file.status === "added") {
            addedFiles.push(file.filename);
          } else if (file.status === "removed") {
            removedFiles.push(file.filename);
          } else if (file.status === "modified") {
            modifiedFiles.push(file.filename);
          } else {
            unchangedFiles.push(file.filename);
          }

          // Store file contents
          leftFiles.set(file.filename, file.leftContent || "");
          rightFiles.set(file.filename, file.rightContent || "");

          // Build folder tree
          const pathParts = file.filename.split("/");
          let currentFolder = rootFolder;

          // Create folder structure
          for (let i = 0; i < pathParts.length - 1; i++) {
            const folderName = pathParts[i];
            let existingFolder = currentFolder.children.find(
              (child) => child.type === "folder" && child.name === folderName
            ) as FolderItem;

            if (!existingFolder) {
              existingFolder = {
                name: folderName,
                path: pathParts.slice(0, i + 1).join("/"),
                type: "folder",
                children: [],
              };
              currentFolder.children.push(existingFolder);
            }
            currentFolder = existingFolder;
          }

          // Add file to current folder
          currentFolder.children.push({
            name: pathParts[pathParts.length - 1],
            path: file.filename,
            content: file.rightContent || "",
            type: "file",
          });
        });

        // Save folder comparison data
        setGithubFolderComparison({
          leftFiles,
          rightFiles,
          addedFiles,
          removedFiles,
          modifiedFiles,
          unchangedFiles,
        });

        setGithubFileTree(rootFolder);

        // Select first file by default
        const firstFile = commitData.files[0];
        setSelectedGithubFile(firstFile.filename);

        // Set texts for diff view
        setLeftText(firstFile.leftContent);
        setRightText(firstFile.rightContent);
        setLeftFileName(`${firstFile.filename} (Parent)`);
        setRightFileName(`${firstFile.filename} (Current)`);

        // Calculate diff
        const { diffLines: newDiffLines, stats } = calculateTextDiff(
          firstFile.leftContent,
          firstFile.rightContent,
          ignoreWhitespace
        );
        setDiffLines(newDiffLines);
        setDiffStats(stats);
        scrollToResults();
      }
    } catch (error) {
      console.error("GitHub comparison error:", error);
      setGithubError(
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub commit data"
      );
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleSelectGithubFile = (filename: string) => {
    if (!githubCommitInfo) return;

    const fileData = githubCommitInfo.files.find(
      (f: any) => f.filename === filename
    );
    if (fileData) {
      setSelectedGithubFile(filename);

      // Set texts for diff view
      setLeftText(fileData.leftContent);
      setRightText(fileData.rightContent);
      setLeftFileName(`${filename} (Parent)`);
      setRightFileName(`${filename} (Current)`);

      // Calculate diff
      const { diffLines: newDiffLines, stats } = calculateTextDiff(
        fileData.leftContent,
        fileData.rightContent,
        ignoreWhitespace
      );
      setDiffLines(newDiffLines);
      setDiffStats(stats);
      scrollToResults();
    }
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
    setGithubFileTree(null);
    setGithubFolderComparison(null);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-purple-950/30">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                DiffMate
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle className="bg-background text-foreground border border-input" />
              <Button variant="outline" asChild className="group">
                <Link
                  href="/"
                  className="flex items-center gap-2 transition-all"
                >
                  <Home className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden sm:inline">
                    Back to Home
                  </span>
                </Link>
              </Button>
            </div>
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
          <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-2 dark:bg-blue-900 dark:text-blue-300">
            <Sparkles className="w-4 h-4 mr-1" />
            Professional Diff Tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Text Diff Checker
          </h1>
          <p className="text-muted-foreground text-lg">
            Compare text, files, and GitHub commits with professional-grade diff
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
            <TabsList className="grid max-w-2xl mx-auto grid-cols-3 bg-muted/50 p-1 rounded-xl dark:bg-muted/20">
              <TabsTrigger
                value="text"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow dark:data-[state=active]:bg-slate-800"
              >
                <FileText className="w-4 h-4" />
                Text
              </TabsTrigger>
              <TabsTrigger
                value="file"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow dark:data-[state=active]:bg-slate-800"
              >
                <Upload className="w-4 h-4" />
                File
              </TabsTrigger>
              <TabsTrigger
                value="github"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow dark:data-[state=active]:bg-slate-800"
              >
                <Github className="w-4 h-4" />
                GitHub
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

              <TabsContent value="github" className="space-y-6">
                <GithubCompare
                  onCompare={handleGithubCompare}
                  onClear={handleClearAll}
                  isLoading={isGithubLoading}
                  error={githubError}
                  fileTree={githubFileTree}
                  folderComparison={githubFolderComparison}
                  selectedFile={selectedGithubFile}
                  onFileSelect={handleSelectGithubFile}
                  commitInfo={githubCommitInfo}
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
              className="space-y-6 mt-10 pt-10 border-t dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Comparison Results
              </h2>
              <DiffStatsComponent stats={diffStats} />
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border dark:border-slate-800 overflow-hidden">
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

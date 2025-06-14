import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DiffLine } from "@/types/diff";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DiffViewerProps {
  diffLines: DiffLine[];
  leftFileName: string;
  rightFileName: string;
  viewMode: "side-by-side" | "unified";
  showLineNumbers: boolean;
}

export function DiffViewer({
  diffLines,
  leftFileName,
  rightFileName,
  viewMode: requestedViewMode,
  showLineNumbers,
}: DiffViewerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState(requestedViewMode);

  // Detect screen size changes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Override viewMode on mobile screens (stacked instead of unified)
  useEffect(() => {
    // Use the requested view mode on desktop
    if (!isMobile) {
      setViewMode(requestedViewMode);
    } else {
      // On mobile, always use the requested view mode, but render differently
      setViewMode(requestedViewMode);
    }
  }, [isMobile, requestedViewMode]);

  const renderInlineChanges = (
    changes: Array<{ type: "added" | "removed" | "unchanged"; text: string }>
  ) => {
    return changes.map((change, index) => (
      <span
        key={index}
        className={cn(
          change.type === "added" &&
            "bg-[#CCFFD8] text-[#0A3C20] dark:bg-[#155C2F] dark:text-[#DCFFE6]",
          change.type === "removed" &&
            "bg-[#FFCCD2] text-[#5C0011] line-through dark:bg-[#6E1420] dark:text-[#FFD9DD]",
          change.type === "unchanged" && "dark:text-slate-200"
        )}
      >
        {change.text}
      </span>
    ));
  };

  if (diffLines.length === 0) {
    return null;
  }

  return (
    <Card className="dark:border-slate-700">
      <CardHeader className="dark:bg-slate-800/50">
        <CardTitle>Diff Results</CardTitle>
        <CardDescription className="dark:text-slate-400">
          {viewMode === "side-by-side"
            ? isMobile
              ? "Original above, modified below"
              : "Side-by-side comparison"
            : "Unified diff view"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isMobile && viewMode === "side-by-side" && (
          <Alert
            variant="default"
            className="mb-4 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900"
          >
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-600 dark:text-blue-400">
              Using stacked view for better experience on small screens
            </AlertDescription>
          </Alert>
        )}
        <div className="border rounded-lg overflow-hidden dark:border-slate-700">
          {viewMode === "side-by-side" && !isMobile ? (
            <div className="grid grid-cols-2">
              {/* Left side */}
              <div className="border-r dark:border-slate-700">
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  {leftFileName}
                </div>
                <div className="font-mono text-sm dark:bg-slate-900/80">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex border-b last:border-b-0 dark:border-slate-800",
                        line.type === "removed" &&
                          "bg-[#FFECEE] border-[#FFD0D6] dark:bg-[#3D0A14] dark:border-[#6E1420]",
                        line.type === "modified" &&
                          "bg-[#E6F4FF] border-[#C8E3FF] dark:bg-[#0A2A4D] dark:border-[#194076]",
                        line.type === "unchanged" &&
                          "bg-white dark:bg-transparent"
                      )}
                    >
                      {showLineNumbers && (
                        <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                          {line.leftLineNumber || ""}
                        </div>
                      )}
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all dark:text-slate-200">
                        {line.type === "modified" && line.inlineChanges
                          ? renderInlineChanges(
                              line.inlineChanges.filter(
                                (change) => change.type !== "added"
                              )
                            )
                          : line.leftContent || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side */}
              <div>
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  {rightFileName}
                </div>
                <div className="font-mono text-sm dark:bg-slate-900/80">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex border-b last:border-b-0 dark:border-slate-800",
                        line.type === "added" &&
                          "bg-[#EAFFF1] border-[#C4F2D5] dark:bg-[#0C3A1D] dark:border-[#155C2F]",
                        line.type === "modified" &&
                          "bg-[#E6F4FF] border-[#C8E3FF] dark:bg-[#0A2A4D] dark:border-[#194076]",
                        line.type === "unchanged" &&
                          "bg-white dark:bg-transparent"
                      )}
                    >
                      {showLineNumbers && (
                        <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                          {line.rightLineNumber || ""}
                        </div>
                      )}
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all dark:text-slate-200">
                        {line.type === "modified" && line.inlineChanges
                          ? renderInlineChanges(
                              line.inlineChanges.filter(
                                (change) => change.type !== "removed"
                              )
                            )
                          : line.rightContent || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : viewMode === "unified" || !isMobile ? (
            /* Unified view */
            <div className="font-mono text-sm dark:bg-slate-900/80">
              <div className="bg-muted px-4 py-2 font-semibold text-sm border-b dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                {leftFileName} → {rightFileName}
              </div>
              {diffLines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex border-b last:border-b-0 dark:border-slate-800",
                    line.type === "added" &&
                      "bg-[#EAFFF1] border-[#C4F2D5] dark:bg-[#0C3A1D] dark:border-[#155C2F]",
                    line.type === "removed" &&
                      "bg-[#FFECEE] border-[#FFD0D6] dark:bg-[#3D0A14] dark:border-[#6E1420]",
                    line.type === "modified" &&
                      "bg-[#E6F4FF] border-[#C8E3FF] dark:bg-[#0A2A4D] dark:border-[#194076]",
                    line.type === "unchanged" && "bg-white dark:bg-transparent"
                  )}
                >
                  {showLineNumbers && (
                    <div className="w-16 px-2 py-1 text-xs text-muted-foreground bg-muted border-r dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                      {line.leftLineNumber || ""} {line.rightLineNumber || ""}
                    </div>
                  )}
                  <div className="w-6 px-1 py-1 text-center text-xs border-r dark:border-slate-700 dark:text-slate-200">
                    {line.type === "added" && "+"}
                    {line.type === "removed" && "-"}
                    {line.type === "modified" && "~"}
                    {line.type === "unchanged" && " "}
                  </div>
                  <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all dark:text-slate-200">
                    {line.type === "modified" && line.inlineChanges
                      ? renderInlineChanges(line.inlineChanges)
                      : line.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Stacked view for mobile */
            <div className="flex flex-col font-mono text-sm dark:bg-slate-900/80">
              {/* Original (top) */}
              <div>
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  {leftFileName}
                </div>
                <div className="border-b dark:border-slate-700">
                  {diffLines.map(
                    (line, index) =>
                      (line.type === "removed" ||
                        line.type === "unchanged" ||
                        line.type === "modified") && (
                        <div
                          key={`left-${index}`}
                          className={cn(
                            "flex border-b last:border-b-0 dark:border-slate-800",
                            line.type === "removed" &&
                              "bg-[#FFECEE] border-[#FFD0D6] dark:bg-[#3D0A14] dark:border-[#6E1420]",
                            line.type === "modified" &&
                              "bg-[#E6F4FF] border-[#C8E3FF] dark:bg-[#0A2A4D] dark:border-[#194076]",
                            line.type === "unchanged" &&
                              "bg-white dark:bg-transparent"
                          )}
                        >
                          {showLineNumbers && (
                            <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                              {line.leftLineNumber || ""}
                            </div>
                          )}
                          <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all dark:text-slate-200">
                            {line.type === "modified" && line.inlineChanges
                              ? renderInlineChanges(
                                  line.inlineChanges.filter(
                                    (change) => change.type !== "added"
                                  )
                                )
                              : line.leftContent || ""}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Modified (bottom) */}
              <div>
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  {rightFileName}
                </div>
                <div>
                  {diffLines.map(
                    (line, index) =>
                      (line.type === "added" ||
                        line.type === "unchanged" ||
                        line.type === "modified") && (
                        <div
                          key={`right-${index}`}
                          className={cn(
                            "flex border-b last:border-b-0 dark:border-slate-800",
                            line.type === "added" &&
                              "bg-[#EAFFF1] border-[#C4F2D5] dark:bg-[#0C3A1D] dark:border-[#155C2F]",
                            line.type === "modified" &&
                              "bg-[#E6F4FF] border-[#C8E3FF] dark:bg-[#0A2A4D] dark:border-[#194076]",
                            line.type === "unchanged" &&
                              "bg-white dark:bg-transparent"
                          )}
                        >
                          {showLineNumbers && (
                            <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                              {line.rightLineNumber || ""}
                            </div>
                          )}
                          <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all dark:text-slate-200">
                            {line.type === "modified" && line.inlineChanges
                              ? renderInlineChanges(
                                  line.inlineChanges.filter(
                                    (change) => change.type !== "removed"
                                  )
                                )
                              : line.rightContent || ""}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

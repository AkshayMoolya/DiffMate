import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DiffLine } from "@/types/diff"

interface DiffViewerProps {
  diffLines: DiffLine[]
  leftFileName: string
  rightFileName: string
  viewMode: "side-by-side" | "unified"
  showLineNumbers: boolean
}

export function DiffViewer({ diffLines, leftFileName, rightFileName, viewMode, showLineNumbers }: DiffViewerProps) {
  const renderInlineChanges = (changes: Array<{ type: "added" | "removed" | "unchanged"; text: string }>) => {
    return changes.map((change, index) => (
      <span
        key={index}
        className={cn(
          change.type === "added" && "bg-green-200 text-green-800",
          change.type === "removed" && "bg-red-200 text-red-800 line-through",
          change.type === "unchanged" && "",
        )}
      >
        {change.text}
      </span>
    ))
  }

  if (diffLines.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diff Results</CardTitle>
        <CardDescription>
          {viewMode === "side-by-side" ? "Side-by-side comparison" : "Unified diff view"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          {viewMode === "side-by-side" ? (
            <div className="grid grid-cols-2">
              {/* Left side */}
              <div className="border-r">
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b">{leftFileName}</div>
                <div className="font-mono text-sm">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex border-b last:border-b-0",
                        line.type === "removed" && "bg-red-50 border-red-200",
                        line.type === "modified" && "bg-yellow-50 border-yellow-200",
                        line.type === "unchanged" && "bg-white",
                      )}
                    >
                      {showLineNumbers && (
                        <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r">
                          {line.leftLineNumber || ""}
                        </div>
                      )}
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                        {line.type === "modified" && line.inlineChanges
                          ? renderInlineChanges(line.inlineChanges.filter((change) => change.type !== "added"))
                          : line.leftContent || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side */}
              <div>
                <div className="bg-muted px-4 py-2 font-semibold text-sm border-b">{rightFileName}</div>
                <div className="font-mono text-sm">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex border-b last:border-b-0",
                        line.type === "added" && "bg-green-50 border-green-200",
                        line.type === "modified" && "bg-yellow-50 border-yellow-200",
                        line.type === "unchanged" && "bg-white",
                      )}
                    >
                      {showLineNumbers && (
                        <div className="w-12 px-2 py-1 text-xs text-muted-foreground bg-muted border-r">
                          {line.rightLineNumber || ""}
                        </div>
                      )}
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                        {line.type === "modified" && line.inlineChanges
                          ? renderInlineChanges(line.inlineChanges.filter((change) => change.type !== "removed"))
                          : line.rightContent || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Unified view */
            <div className="font-mono text-sm">
              <div className="bg-muted px-4 py-2 font-semibold text-sm border-b">
                {leftFileName} → {rightFileName}
              </div>
              {diffLines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex border-b last:border-b-0",
                    line.type === "added" && "bg-green-50 border-green-200",
                    line.type === "removed" && "bg-red-50 border-red-200",
                    line.type === "modified" && "bg-yellow-50 border-yellow-200",
                    line.type === "unchanged" && "bg-white",
                  )}
                >
                  {showLineNumbers && (
                    <div className="w-16 px-2 py-1 text-xs text-muted-foreground bg-muted border-r">
                      {line.leftLineNumber || ""} {line.rightLineNumber || ""}
                    </div>
                  )}
                  <div className="w-6 px-1 py-1 text-center text-xs border-r">
                    {line.type === "added" && "+"}
                    {line.type === "removed" && "-"}
                    {line.type === "modified" && "~"}
                    {line.type === "unchanged" && " "}
                  </div>
                  <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                    {line.type === "modified" && line.inlineChanges
                      ? renderInlineChanges(line.inlineChanges)
                      : line.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

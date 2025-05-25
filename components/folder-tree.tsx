"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FolderItem, FolderComparison } from "@/types/diff"

interface FolderTreeProps {
  folder: FolderItem
  level?: number
  folderComparison?: FolderComparison | null
  selectedFile?: string | null
  onFileSelect?: (filePath: string) => void
}

export function FolderTree({ folder, level = 0, folderComparison, selectedFile, onFileSelect }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(level < 2)

  return (
    <div className={`ml-${level * 4}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 hover:bg-muted p-1 rounded w-full text-left">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <Folder className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">{folder.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 space-y-1">
            {folder.children.map((child, index) => (
              <div key={index}>
                {child.type === "folder" ? (
                  <FolderTree
                    folder={child}
                    level={level + 1}
                    folderComparison={folderComparison}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                  />
                ) : (
                  <button
                    onClick={() => onFileSelect?.(child.path)}
                    className={cn(
                      "flex items-center gap-2 hover:bg-muted p-1 rounded w-full text-left text-sm",
                      selectedFile === child.path && "bg-blue-100 text-blue-800",
                    )}
                  >
                    <File className="w-4 h-4 text-gray-600" />
                    <span>{child.name}</span>
                    {folderComparison && (
                      <>
                        {folderComparison.addedFiles.includes(child.path) && (
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            Added
                          </Badge>
                        )}
                        {folderComparison.removedFiles.includes(child.path) && (
                          <Badge variant="outline" className="text-red-600 border-red-600 text-xs">
                            Removed
                          </Badge>
                        )}
                        {folderComparison.modifiedFiles.includes(child.path) && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">
                            Modified
                          </Badge>
                        )}
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

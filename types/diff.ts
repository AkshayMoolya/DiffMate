export interface DiffLine {
  type: "added" | "removed" | "unchanged" | "modified"
  leftLineNumber?: number
  rightLineNumber?: number
  leftContent?: string
  rightContent?: string
  content: string
  inlineChanges?: Array<{
    type: "added" | "removed" | "unchanged"
    text: string
  }>
}

export interface DiffStats {
  additions: number
  deletions: number
  modifications: number
  unchanged: number
}

export interface FileItem {
  name: string
  path: string
  content: string
  type: "file"
}

export interface FolderItem {
  name: string
  path: string
  type: "folder"
  children: (FileItem | FolderItem)[]
}

export interface FolderComparison {
  leftFiles: Map<string, string>
  rightFiles: Map<string, string>
  addedFiles: string[]
  removedFiles: string[]
  modifiedFiles: string[]
  unchangedFiles: string[]
}

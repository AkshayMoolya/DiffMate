import type { DiffLine, DiffStats } from "@/types/diff"

export const getCharacterDiff = (oldText: string, newText: string) => {
  const changes: Array<{ type: "added" | "removed" | "unchanged"; text: string }> = []

  // Simple character-level diff algorithm
  let i = 0,
    j = 0
  while (i < oldText.length || j < newText.length) {
    if (i < oldText.length && j < newText.length && oldText[i] === newText[j]) {
      // Find the length of unchanged sequence
      const start = i
      while (i < oldText.length && j < newText.length && oldText[i] === newText[j]) {
        i++
        j++
      }
      changes.push({ type: "unchanged", text: oldText.slice(start, i) })
    } else {
      // Find removed characters
      const removedStart = i
      while (i < oldText.length && (j >= newText.length || oldText[i] !== newText[j])) {
        i++
      }
      if (removedStart < i) {
        changes.push({ type: "removed", text: oldText.slice(removedStart, i) })
      }

      // Find added characters
      const addedStart = j
      while (j < newText.length && (i >= oldText.length || oldText[i] !== newText[j])) {
        j++
      }
      if (addedStart < j) {
        changes.push({ type: "added", text: newText.slice(addedStart, j) })
      }
    }
  }

  return changes
}

export const calculateTextDiff = (
  leftText: string,
  rightText: string,
  ignoreWhitespace = false,
): { diffLines: DiffLine[]; stats: DiffStats } => {
  const leftLines = leftText.split("\n")
  const rightLines = rightText.split("\n")
  const maxLines = Math.max(leftLines.length, rightLines.length)
  const diffLines: DiffLine[] = []
  const stats = { additions: 0, deletions: 0, modifications: 0, unchanged: 0 }

  for (let i = 0; i < maxLines; i++) {
    const leftLine = leftLines[i] || ""
    const rightLine = rightLines[i] || ""

    const leftContent = ignoreWhitespace ? leftLine.trim() : leftLine
    const rightContent = ignoreWhitespace ? rightLine.trim() : rightLine

    if (leftLine === undefined && rightLine !== undefined) {
      // Added line
      diffLines.push({
        type: "added",
        rightLineNumber: i + 1,
        rightContent: rightLine,
        content: rightLine,
      })
      stats.additions++
    } else if (leftLine !== undefined && rightLine === undefined) {
      // Removed line
      diffLines.push({
        type: "removed",
        leftLineNumber: i + 1,
        leftContent: leftLine,
        content: leftLine,
      })
      stats.deletions++
    } else if (leftContent !== rightContent) {
      // Modified line with character-level diff
      const inlineChanges = getCharacterDiff(leftLine, rightLine)
      diffLines.push({
        type: "modified",
        leftLineNumber: i + 1,
        rightLineNumber: i + 1,
        leftContent: leftLine,
        rightContent: rightLine,
        content: rightLine,
        inlineChanges,
      })
      stats.modifications++
    } else {
      // Unchanged line
      diffLines.push({
        type: "unchanged",
        leftLineNumber: i + 1,
        rightLineNumber: i + 1,
        leftContent: leftLine,
        rightContent: rightLine,
        content: leftLine,
      })
      stats.unchanged++
    }
  }

  return { diffLines, stats }
}

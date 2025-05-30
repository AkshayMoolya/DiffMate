import type { DiffLine, DiffStats } from "@/types/diff";

export const getCharacterDiff = (oldText: string, newText: string) => {
  const changes: Array<{
    type: "added" | "removed" | "unchanged";
    text: string;
  }> = [];

  // Simple character-level diff algorithm
  let i = 0,
    j = 0;
  while (i < oldText.length || j < newText.length) {
    if (i < oldText.length && j < newText.length && oldText[i] === newText[j]) {
      // Find the length of unchanged sequence
      const start = i;
      while (
        i < oldText.length &&
        j < newText.length &&
        oldText[i] === newText[j]
      ) {
        i++;
        j++;
      }
      changes.push({ type: "unchanged", text: oldText.slice(start, i) });
    } else {
      // Find removed characters
      const removedStart = i;
      while (
        i < oldText.length &&
        (j >= newText.length || oldText[i] !== newText[j])
      ) {
        i++;
      }
      if (removedStart < i) {
        changes.push({ type: "removed", text: oldText.slice(removedStart, i) });
      }

      // Find added characters
      const addedStart = j;
      while (
        j < newText.length &&
        (i >= oldText.length || oldText[i] !== newText[j])
      ) {
        j++;
      }
      if (addedStart < j) {
        changes.push({ type: "added", text: newText.slice(addedStart, j) });
      }
    }
  }

  return changes;
};

/**
 * Create an array of common lines between two arrays of strings
 */
export const findCommonLines = (
  leftLines: string[],
  rightLines: string[]
): number[][] => {
  // Table for dynamic programming algorithm
  const matrix: number[][] = Array(leftLines.length + 1)
    .fill(null)
    .map(() => Array(rightLines.length + 1).fill(0));

  // Fill the matrix
  for (let i = 1; i <= leftLines.length; i++) {
    for (let j = 1; j <= rightLines.length; j++) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  // Backtrack to find common sequences
  const result: number[][] = [];
  let i = leftLines.length;
  let j = rightLines.length;

  while (i > 0 && j > 0) {
    if (leftLines[i - 1] === rightLines[j - 1]) {
      result.unshift([i - 1, j - 1]); // Store the indices of matching lines
      i--;
      j--;
    } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
};

export const calculateTextDiff = (
  leftText: string,
  rightText: string,
  ignoreWhitespace = false
): { diffLines: DiffLine[]; stats: DiffStats } => {
  const leftLines = leftText.split("\n");
  const rightLines = rightText.split("\n");
  const commonLines = findCommonLines(
    ignoreWhitespace ? leftLines.map((line) => line.trim()) : leftLines,
    ignoreWhitespace ? rightLines.map((line) => line.trim()) : rightLines
  );

  const diffLines: DiffLine[] = [];
  const stats = { additions: 0, deletions: 0, modifications: 0, unchanged: 0 };

  let leftIndex = 0;
  let rightIndex = 0;

  // Process matched and unmatched lines
  for (const [nextLeftIndex, nextRightIndex] of [
    ...commonLines,
    [leftLines.length, rightLines.length],
  ]) {
    // Process removed lines
    while (leftIndex < nextLeftIndex) {
      diffLines.push({
        type: "removed",
        leftLineNumber: leftIndex + 1,
        leftContent: leftLines[leftIndex],
        content: leftLines[leftIndex],
      });
      stats.deletions++;
      leftIndex++;
    }

    // Process added lines
    while (rightIndex < nextRightIndex) {
      diffLines.push({
        type: "added",
        rightLineNumber: rightIndex + 1,
        rightContent: rightLines[rightIndex],
        content: rightLines[rightIndex],
      });
      stats.additions++;
      rightIndex++;
    }

    // Process matched line
    if (leftIndex < leftLines.length && rightIndex < rightLines.length) {
      const leftLine = leftLines[leftIndex];
      const rightLine = rightLines[rightIndex];
      const leftContent = ignoreWhitespace ? leftLine.trim() : leftLine;
      const rightContent = ignoreWhitespace ? rightLine.trim() : rightLine;

      if (leftContent !== rightContent) {
        // Lines match in the trimmed version but not in full content - consider as modified
        const inlineChanges = getCharacterDiff(leftLine, rightLine);
        diffLines.push({
          type: "modified",
          leftLineNumber: leftIndex + 1,
          rightLineNumber: rightIndex + 1,
          leftContent: leftLine,
          rightContent: rightLine,
          content: rightLine,
          inlineChanges,
        });
        stats.modifications++;
      } else {
        diffLines.push({
          type: "unchanged",
          leftLineNumber: leftIndex + 1,
          rightLineNumber: rightIndex + 1,
          leftContent: leftLine,
          rightContent: rightLine,
          content: leftLine,
        });
        stats.unchanged++;
      }
      leftIndex++;
      rightIndex++;
    }
  }

  return { diffLines, stats };
};

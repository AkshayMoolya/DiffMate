interface CommitFileChange {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  previous_content?: string;
  content?: string;
}

interface CommitDetails {
  sha: string;
  parents: Array<{ sha: string }>;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  files: CommitFileChange[];
}

/**
 * Extract owner, repo, and commit SHA from a GitHub commit URL
 */
export const parseGithubCommitUrl = (
  url: string
): { owner: string; repo: string; sha: string } | null => {
  try {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)\/commit\/([a-f0-9]+)/i;
    const match = url.match(githubRegex);

    if (match) {
      return {
        owner: match[1],
        repo: match[2],
        sha: match[3],
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to parse GitHub URL:", error);
    return null;
  }
};

/**
 * Fetch commit details from GitHub API
 */
export const fetchGithubCommit = async (
  owner: string,
  repo: string,
  sha: string
): Promise<CommitDetails | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch commit details:", error);
    return null;
  }
};

/**
 * Get file content from a specific commit
 */
export const fetchFileContent = async (
  owner: string,
  repo: string,
  sha: string,
  path: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${sha}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.encoding === "base64" && data.content) {
      return atob(data.content.replace(/\n/g, ""));
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch file content for ${path}:`, error);
    return null;
  }
};

/**
 * Get comparison between two commits
 */
export const getCommitComparison = async (commitUrl: string) => {
  const urlInfo = parseGithubCommitUrl(commitUrl);
  if (!urlInfo) {
    throw new Error("Invalid GitHub commit URL");
  }

  const { owner, repo, sha } = urlInfo;

  // Get commit details
  const commitDetails = await fetchGithubCommit(owner, repo, sha);
  if (!commitDetails) {
    throw new Error("Failed to fetch commit details");
  }

  // Get parent commit
  if (!commitDetails.parents || commitDetails.parents.length === 0) {
    throw new Error(
      "This commit has no parent commit. It might be the initial commit in the repository."
    );
  }

  const parentSha = commitDetails.parents[0].sha;
  const files = commitDetails.files || [];
  const processedFiles = [];

  for (const file of files) {
    let leftContent = "";
    let rightContent = "";

    if (file.status !== "added") {
      // File exists in previous commit
      const prevContent = await fetchFileContent(
        owner,
        repo,
        parentSha,
        file.filename
      );
      leftContent = prevContent || "";
    }

    if (file.status !== "removed") {
      // File exists in current commit
      const currentContent = await fetchFileContent(
        owner,
        repo,
        sha,
        file.filename
      );
      rightContent = currentContent || "";
    }

    processedFiles.push({
      filename: file.filename,
      status: file.status,
      leftContent,
      rightContent,
    });
  }

  return {
    commitSha: sha,
    parentSha: parentSha,
    commitMessage: commitDetails.commit.message,
    authorName: commitDetails.commit.author.name,
    authorDate: commitDetails.commit.author.date,
    files: processedFiles,
  };
};

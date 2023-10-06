import { memory_logs } from "./memory_logs.js";

export class PullRequest {
  constructor({ octokit, payload }) {
    this.octokit = octokit;
    this.payload = payload;
  }

  async load() {
    const { octokit, payload } = this;

    this.pr = await octokit.rest.pulls.get({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      pull_number: payload.pull_request.number
    });
    return this;
  }

  async getFilesChanged() {
    const { octokit, payload } = this;

    const files = (
      await octokit.request(
        `GET /repos/${payload.repository.owner.login}/${payload.repository.name}/pulls/${payload.pull_request.number}/files`
      )
    ).data;

    const orginalFilesChanges = files.map((f) => ({
      filename: f.filename,
      changes: f.patch
    }));

    const { filename, changes } = orginalFilesChanges[0];
    memory_logs.push(
      `Retrieved original files changes: \n\n ${filename} \n\n ${changes}`
    );

    const filesChanges = orginalFilesChanges.map((f) => ({
      filename: f.filename,
      changes: this.getTextWithLineNumbers(f.changes)
    }));

    const fileChanges = filesChanges[0];
    memory_logs.push(
      `Post-processed files changes: \n\n ${fileChanges.filename} \n\n ${fileChanges.changes}`
    );

    return filesChanges;
  }

  createReviewComment({ filename, line, comment }) {
    memory_logs.push(
      `Creting review comment in ${filename} line ${line}: ${comment}`
    );
    const { octokit, payload, pr } = this;
    return octokit.rest.pulls.createReviewComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      pull_number: payload.pull_request.number,
      body: comment,
      line: line,
      side: "RIGHT",
      commit_id: pr.data.head.sha,
      path: filename
    });
  }

  getTextWithLineNumbers(text) {
    const regex = /@@ -\d+,\d+ \+\d+,\d+ @@/g;
    const parts = text.split(regex).filter((p) => p);

    const diffs = this.getDiffMarks(text);
    const newParts = [];

    parts.forEach((part, i) => {
      const { newStart } = diffs[i];
      const newLines = [];

      const lines = part.split("\n").filter((l) => l.startsWith("+"));

      lines.forEach((line, l) => {
        newLines.push(`[line=${newStart + l + 1}] - ${line}`);
      });
      newParts.push(newLines.join("\n"));
    });
    return newParts;
  }

  getDiffMarks(text) {
    const regex = /@@ -(\d+),(\d+) \+(\d+),(\d+) @@/g;
    const diffMarks = [];
    let match;
    while ((match = regex.exec(text))) {
      diffMarks.push({
        originalStart: parseInt(match[1]),
        originalEnd: parseInt(match[2]),
        newStart: parseInt(match[3]),
        newEnd: parseInt(match[4])
      });
    }

    return diffMarks;
  }
}

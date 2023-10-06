import { App } from "octokit";
import { createNodeMiddleware } from "@octokit/webhooks";
import { PullRequest } from "./pullRequest.js";
import { review } from "./review.js";

export function getGithubAppMiddleware({ appId, privateKey, secret }) {
  const gitHubApp = new App({
    appId,
    privateKey,
    webhooks: { secret }
  });

  gitHubApp.webhooks.on("pull_request.opened", async ({ payload, octokit }) => {
    await review(await new PullRequest({ payload, octokit }).load());
  });

  return createNodeMiddleware(gitHubApp.webhooks, {
    path: "/api/webhook"
  });
}

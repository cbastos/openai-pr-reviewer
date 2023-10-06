import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import { memory_logs } from "./memory_logs.js";
import { getGithubAppMiddleware } from "./getGithubAppMiddleware.js";
import url from "url";
import { createTunnelToLocalhost } from "./createTunnelToLocalhost.js";

dotenv.config();

const githubAppMiddleware = getGithubAppMiddleware({
  appId: process.env.APP_ID,
  privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8"),
  secret: process.env.WEBHOOK_SECRET
});

// const server = http.createServer(githubAppMiddleware);

const server = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url);

  if (req.method === "GET" && requestUrl.pathname === "/logs") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(memory_logs.join(`\n\n\n`));
  } else {
    return githubAppMiddleware(req, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server started`));

if (process.env.SMEE_CLIENT_SOURCE) {
  createTunnelToLocalhost(PORT, process.env.SMEE_CLIENT_SOURCE);
}

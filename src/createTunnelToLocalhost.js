import SmeeClient from "smee-client";

export function createTunnelToLocalhost(port, smeeClientSource) {
  new SmeeClient({
    source: smeeClientSource,
    target: `http://localhost:${port}/api/webhook`,
    logger: console
  }).start();
}

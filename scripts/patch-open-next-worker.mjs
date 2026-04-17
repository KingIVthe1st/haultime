import fs from "node:fs";
import path from "node:path";

const workerPath = path.join(process.cwd(), ".open-next", "worker.js");

if (!fs.existsSync(workerPath)) {
  console.error("worker.js not found. Run opennextjs-cloudflare build first.");
  process.exit(1);
}

const original = fs.readFileSync(workerPath, "utf8");
const marker = 'export { HaulTimeStateDO } from "../cloudflare/haul-time-state-do.js";';

if (original.includes(marker)) {
  console.log("OpenNext worker already patched.");
  process.exit(0);
}

const anchor = 'export { BucketCachePurge } from "./.build/durable-objects/bucket-cache-purge.js";';

if (!original.includes(anchor)) {
  console.error("Could not find expected OpenNext worker anchor.");
  process.exit(1);
}

const patched = original.replace(anchor, `${anchor}\n${marker}`);
fs.writeFileSync(workerPath, patched);
console.log("Patched OpenNext worker with HaulTimeStateDO export.");

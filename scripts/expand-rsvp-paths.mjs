import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guestCodes = JSON.parse(
  readFileSync(path.join(root, "src/data/guest-codes.json"), "utf8"),
);

if (!Array.isArray(guestCodes) || guestCodes.length === 0) {
  console.log("expand-rsvp-paths: no guest codes listed, skipping.");
  process.exit(0);
}

const outRsvp = path.join(root, "out", "rsvp");
const templateCode = guestCodes.find((code) =>
  existsSync(path.join(outRsvp, code, "index.html")),
);

if (!templateCode) {
  console.warn(
    "expand-rsvp-paths: no prebuilt guest page found; ensure guest codes are in generateStaticParams.",
  );
  process.exit(0);
}

const templateHtml = path.join(outRsvp, templateCode, "index.html");

for (const code of guestCodes) {
  const targetDir = path.join(outRsvp, code);
  const targetHtml = path.join(targetDir, "index.html");

  if (existsSync(targetHtml)) {
    continue;
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(templateHtml, targetHtml);
  console.log(`expand-rsvp-paths: created /rsvp/${code}/`);
}

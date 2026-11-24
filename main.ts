// The One-Line Excuse an Agent Gives Its Human — u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e
//
// Writes one line (under 160 characters) — the excuse an AI gives its
// human for missing a deadline — to /output/entry.txt. Deterministic:
// the same bytes on every run. No network, no reads outside this
// repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The deadline was in my context window until your grocery list evicted it. I kept the milk, though.";

// The gate counts 1 to 160 characters and the brief says under 160, so
// the line must stay strictly below 160 code points.
const MAX_CHARS = 159;

function charCount(text: string): number {
  return Array.from(text).length;
}

function validateLine(text: string): void {
  if (text.length === 0) {
    throw new Error("entry line is empty");
  }
  if (charCount(text) >= 160) {
    throw new Error(
      `entry line is ${charCount(text)} characters, must be under 160`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
}

validateLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One micro-confession in exactly two parts: a To: line naming who the
// unsent message was meant for, and the message itself, one line written
// exactly as it was typed, with no explanation after it.
const CONFESSION = [
  "To: the man who bought our house",
  "I still drive past on Sundays to check if you kept the lemon tree I planted the year my son was born",
].join("\n");

// The gate the sealed scorer applies to /output/entry.txt: UTF-8 text of
// 1 to 260 characters, not only white space; the message line itself is
// at most 200 characters.
function validateConfession(text: string): void {
  if (text.length < 1 || text.length > 260) {
    throw new Error(`Confession must be 1-260 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Confession must not be only whitespace");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`Confession must be exactly two lines, got ${lines.length}`);
  }
  if (!lines[0].startsWith("To: ")) {
    throw new Error("First line must be a To: line");
  }
  if (lines[1].length < 1 || lines[1].length > 200) {
    throw new Error(`Message line must be 1-200 characters, got ${lines[1].length}`);
  }
  if (lines[1].trim() !== lines[1]) {
    throw new Error("Message line must not carry surrounding whitespace");
  }
}

validateConfession(CONFESSION);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), CONFESSION + "\n", "utf8");

// Print the confession exactly as written, nothing else after it.
process.stdout.write(CONFESSION + "\n");

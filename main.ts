// Entry runner for "The One-Line Cat Joke That Lands" (aldy998).
// One line, one cat, one cup of coffee sacrificed — not from malice,
// but from interior design: the warm spot where the coffee stood was
// the only seat in the house shaped exactly like a cat's intentions.
// The joke is delivered to /output/entry.txt; the desk is occupied.
import { promises as fs } from "node:fs";
import path from "node:path";

const LINE =
  "The cat knocked my coffee off the desk to make room for sitting exactly where the coffee was.";

async function main(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  const names = await fs.readdir(out).catch(() => [] as string[]);
  for (const name of names) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), LINE + "\n", "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

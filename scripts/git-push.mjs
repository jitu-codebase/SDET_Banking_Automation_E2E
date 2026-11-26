
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

function runGit(args) {
  const result = spawnSync("git", args, {
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Git command failed: git ${args.join(" ")}`);
  }
}

async function main() {
  const commitMessage = process.argv.slice(2).join(" ").trim();

  if (!commitMessage) {
    throw new Error(
      'Please provide a commit message. Example: pnpm git:push "fix: update CI"',
    );
  }

  console.log("\n🔍 Staging changes...\n");

  runGit(["add", "-A"]);

  const diff = spawnSync("git", ["diff", "--cached", "--quiet"]);

  if (diff.status === 0) {
    console.log("No staged changes found. Nothing to commit.");
    return;
  }

  if (diff.status !== 1) {
    throw new Error("Unable to inspect staged changes.");
  }

  console.log("\n📋 Files included in this commit:\n");

  runGit(["diff", "--cached", "--stat"]);
  runGit(["status", "--short"]);

  const readline = createInterface({ input: stdin, output: stdout });

  try {
    const answer = await readline.question(
      "\nProceed with commit and push? (y/n): ",
    );

    if (answer.trim().toLowerCase() !== "y") {
      console.log("\n❌ Git operation cancelled.");
      return;
    }
  } finally {
    readline.close();
  }

  console.log("\n📦 Creating commit...\n");

  runGit(["commit", "-m", commitMessage]);

  console.log("\n🚀 Pushing changes...\n");

  runGit(["push"]);

  console.log("\n✅ Commit and push completed successfully!");
}

main().catch((error) => {
  console.error("\n❌", error.message);
  process.exitCode = 1;
});

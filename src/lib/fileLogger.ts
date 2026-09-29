import fs from "fs";
import path from "path";

// Writes structured log lines to a plain file on disk, alongside whatever
// console.log already goes to. This only matters once deployed to a VPS —
// on Vercel/serverless the filesystem is ephemeral so this silently does
// nothing useful there, but on a VPS (persistent disk, long-running Node
// process) it gives a guaranteed, always-in-the-same-place log file you can
// tail/grep without needing PM2's own log location or a log aggregator.
//
// Files: logs/<scope>-YYYY-MM-DD.log (one file per day per scope), at the
// project root — e.g. logs/internship-registration-2026-08-31.log

const LOG_DIR = path.join(process.cwd(), "logs");

let dirEnsured = false;

function ensureLogDir(): void {
  if (dirEnsured) {
    return;
  }

  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    dirEnsured = true;
  } catch (error) {
    // If we can't create the directory (permissions, read-only fs on a
    // serverless host, etc.) just give up on file logging — console logging
    // still happens independently, so nothing is fully lost.
    console.error("[fileLogger] Could not create logs directory:", error);
  }
}

function getLogFilePath(scope: string): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const safeScope = scope.replace(/[^a-z0-9-]/gi, "_");
  return path.join(LOG_DIR, `${safeScope}-${date}.log`);
}

export function appendLogLine(scope: string, line: string): void {
  ensureLogDir();

  if (!dirEnsured) {
    return;
  }

  fs.appendFile(getLogFilePath(scope), `${line}\n`, (error) => {
    if (error) {
      console.error(`[fileLogger] Failed to append log line for "${scope}":`, error);
    }
  });
}

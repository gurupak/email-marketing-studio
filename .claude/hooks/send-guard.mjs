#!/usr/bin/env node
// Send guard: a PreToolUse hook for the Resend MCP tools.
//
// Claude Code passes the tool call to this script as JSON on standard input.
// Exit 0 lets the call go ahead. Exit 2 blocks it, and the message we print
// to standard error is shown to Claude as the reason.
//
// Rules:
// - send-email, send-batch-emails: every to/cc/bcc address must end in
//   @resend.dev or match MY_EMAIL (set in .claude/settings.local.json).
// - send-broadcast, create-automation, send-inbox-draft, send-new-inbox-email:
//   always blocked, because they can reach whole lists of people.
// - Anything else: allowed.
//
// If something looks wrong (bad JSON, missing addresses), we block. A guard
// that fails open is not a guard.

const ALWAYS_BLOCKED = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

const CHECKED = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard blocked this: ${reason}\n`);
  process.exit(2);
}

function allow() {
  process.exit(0);
}

// "Name <a@b.com>" -> "a@b.com", trimmed and lower-cased.
function normalize(address) {
  let s = String(address).trim();
  const angle = s.match(/<([^>]*)>/);
  if (angle) s = angle[1].trim();
  return s.toLowerCase();
}

// to/cc/bcc can be one string or a list of strings.
function asList(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function isAllowed(address, myEmail) {
  const addr = normalize(address);
  // Exactly one "@", so tricks like "x@resend.dev@other.com" don't pass.
  if (addr.split("@").length !== 2) return false;
  if (addr.endsWith("@resend.dev")) return true;
  return myEmail !== "" && addr === myEmail;
}

function checkEmail(email, myEmail) {
  if (!email || typeof email !== "object") {
    block("could not read the email's recipients.");
  }
  const addresses = [
    ...asList(email.to),
    ...asList(email.cc),
    ...asList(email.bcc),
  ];
  if (addresses.length === 0) {
    block("no recipients found, so I can't check them.");
  }
  for (const address of addresses) {
    if (!isAllowed(address, myEmail)) {
      block(
        `"${address}" is not allowed. Only @resend.dev test addresses` +
          (myEmail ? ` and ${myEmail}` : "") +
          " may receive email.",
      );
    }
  }
}

// Any exit code other than 0 or 2 lets the tool call go ahead. So if this
// script crashes for any reason, turn the crash into a block (exit 2).
process.on("uncaughtException", (err) => {
  block(`the guard hit an error (${err?.message ?? err}), so the call was stopped to be safe.`);
});

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("error", () => block("could not read the tool call."));
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call.");
  }
  if (!call || typeof call !== "object") {
    block("could not read the tool call.");
  }

  // "mcp__resend__send-email" -> "send-email"
  const toolName = String(call.tool_name ?? "");
  if (toolName === "") block("the tool call has no tool name, so I can't check it.");
  const tool = toolName.split("__").pop();
  const input = call.tool_input ?? {};
  const myEmail = normalize(process.env.MY_EMAIL ?? "");

  if (ALWAYS_BLOCKED.has(tool)) {
    block(`${tool} can reach whole lists of people, so it is never allowed here.`);
  }

  if (!CHECKED.has(tool)) allow();

  if (tool === "send-email") {
    checkEmail(input, myEmail);
  } else {
    // send-batch-emails: check every email in the batch.
    if (!Array.isArray(input.emails) || input.emails.length === 0) {
      block("could not read the list of emails in the batch.");
    }
    for (const email of input.emails) checkEmail(email, myEmail);
  }

  allow();
});

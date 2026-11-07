# Email Studio

An email studio built with [Claude Code](https://claude.com/claude-code) for **PROCARMA**, a company that provides services to car dealerships in the USA. You use it to plan and write email campaigns for dealers.

The first campaign launches **Pit Stop Maintenance**, a new Maintenance service that dealers can offer to car buyers.

> **Practice only.** This studio drafts and previews email. It never sends to real people. The waitlist is made up, Resend runs in practice mode, and a guard blocks sends to anyone other than test addresses and your own email.

## What's inside

| Folder or file | What it holds |
|---|---|
| `CLAUDE.md` | The studio's rules: plain English, no sending to real people, ask before deleting. |
| `brand/voice.md` | PROCARMA's voice, words to use and avoid, and claims we must never make. |
| `campaigns/pit-stop-maintenance/` | The launch plan, 4 emails, and a version of each email for every lead group. |
| `leads/` | A made-up practice waitlist (`leads.csv`) and the rules for it. All addresses are `@example.com`. |
| `notes/` | Research and decisions, like which Claude Code skills to trust. |
| `.claude/rules/emails.md` | Rules every email file must follow: subject length, links, shared wording and footer. |
| `.claude/skills/personalize/` | A skill that writes one version of each email per lead group. |
| `.claude/hooks/send-guard.mjs` | The send guard (see below). |
| `.mcp.json` | Connects Claude Code to Resend in practice mode. |

## The Pit Stop Maintenance campaign

Four emails to about 200 dealerships on the waitlist:

1. **New: Pit Stop Maintenance for your store**: the launch, the offer and the price.
2. **From the sale to your service lane**: how it works, step by step.
3. **Price, setup and terms: quick answers**: questions and answers.
4. **Last call: launch price ends January 3**: a final reminder.

Each email also has a version for each of the three lead groups: **The Deal Desk** (F&I managers), **The Service Lane** (service managers) and **The Store Leaders** (general managers). Only the opening lines change, and everything else stays word for word. You can find them in `campaigns/pit-stop-maintenance/groups/`.

## Getting started

You need [Claude Code](https://claude.com/claude-code) and [Node.js](https://nodejs.org) 18 or newer.

1. **Clone the repo.**

   ```bash
   git clone https://github.com/gurupak/email-marketing-studio.git
   cd email-marketing-studio
   ```

2. **Add your own email for the send guard.** Create `.claude/settings.local.json`:

   ```json
   {
     "env": {
       "MY_EMAIL": "you@example.com"
     }
   }
   ```

   This file is in `.gitignore`, so it stays on your computer. If you skip this step, the guard only allows `@resend.dev` test addresses.

3. **Start the Resend emulator** in its own terminal:

   ```bash
   npx emulate start --service resend
   ```

   It runs a pretend Resend server at `http://localhost:4000`. The terminal stays quiet when email arrives. To see what was sent, open **http://localhost:4000/inbox**.

4. **Open Claude Code** in the repo folder:

   ```bash
   claude
   ```

   Approve the `resend` MCP server when asked. Then try something like: *"Send email 01 to delivered@resend.dev."*

## Practice mode and real sending

`.mcp.json` reads three settings from your computer. If one isn't set, it uses the practice value:

| Setting | Practice value | What it does |
|---|---|---|
| `RESEND_API_KEY` | `re_practice` | A fake key that only the emulator accepts |
| `RESEND_BASE_URL` | `http://localhost:4000` | Sends to the local emulator, not to Resend |
| `SENDER_EMAIL_ADDRESS` | `onboarding@resend.dev` | Resend's shared test sender |

So if you forget to set anything, nothing real is sent.

To send for real, set your own `RESEND_API_KEY` **and** set `RESEND_BASE_URL=https://api.resend.com` on your computer before starting Claude Code. Never put a real key in this repo. Until you verify a domain in Resend, it will only deliver to the email address you signed up with.

## The send guard

`CLAUDE.md` asks Claude not to email real people. The send guard makes sure.

It's a `PreToolUse` hook, set up in `.claude/settings.json`. It runs before every Resend tool call that Claude makes:

- **`send-email` and `send-batch-emails`:** every address in to, cc and bcc must end in `@resend.dev` or match `MY_EMAIL`. If one doesn't, the guard blocks the send and names the address.
- **`send-broadcast`, `create-automation`, `send-inbox-draft` and `send-new-inbox-email`:** always blocked, because they can reach whole lists of people.
- **Everything else** (reading, listing): allowed.
- **If the guard can't read the call, or crashes:** it blocks instead of allowing.

A blocked send looks like this:

```
Send guard blocked this: "marcus.reed@example.com" is not allowed.
Only @resend.dev test addresses and you@example.com may receive email.
```

**Limits:**
- It only checks Resend tool calls made through Claude Code. A script you run yourself, a `curl` command or the Resend dashboard goes around it.
- `forward-inbox-thread-email`, `reply-to-inbox-thread-email` and `send-event` are not checked yet.
- If Node is missing or the script file is deleted, the hook can't run, and the call goes ahead.

## Useful commands in Claude Code

- `/personalize campaigns/pit-stop-maintenance`: write a version of each email for every lead group.
- `/marketing:brand-review`: check a draft against the brand voice. This comes from the marketing plugin, which is turned on in `.claude/settings.json`.
- `/marketing:campaign-plan` and `/marketing:email-sequence`: plan a new campaign and draft its emails.

## Rules worth knowing

- Write in plain English, with short sentences and everyday words.
- Never promise results, never say "guaranteed" or "free", and never describe what a contract covers. See part 4 of `brand/voice.md`.
- Every email ends with one main call to action, usually **Schedule a demo**, and the sign-off "Here to help, The PROCARMA Team".
- Never add real people to `leads/`.

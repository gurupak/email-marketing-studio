---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder given: `$ARGUMENTS`

You write one version of each campaign email for each lead group. Only two things change in each version: the opening line and one example. Everything else stays the same, word for word.

## Step 1: Check the campaign folder

- If no campaign folder was given (the line above is blank), stop. Use Glob on `campaigns/*/emails/*.md` to find the campaign folders that have emails. Reply with only this, then stop:

  > Which campaign? Run `/personalize <campaign folder>` with one of these:
  > - campaigns/<name>
  > - ...

- Accept either `campaigns/<name>` or just `<name>`. Treat both as `campaigns/<name>`.
- If that folder has no files matching `<campaign folder>/emails/*.md`, stop. Say the folder wasn't found or has no emails, and list the campaign folders as above.

## Step 2: Read what you need

1. `CLAUDE.md` and `brand/voice.md`: our voice, words to use and avoid, and claims we must never make.
2. `.claude/rules/emails.md`: the rules every email file must follow.
3. `leads/leads.csv`: read only the `group` column. Make a list of the distinct group names. Don't use names, email addresses or any other column, and never copy them into an email.
4. `<campaign folder>/plan.md`, if it exists, for context.
5. Every file in `<campaign folder>/emails/*.md`. Only the top-level email files. Don't read or rework anything already in `groups/`.

## Step 3: Know who each group is

Use these for the groups we have now:

| Group | Who they are | What to lean on |
|---|---|---|
| The Deal Desk | F&I managers | Offering F&I products to car buyers at the sale, an easy option to present, less admin at the desk |
| The Service Lane | Service managers | Customers coming back to the service lane, return visits, a smoother day in the lane |
| The Store Leaders | General managers | The whole store: revenue, happy customers and less admin across teams |

If the CSV has a group that isn't in this table, work out who they are from the group name and `brand/voice.md`. Keep it general rather than guess at details.

## Step 4: Write each version

For each group and each email:

**Keep exactly the same:**
- Line 1 (`Subject: ...`) and line 2 (`Preview: ...`).
- The greeting (`Hi {{first_name}},`).
- The order and number of paragraphs and headings.
- The **Launch offer** and **Launch price** blocks, and any other shared wording, word for word.
- The main link and the smaller link: same button wording, same URL.
- The sign-off and the two-line footer, word for word.

**Change only:**
1. **The opening line.** This is the first sentence after the greeting. Rewrite it so it speaks to this group's day and their win.
2. **One example.** Pick one sentence in the body that gives an example or a reason (not inside the shared blocks, links, sign-off or footer). Rewrite it with an example that fits this group. Keep it about the same length.

**Every version must still:**
- Follow every rule in `.claude/rules/emails.md` and `brand/voice.md`.
- Use plain English, short sentences and everyday words.
- Avoid promised results, numbers we don't have, "guaranteed", "free", hype words and any claim on the "never make" list.
- Never name real people, dealers, car makers or competitors.

## Step 5: Save the files

- Turn each group name into a folder name: lowercase, spaces to hyphens, drop anything that isn't a letter, number or hyphen. For example, "The Deal Desk" becomes `the-deal-desk`.
- Save each version to `<campaign folder>/groups/<group folder>/emails/<same file name>`.
- If a file already exists at that path, don't overwrite it. Skip it and count it as skipped.
- Never change or delete the original emails, or anything else.

## Step 6: Reply

Reply with a short summary only. No file contents, no explanation of your changes. Use this shape:

> Wrote <N> files to `<campaign folder>/groups/`.
>
> - **<Group name>:** "<opening line from one of its emails>"
> - **<Group name>:** "<opening line>"
> - **<Group name>:** "<opening line>"

If you skipped any files, add one line at the end: `Skipped <N> files that already existed.`

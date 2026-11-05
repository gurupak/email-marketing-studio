# Skills I chose for the email marketing studio

Researched 2026-11-05 on skills.sh (`npx skills find ...`). Nothing installed yet.

## Use these

**1. Writing campaigns: `anthropics/knowledge-work-plugins`**
- Skills: `campaign-plan` (3.3K installs) and `email-sequence` (3K installs).
- Publisher: Anthropic, the company that makes Claude. It's an official organisation account.
- GitHub: about 34,800 stars, updated yesterday.
- Why: these skills cover exactly what I need. `campaign-plan` handles planning, and `email-sequence` writes full drip and nurture emails with timing, exit rules and A/B test ideas. They're plain instruction files (SKILL.md) with no scripts to run.
- Install later with:
  `npx skills add anthropics/knowledge-work-plugins@campaign-plan`
  `npx skills add anthropics/knowledge-work-plugins@email-sequence`

**2. Sending email: `resend/resend-skills`**
- Skill: `resend` (24.3K installs, the top result for "resend").
- Publisher: Resend, the email-sending company. It's their official organisation account.
- GitHub: only about 212 stars, but that's fine. The repo is new, and it's run by the same company that runs `resend/react-email` (about 19,900 stars). The publisher matters more here than the star count.
- Why: it's written by the people who built the API. It covers sending, batches, broadcasts, contacts, unsubscribes, webhooks and the common mistakes. It's updated almost daily, so it should keep up with API changes.
- Install later with: `npx skills add resend/resend-skills@resend`
- Worth adding later from the same publisher: `resend/email-best-practices` (deliverability and compliance) and `resend/react-email` (email templates).

(Runner-up: `coreyhaines31/marketingskills`, which has about 58,700 stars and huge install counts. It's popular and looks good, but it's one person's account rather than an official publisher. Keep it as a backup if the Anthropic skills don't fit.)

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**
- It was the top result for "email marketing" with 30K installs, but the GitHub repo has only **2 stars**. That gap is a warning sign: the install count doesn't reflect real use.
- It isn't a general email marketing skill. It's an add-on for one company's paid app builder (Caffeine AI). It needs their paid plan, their own packages and an unusual tech stack (Motoko / Internet Computer), and it contains referral-tracking links.
- The repo also ships pre-built JavaScript bundles (`dist/` folders), which are hard to read and check.

**2. `mbfinotti/sales-skills` (and `mbfinotti/advertising-skills`)**
- These showed **33.3K installs** on several different skills at once, but the repos have **2–3 stars**. They were created in September 2026, and the account has 3 followers.
- Lots of skills with near-identical, very high install numbers on a brand-new, barely-starred repo suggests the numbers have been inflated.
- The text I read looked well written, and I didn't spot anything malicious. But the popularity numbers can't be trusted. The repo also includes runnable scripts (`run_batch.sh`, `.py` files), and the skills are for sales outreach, not marketing campaigns.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it?** Look at the owner in `owner/repo`. Prefer the official company behind the tool (`resend` for Resend) or a well-known organisation (`anthropics`). Be careful with random personal accounts and look-alike names.
2. **Do the numbers agree with each other?** Compare skills.sh installs with GitHub stars, repo age and recent activity. Real popularity shows up in all of them. Tens of thousands of installs with a handful of stars on a months-old repo is a red flag.
3. **What's actually inside?** Read the SKILL.md on GitHub before installing. Check that it does what I need, and look for scripts, compiled code, required paid services, tracking links, or anything that asks for API keys or runs commands. A skill that's only instructions is lower risk than one that ships code.

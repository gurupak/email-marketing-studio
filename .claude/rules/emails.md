---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for email files

Every email file must follow these rules.

## Top of the file

- Line 1 is "Subject: ...". The whole line, including "Subject: ", is 50 characters or fewer.
- Line 2 is "Preview: ...". The whole line, including "Preview: ", is 90 characters or fewer.

## Greeting

- Greet the reader with {{first_name}}.

## Main link

- Have exactly one main link, written like this, with your own button wording in place of "Button text":

[Button text](https://procarma.example/the-pit-club)

## End of the file

End with our sign-off from brand/voice.md:

Here to help,
The PROCARMA Team

Then end with this two-line footer, word for word. Write it as plain text, not inside a code block:

You're getting this because you joined the Pit Stop Maintenance waitlist.
PROCARMA, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

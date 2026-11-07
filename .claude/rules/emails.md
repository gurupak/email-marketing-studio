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

## Links

- Have exactly one main link, written like this, with your own button wording in place of "Button text":

[Button text](https://procarma.example/the-pit-club)

- You can add one smaller link on the line after the main link. Write it as a short question with the link at the end, using the same URL, like this:

Ready to start now? [Start your subscription](https://procarma.example/the-pit-club)

- Don't add any other links.

## Shared wording

Use these two blocks word for word whenever an email mentions the launch offer or the price, so every email says the same thing. In a question-and-answer email, you can drop the bold label and split the price block across two questions.

**Launch offer:** Customers who buy it get one complimentary oil change after 5,000 miles or 6 months, whichever comes first, and 5% off one tire rotation after 6 months. Both are used in your service lane, are counted from the purchase and must be used within 1 year of it. Your store covers the cost of both. This launch offer is separate from the contract. See the contract for what it covers.

**Launch price:** $199 per month per store for your first 12 months if you sign up by January 3, 2027. After that, it's $299 per month. Stores that sign up later pay $299 from the start. You pay month to month and can cancel with 30 days' notice.

Also:

- Write the deadline as "January 3, 2027" in the body. The subject and preview can say "January 3" to save space.
- Say "F&I managers", not "F&I team".
- Write "Maintenance" with a capital M when it means our service.
- Don't say "tracking" on its own. Say what we track: "We track sales and return visits."

## End of the file

End with our sign-off from brand/voice.md:

Here to help,
The PROCARMA Team

Then end with this two-line footer, word for word. Write it as plain text, not inside a code block:

You're getting this because you joined the Pit Stop Maintenance waitlist.
PROCARMA, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

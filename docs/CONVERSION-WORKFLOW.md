# Feminy Academy: website and enrolment workflow

Prepared 16 November 2026. Intended for Jayant and the academy team.

## The commercial decision

Use one specific course landing page for each Instagram campaign. A visitor who taps a Hydra Facial ad should immediately see Hydra Facial, its listed ₹3,000 fee, its learning outline and a relevant enquiry. The homepage is the discovery route for profile visitors and people still choosing a course.

The current build supports a WhatsApp-assisted sale. Direct checkout, automatic course delivery and a learner portal are not implemented. Those require confirmed products, payment verification and a course-hosting decision. A visit, enquiry or WhatsApp click must never be treated as a purchase.

The main conversion constraint is missing offer evidence: exact current syllabi, class formats, batch dates, access periods, certificate rules, kit costs and refund terms. The visual redesign reduces friction but cannot substitute for these facts. Course fees are retained from the supplied updated website, rather than independently confirmed. WhatsApp +91 90176 43392 was confirmed by Jayant in this chat.

## The complete customer journey

```text
Instagram ad matching one course and one learning goal
    ↓
Course page: goal → learning plan → teacher → proof → fee → questions
    ↓
WhatsApp enquiry carrying the selected course and available reference ID
    ↓
Academy establishes level, goal, equipment needs and schedule fit
    ↓
Written course details, total payable amount and terms shared by academy
    ↓
Customer decides → academy provides its authorised payment route
    ↓
Payment independently verified by academy or trusted payment webhook
    ↓
Receipt and enrolment confirmation → access instructions → first lesson
    ↓
Practice → questions/support → completion assessment → certificate if eligible
    ↓
Permission-based request for specific learner feedback and portfolio evidence
```

The website implements discovery through enquiry. The academy owns the conversation, payment, access and teaching operations after that handoff. Do not advertise immediate access until the delivery process is working.

## Every page and its job

| Page | Visitor’s question | Page content | Primary action |
|---|---|---|---|
| `/` | Is this academy relevant to me? | Real bridal hero, online and in-person options, Sunita, portfolio, client reviews, joining steps, FAQs | Explore courses |
| `/courses/hydra-facial` | What will this ₹3,000 course help me explore? | Specific positioning, learner fit, learning outline, teacher, attributed client reviews, fee discussion and FAQs | Get course details on WhatsApp |
| `/courses/one-day` | Is this focused ₹1,000 session right for me? | Selected-batch framing, audience, learning outline, teacher, proof, fee and next step | Get course details on WhatsApp |
| `/offline-academy` | Can I learn here in person? | Real salon image, teacher, counselling explanation, short enquiry form and FAQs | Request counselling |
| `/about` | Who is teaching me? | Sunita’s sourced professional profile and portfolio | Discuss a course |
| `/pricing` | What is my investment? | Comparable course cards and listed prices; offline fees by counselling | Open relevant course |
| `/contact` | Can I reach a real person? | Confirmed phone/WhatsApp, neighbourhood and visit-planning guidance | Call or WhatsApp |
| `/thank-you` | What should I do after an enquiry? | Continue the conversation and share preferred timings | Continue on WhatsApp |
| `/terms`, `/privacy`, `/refund-policy` | What terms apply? | Existing supplied policy pages retained | Read and resolve terms before payment |

Policy text remains supplied project content, not independently validated legal terms. Outstanding placeholders and business decisions still require owner review before paid launch.

## Homepage: full scroll sequence

1. **Recognition.** Real bridal work occupies the visual focus. A short heading and Hindi/Hinglish explanation establish the beauty-learning category. Two actions serve visitors ready to explore and visitors needing guidance.
2. **Orientation.** A compact strip identifies language and learning location. No fabricated learner counts, current ratings or accreditation logos.
3. **Course choice.** Three distinct options: specialist online course, one-day session and in-person academy. Each names its purpose and routes to relevant details. Prices appear before the handoff.
4. **Teacher trust.** A real portrait, professional specialities, diploma and languages ground the academy in a person. No unconfirmed years-of-experience or student-count claims.
5. **Work quality.** Three real portfolio photographs show craft. The gallery explicitly identifies professional work rather than implying it is learner output.
6. **Social evidence.** Three original dated Justdial client reviews. Their original listing and service context are disclosed. They are not presented as reviews of either course.
7. **Joining process.** Choose a direction, obtain the full details, then join after understanding the terms.
8. **Objections.** Beginner fit, online versus offline, payment questions, access/certificate questions and realistic expectations.
9. **Final invitation.** Course-selection conversation, with a route back to fee comparison.

## Course page: full scroll sequence

| Order | Section | Decision it supports |
|---|---|---|
| 1 | Course-specific hero, listed fee and enquiry | Am I in the right place, and can I afford to explore this? |
| 2 | Short section navigation | Can I jump to the information I care about? |
| 3 | Intended learner and learning goals | Is this relevant to my starting level? |
| 4 | Expandable learning outline | What topics are proposed, and what must I confirm? |
| 5 | Teacher profile | Who will guide my learning? |
| 6 | Attributed client reviews | Is there evidence of care and professional service? |
| 7 | Joining process | What happens after I ask? |
| 8 | Fee panel and pre-enrolment questions | What will I be paying for? |
| 9 | FAQs and reachable support | Can I resolve the remaining uncertainty? |

A mobile bottom action appears after the hero and hides when the enrolment section, footer or form inputs are active. It offers an enquiry, not a false checkout.

No real Hydra Facial demonstration was identifiable among the inspected selected assets. The Hydra page uses a clearly captioned salon photograph, not a falsely labelled treatment demonstration. Replace it with an approved Hydra teaching clip or image as the highest-priority visual improvement.

## Why this structure may persuade

These are design hypotheses to validate, not a guarantee of conversion:

- **Message continuity:** the ad and landing page name the same course, learner and goal.
- **Concrete information:** curriculum, format, equipment and terms reduce uncertainty more reliably than vague promises of success.
- **A visible teacher:** a real person, sourced background and work give visitors information to assess competence.
- **Contextual proof:** genuine, attributed reviews support a narrower claim than invented learner testimonials.
- **Clear investment:** a visible listed fee helps visitors self-select; the final payable amount must be confirmed before payment.
- **Low effort:** short mobile forms, useful anchors, readable text and one relevant enquiry reduce unnecessary steps.
- **Honest next steps:** visitors know they are beginning a WhatsApp conversation and that a seat is not yet confirmed.

Do not use rolling countdowns, invented seat counts, unsupported income claims, crossed-out fake prices or badges that imply accreditation.

## What the competitor research actually established

[MasterClass: Bobbi Brown, Makeup and Beauty](https://www.masterclass.com/classes/bobbi-brown-teaches-makeup-and-beauty) visibly combines a named expert, trailer, specific skills, lesson information and a purchase proposition. Feminy adopts the clarity of teacher, topic and offer. It does not copy the subscription, guarantee or lesson totals.

[BBC Maestro: courses](https://www.bbcmaestro.com/courses) explains course formats, notes, access periods, purchase versus membership and guarantee questions. Feminy adopts the principle of answering purchase questions. Its terms must come from the academy rather than borrowing BBC Maestro’s policies.

These pages demonstrate presentation patterns. Their private conversion rates, campaign economics and causal results were not available. The design is not a claim that copying those patterns will reproduce their performance.

## Instagram campaign and measurement workflow

Start with separate ad groups for Hydra Facial, the one-day session and offline counselling. Keep language and promises consistent across the creative and destination. Do not start all three with a large budget; verify the full handoff and lead quality first.

Recommended destination example:

`/courses/hydra-facial?utm_source=instagram&utm_medium=paid_social&utm_campaign=hydra_launch&utm_content=teacher_demo&lid=hydra_reel_01`

Use a meaningful creative identifier rather than personal information in URL parameters. Current tracking recognises Meta links, Instagram/Facebook paid-source combinations, reference IDs and Facebook click IDs. Attribution survives internal navigation. A WhatsApp message includes the selected course and available reference ID.

| Signal | Meaning | Do not interpret as |
|---|---|---|
| PageView | A page was viewed | A qualified person |
| ViewContent | A course page was viewed | Course intent proven |
| FAQ/curriculum open | A question was expanded | A sale |
| CTA/Contact | Someone tapped WhatsApp | Message sent or received |
| Lead | A valid enquiry reached at least one configured durable store | Payment |
| Purchase | Future: trusted, verified successful payment | A return URL or thank-you visit |

Meta Pixel, GA4 and Conversions API require real deployment configuration. Code hooks and regression checks do not establish that the live advertising account receives events. Verify with the relevant platforms before using their data to optimise spend.

Track paid enrolments alongside spend. The important business figures are cost per qualified conversation, conversation-to-paid rate, cost per paid enrolment and revenue after refunds. A low click cost alone is insufficient. Test one material change at a time and segment results by course and creative.

## Academy handoff and follow-through

Assign one person to respond to course enquiries. Agree internally on an achievable response window before displaying one on the site. Ask about the learner’s goal, experience, available equipment and preferred timing. Then send one accurate course summary covering syllabus, date, duration, language, format, access, support, kit, certificate, total fee and refund terms.

After the learner agrees, use the academy’s authorised payment process. Verify payment before issuing confirmation. Provide a receipt, access instructions and a first task. Record support ownership, class links and completion criteria in the course platform. Request feedback only after the learner has meaningful experience; obtain permission to display their name, media and exact statement.

## Launch dependencies and priorities

**Before sending paid traffic:** confirm course products and fees, publish the approved terms, connect a real lead destination, configure tracking, verify the WhatsApp inbox and test the enquiry handoff on an actual phone.

**Most valuable missing proof:** a course-specific demonstration, current learner feedback with consent, representative practice work with provenance and a concrete assessment/certificate example. The 2017–2018 salon reviews are supplementary proof, not a replacement for learner evidence.

**Before direct checkout:** choose a payment provider and teaching platform; store server-side product/price information; verify webhook signatures; make webhook processing idempotent; provision access after confirmed payment; handle cancelled, pending, duplicate and failed payments; provide recoverable access and support. Do not implement a simulated payment page.

**Before a learner portal:** decide whether a hosted teaching platform already satisfies login, protected lessons, progress, support and certificates. Building a custom learning system is unnecessary unless existing products fail a real requirement.

## Implementation and handover

The updated website lives in the `website` directory in this workspace. The original Desktop project was not edited. Existing Next.js, React, TypeScript and npm architecture is retained. Shared sales components keep the two course pages consistent. Source facts and commercial copy are separated from rendering. Existing lead storage and server-side conversion code are retained.

Run `npm ci` in an independent copy, then `npm run build` and `npm start`. The workspace currently reuses the original project’s installed dependencies through a local link; the source archive excludes that link, dependencies, build output and repository metadata.

The build checks rendered pages for placeholder leaks and unverified claims. `node scripts/check-sales-behavior.mjs` exercises paid attribution, reference persistence, the correct WhatsApp destination and deferred analytics delivery. See `VERIFICATION.md` for the actual checks and limitations from this run.

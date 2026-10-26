# Disclosure of AI tool use

The hackathon rules allow AI tools as assistants, provided their use is disclosed and the team takes full responsibility for the work. This page lists where AI was used.

| Part of the project | AI tool used | How it was used |
|---|---|---|
| Choosing the problem, data sources and approach | Claude (Anthropic) | Suggested the district-targeting framing for Track 2 and helped locate the NISR sources; the team chose the track and project |
| Analysis code (`analysis/`) | Claude (Anthropic) | Helped write and test the index, robustness, clustering, rank-uncertainty and model-check scripts; the team wrote some parts of the index and tested it  |
| Web app (`app/`) | Claude (Anthropic) | Helped write the evidence charts, overlap map, planning lenses and the "Why this score?" breakdown; the team the interface, shareable links and checked chart colours with a colour-blindness validator |
| Interface text in Kinyarwanda and French | Claude (Anthropic) | Drafted translations;|
| Documentation (`README.md`, `docs/`) | Claude (Anthropic) | Drafted and edited the documents from the project's own data and code |
| Verification of the code | Claude (Anthropic) | Ran the app in a browser, rebuilt the data tables and checked that the figures reproduce |
| AI assistant inside the app | None at run time | The team's own on-device model: `train_assistant.py` trains a Naive Bayes question classifier; answers and briefing notes are computed from the district table in the browser. No external AI service is called |

## What the team did

Ntawusigara is the team's project. The team chose Track 2 and the idea of showing where poverty and financial exclusion overlap by district, and built the first working version of the tool, which was already deployed at ntawusigara.vercel.app before the later improvements listed above. Working with the AI assistant, the team then:

- set the goals for each round of improvement, using the NISR hackathon rules, judging criteria and preparatory webinar, and sent the assistant the competition documents;
- reviewed the assistant's changes and rejected the ones that replaced the team's original logic, so that improvements were added to the team's work and did not replace it;
- chose which data sources to use and asked for them to be checked against the published NISR material;
- tested the live app, deployed it on Vercel, fixed the deployment settings, and published the code on GitHub;
- decided what to keep, what to describe as a limit, and what to claim in the presentation.

The assistant wrote and edited much of the code and the documents under the team's direction, as the table above shows. The French text still needs review by native speakers.

**Statement:** We have read, tested and understand the code and analysis in this repository, and checked the figures against the original NISR publications. We take full responsibility for the submitted work.

TUYISINGIZE Devotha, SEBAGENI ISANGE Aimee Kevine, date: 22 october 2026

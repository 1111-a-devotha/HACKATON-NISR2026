# Disclosure of AI tool use

The hackathon rules allow AI tools as assistants, provided their use is disclosed and the team takes full responsibility for the work. This page lists where AI was used. **Both team members must read it, correct anything that is not accurate, and then sign at the bottom before submission.**

| Part of the project | AI tool used | How it was used |
|---|---|---|
| Choosing the problem, data sources and approach | Claude (Anthropic) | Suggested the district-targeting framing for Track 2 and helped locate the NISR sources; the team chose the track and project |
| Analysis code (`analysis/`) | Claude (Anthropic) | Helped write and test the index, robustness, clustering, rank-uncertainty and model-check scripts |
| Web app (`app/`) | Claude (Anthropic) | Helped write the interface, evidence charts, overlap map, shareable links, planning lenses and the "Why this score?" breakdown; checked chart colours with a colour-blindness validator |
| Interface text in Kinyarwanda and French | Claude (Anthropic) | Drafted translations; **a native speaker must review them** |
| Documentation (`README.md`, `docs/`) | Claude (Anthropic) | Drafted and edited the documents from the project's own data and code |
| Verification of the code | Claude (Anthropic) | Ran the app in a browser, rebuilt the data tables and checked that the figures reproduce |
| AI assistant inside the app | None at run time | The team's own on-device model: `train_assistant.py` trains a Naive Bayes question classifier; answers and briefing notes are computed from the district table in the browser. No external AI service is called |

## What the team did

*(Team members: replace this paragraph with what you actually did, for example: chose the track and the districts-overlap idea; requested and checked data; reviewed and tested the code and each figure against the NISR publications; had the Kinyarwanda and French text reviewed by whom; tested with whom. Do not leave claims that are not true.)*

**Statement:** We have read, tested and understand the code and analysis in this repository, and checked the figures against the original NISR publications. We take full responsibility for the submitted work.

TUYISINGIZE Devotha, SEBAGENI ISANGE Aimee Kevine, date: ____________

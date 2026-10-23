# Disclosure of AI tool use

The hackathon rules allow AI tools as assistants, provided their use is disclosed and the team takes full responsibility for the work. This page lists where AI was used. **Both team members must read it, correct anything that is not accurate, and then sign at the bottom before submission.**

| Part of the project                  | AI tool used       | How it was used                                                                                                                                                                                                 |
| ------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Analysis code (`analysis/`)          | Claude (Anthropic) | Helped write and test the clustering, rank-uncertainty and model-check scripts                                                                                                                                  |
| Web app (`app/`)                     | Claude (Anthropic) | Helped write the charts, overlap map, planning lenses and the "Why this score?" breakdown; checked chart colours with a colour-blindness validator                                                              |
| Documentation (`README.md`, `docs/`) | Claude (Anthropic) | Drafted the documents from the project's own data and code                                                                                                                                                      |
| Verification of the code             | Claude (Anthropic) | Ran the app in a browser, rebuilt the data tables and checked that the figures reproduce                                                                                                                        |
| AI assistant inside the app          | None at run time   | The team's own on-device model: `train_assistant.py` trains a Naive Bayes question classifier; answers and briefing notes are computed from the district table in the browser. No external AI service is called |

## What the team did

**Statement:** We have written, read, tested and understand the code and analysis in this repository, and checked the figures against the original NISR publications. We take full responsibility for the submitted work.

TUYISINGIZE Devotha, SEBAGENI ISANGE Aimee Kevine, date: 23rd october 2026

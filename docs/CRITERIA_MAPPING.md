# Judging criteria mapping

The competition scores five criteria at 20 points each (source: NISR 2026 Hackathon Competition page). This table shows the evidence in the repository for each, and the honest weak spots.

| Criterion | Evidence in Ntawusigara | Weak spots to be ready for |
|---|---|---|
| **1. Problem understanding and relevance** (NST2 / Vision 2050) | Track 2 framed as a decision problem (docs/PROBLEM_AND_SOLUTION.md); districts where poverty and finance gaps overlap; NST2 priority areas 3.9 and 4.4 mapped in docs/NST2_ALIGNMENT.md; four planning lenses for the real users (LODA, MINECOFIN, BNR, SACCOs, NGOs) | No numeric NST2 targets are used because none were available to us |
| **2. Data use and methodology** | Three NISR sources joined with a 1:1 check; census totals reconcile to 13,246,394; robustness over 10,000 random weightings; rank uncertainty from 1,000 survey-error simulations; leave-one-out test of district prediction with a **reported negative result**; documented limitations (docs/METHODOLOGY.md) | FinScope district values read from a chart; effective sample size of 250 is an assumption; microdata not used |
| **3. Tech innovation** | Rank-uncertainty ranges, not just ranks; robustness test; planning lenses; per-district score breakdown; a targeting-reach chart that measures how many poor people and adults outside formal finance a ranking reaches against poverty rate alone and random choice; a consensus list across five planning lenses; works offline and installs as an app (service worker); round-to-round change detector that separates real change from sampling noise; on-device trilingual question-answering model trained by the team; offline and static (no key, no server, no cost); shareable URLs | The assistant is a classifier with templates, not a general language model (by design: it cannot invent numbers) |
| **4. Usability and design** | Three languages; map, ranking, five linked charts; one-click lenses and sliders; keyboard access and tooltips; PNG, CSV and A4 report exports; mobile layout (no horizontal scroll at 390 px); start-here steps for first-time users; dark mode; noscript fallback | Kinyarwanda and French text should be reviewed by native speakers; test with a real planner before the final round |
| **5. Tangible impact** | Coverage planner (people and cost per person); briefing notes and one-page reports for district meetings; "What changed?" for EICV8 and the next FinScope; open data under CC BY 4.0; named users and uses (docs/PROBLEM_AND_SOLUTION.md section 4) | No pilot with an institution yet; impact is potential, not measured |

<<<<<<< HEAD
## Submission checklist (competition rules and the NISR preparatory webinar)

Deadline: **30 October 2026**, as a public GitHub link, a deployed app link and documentation.

Repository must contain (webinar slide 12):
- [x] README: what data is used, what it communicates, how users interact (done, README.md)
- [x] Script(s) that run on any machine (app is static, `python -m http.server -d app`; analysis needs `pip install -r analysis/requirements.txt`)
- [x] Screen-recording video, .webm or .gif, up to 3 minutes, not recorded on a phone (`demo/demo.webm`, 1 min 44 s)
- [x] Data file(s) and a link to the data (`data/`; source links in docs/DATA_SOURCES.md)

Deployed app (slide 11):
- [x] Publicly accessible (https://ntawusigara.vercel.app), no login, so no credentials are needed

Still for the team:
- [ ] Public GitHub link added to README and the repository set to Public
- [ ] Registered by 20 October 2026 (team of 2 students, at least one Rwandan; student cards ready)
- [ ] AI-use disclosure completed truthfully and signed by both members (docs/AI_DISCLOSURE.md)
- [ ] Data values checked against the NISR publications (docs/DATA_SOURCES.md checklist)
- [ ] Neither member is a past 1st to 3rd place winner of the NISR Big Data Hackathon
- [ ] Understood that IP in the submission transfers to NISR
- [ ] Open the live link and the GitHub link in a private window one last time before submitting

Plagiarism rule (slide 8): the README carries the originality declaration; every source is listed in docs/DATA_SOURCES.md. Failure to acknowledge sources means disqualification.
=======
## Submission checklist (from the competition rules)

- [ ] Registered by **20 October 2026, 11:59 PM** (team of exactly 2 students, at least one Rwandan citizen, student cards available)
- [ ] Public GitHub link added to README
- [ ] Deployed app link works (https://ntawusigara.vercel.app)
- [ ] Documentation in the repository (README and docs/)
- [ ] AI-use disclosure completed truthfully and checked by both team members (docs/AI_DISCLOSURE.md)
- [ ] Declaration that the work is original, never submitted elsewhere, and sources are acknowledged (README, data sources)
- [ ] Neither team member is a past 1st to 3rd place winner of the NISR Big Data Hackathon
- [ ] Submitted by **30 October 2026, 11:59 PM**
- [ ] Understood that IP in the submission transfers to NISR
>>>>>>> cd6c77501325c5a143462888f697995d1624f099

# Roadmap

## Before submission (deadline 30 October 2026, 11:59 PM)

| By | Task |
|---|---|
| 15 Oct | Push to a public GitHub repo, add the link to the README, redeploy |
| by 20 Oct, 11:59 PM | **Register the team** (two students, at least one Rwandan citizen, student cards ready) |
| by 20 Oct | Verify all district values against the reports (docs/DATA_SOURCES.md checklist) |
| by 22 Oct | Native-speaker review of the Kinyarwanda and French text; test with a SACCO or district planner; request EICV7 and FinScope microdata if not yet requested |
| 25 Oct | Phase 2 model if microdata arrived (below) |
| 28 Oct | Both team members read and sign the AI disclosure; final README; demo video |
| 30 Oct, 11:59 PM | **Submit** (GitHub link, deployed link, documentation) |

## Phase 2: household-level model (if EICV7 microdata is granted)

1. Train a poverty classifier (logistic regression and gradient boosting) on EICV7 households using variables NISR itself uses to model poverty: household head education, household size, housing materials, electricity, assets, savings account, mobile money account, district.
2. Report cross-validated accuracy and calibration by district, with survey weights.
3. Add a "what-if" panel: estimated change in district poverty risk if, for example, savings account ownership among poor households rose to the non-poor level (53% to 74% of households in EICV7). Label results as associations, not causal effects.
4. If FinScope microdata is granted, replace chart-read district values with weighted estimates and confidence intervals.

## After the hackathon

- Sector-level targeting using census microdata and small-area estimation
- Overlay of SACCO and agent locations from the National Bank
- Updates when EICV8 (2026/27) and FinScope 2028 are released

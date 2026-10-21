# The problem and our solution, in plain language

## 1. The problem

Rwanda has made real progress. Poverty fell from 39.8% (2017, modelled) to 27.4% (2024, EICV7), and 92% of adults now use a formal financial service (FinScope 2024). But a national average hides where people are still being left behind, and two programmes aimed at the same people often do not reach the same places.

Three facts from the data show the gap:

1. **Poverty is very uneven.** District poverty runs from 6.8% (Nyarugenge) to 51.4% (Nyamagabe). About 3.6 million people are below the poverty line, and they are not spread evenly. In some districts poverty barely moved since 2017 (Nyanza fell 3.6 points, Ngoma 3.1, against 12.4 nationally).
2. **"Financially included" is wide but shallow.** Most adults are counted as formally served because of mobile money and Umurenge SACCOs. But in poor districts as few as 6% to 11% of adults have a bank account, and in some districts up to 18% of adults rely only on informal finance or nothing.
3. **The evidence is scattered.** Poverty comes from EICV7, financial access from FinScope, and population from the Census. A planner at MINECOFIN, MINALOC/LODA, the National Bank, a SACCO or an NGO has to join three reports by hand, and none of them says "where do both problems meet?".

**The decision problem:** with limited money, which districts should get social protection and financial-inclusion support first, and how sure can we be?

## 2. Our solution

Ntawusigara ("no one is left behind") is a free, offline-capable web tool that joins the three NISR sources for all 30 districts and answers that question.

| Step | What the tool does | Why it matters |
|---|---|---|
| 1. Combine | Puts poverty, finance access and population on one map and table | Removes the manual joining |
| 2. Score | Builds a 0 to 100 priority index from five indicators (poverty rate, number of poor people, adults not formally served, unbanked adults, slow poverty reduction) | One comparable number per district |
| 3. Let users decide | Sliders and four "planning lenses" change the weights | Weights are a value judgement, not a fact; a social-protection planner and a SACCO manager care about different things |
| 4. Be honest about certainty | Shows a likely rank range for every district and tests 10,000 random weightings | Survey estimates have sampling error; the leading districts are a priority *group*, not a strict order |
| 5. Explain | "Why this score?" breakdown, district profile, options to consider, briefing note, one-page A4 report | Turns a number into something a district meeting can use |
| 6. Plan | Coverage planner shares a programme's reach across districts in proportion to the poor | Moves from "where" to "how many people" |
| 7. Keep up to date | "What changed?" loads the next EICV or FinScope round and flags changes larger than sampling error | Still useful after the hackathon |

It works in Kinyarwanda, English and French, and the AI assistant runs in the browser, so numbers cannot be invented.

## 3. What it found

- **Gisagara** is the clearest priority (top 5 in 81% of simulations), then Nyanza, Nyamasheke, Nyaruguru and Ngoma (the "robust top 5" across 10,000 weightings).
- **The leading districts are a group, not a ladder.** The top six all have likely ranks spanning roughly 1 to 12. This is a finding in itself: a ranking that looks exact would mislead planners.
- **Different lenses give different answers.** Under a financial-inclusion lens Nyaruguru, Ngoma, Gisagara, Gicumbi and Kayonza lead; under the default balanced lens it is Gisagara, Rusizi, Nyanza, Nyamasheke and Nyamagabe. That is why the tool lets users choose.
- **Consensus districts.** Across five planning lenses, Gisagara reaches the top 5 in four, and Nyamagabe, Nyanza and Rusizi in three. These are the safest first choices.
- **Targeting works better than guessing.** The top 10 districts reach 50% of poor people (random choice: 33%) and 39% of adults outside formal finance (poverty rate alone: 35%).
- **Poorer districts tend to have fewer banked adults** (Spearman rho = -0.38, p = 0.038), but the link is moderate and is not proof of cause.
- **Four districts form the "stalled progress" group** (Nyanza, Ngoma, Burera, Rwamagana): poverty fell by under 6 points since 2017, against 12.4 nationally.
- **Scale matters.** Nyagatare, Rusizi and Rubavu each have over 200,000 poor residents, so a small share of them is still a very large number of people.

## 4. Who uses it, and how

| User | Question | Where in the tool |
|---|---|---|
| MINECOFIN, MINALOC, LODA | Where should social protection expand? | "Social protection" lens, coverage planner |
| National Bank, SACCO unions, mobile money providers | Where are adults outside formal finance in poor districts? | "Financial inclusion" lens, finance charts |
| District officials | What is the picture for our district? | District profile, briefing note, A4 report |
| NGOs and donors | Where did progress stall, and where do they overlap? | Overlap map, "Where progress stalled" lens |
| NISR | What changes after the next survey? | "What changed?" comparison |

## 5. What the tool does not claim (say this before a judge asks)

- It shows **where gaps overlap, not why**. Correlation is not cause.
- It works at **district level**. Poverty varies a lot inside districts, so the next step is sector-level targeting.
- District survey estimates carry **sampling error**. NISR's standard errors were not in the files we had, so we assume an effective sample of 250 per district and say so. Real standard errors drop in automatically when added.
- The **FinScope district values were read from a published chart** (Figure 13), not from microdata. Verifying them is the first roadmap item.
- We **tested district-level prediction and rejected it**: with 30 districts, most models did no better than guessing the average. Honest negative results are in the methodology.
- "Options to consider" are **discussion prompts**, not evaluated programmes.

## 6. Three-minute demo script

1. **(20 s) Problem.** "Poverty is 27% nationally but 7% to 51% by district, and finance inclusion is 92% on paper but shallow in poor districts. No single report shows where both gaps meet."
2. **(30 s) Map.** Show the priority map, then switch to the overlap map. "The dark corner is the double gap: 10 districts holding 41% of Rwanda's poor."
3. **(40 s) Lenses.** Click Social protection, then Financial inclusion. "Same data, different planners, different top five. Weights are a judgement, so we let the user make it, and we show which districts hold up under 10,000 random weightings."
4. **(30 s) Honesty.** Point to "likely rank 1 to 9". "Survey data has error. We show it. The leading districts are a priority group."
5. **(30 s) District.** Open Gisagara or Nyanza. Show "Why this score?" and options. Click "Write a briefing note" (switch to Kinyarwanda).
6. **(20 s) Plan.** Coverage planner: "50,000 people to reach: here is how to share them."
7. **(10 s) Close.** "Free, static, works offline, three languages, ready for EICV8. Ntawusigara: no one is left behind."

## 7. Likely judge questions

- **Why these five indicators?** They cover the two halves of Track 2 (poverty: rate, scale, progress; inclusion: not formally served, unbanked), all from NISR data. Users can reweight or zero any of them.
- **Isn't a ranking of 30 districts too coarse?** Yes, and we say so. It tells programmes where to look first; sector-level work comes next (roadmap).
- **Why no machine-learning prediction?** We tested it at district level and it did not beat the baseline reliably (docs/METHODOLOGY.md, section 7). Household-level modelling is ready for EICV7 microdata.
- **Is the AI assistant a risk?** It is a small classifier trained by the team that runs in the browser. It computes answers from the district table, so it cannot invent figures; it refuses off-topic questions.
- **What if the data changes?** Load the new round as CSV; the tool flags changes larger than sampling error and shows how the ranking moves.
- **What is the real impact?** Better targeting of the same budget, a shared evidence base for social protection and financial inclusion teams, and a transparent method others can audit.

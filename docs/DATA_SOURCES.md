# Data sources

1. National Institute of Statistics of Rwanda (2025). *Seventh Integrated Household Living Conditions Survey (EICV7): Poverty Profile Thematic Report 2023/24.* Annex B: Headcount poverty rate in 2024 (actual) and 2017 (modelled) by district. https://www.statistics.gov.rw/sites/default/files/documents/2025-07/EICV7_Poverty%20Profile.pdf

2. Access to Finance Rwanda, with MINECOFIN, the National Bank of Rwanda and NISR (2024). *Rwanda FinScope Survey 2024.* Figure 13: Financial access strand by district. https://statistics.gov.rw/sites/default/files/documents/2024-09/Rwanda-Finscope-2024-Report_compressed.pdf

3. National Institute of Statistics of Rwanda (2023). *Fifth Rwanda Population and Housing Census 2022.* Resident population by residence, province and district. https://statistics.gov.rw/statistical-publications/population-size-and-population-characteristics

4. District boundaries: Rwanda district boundaries GeoJSON (DLUP source), simplified and projected to SVG paths for the app.

NISR data and analysis are licensed under Creative Commons Attribution 4.0 International.

## Verification checklist

Not yet completed. The team must tick these before claiming the figures were checked; the EICV7 Annex B table could not be read automatically while preparing this version.

- [ ] Poverty rates match EICV7 Annex B for all 30 districts
- [ ] FinScope access strand values checked against the report figure (and microdata if access is granted)
- [ ] Census populations sum to 13,246,394
- [ ] District boundary source confirmed and credited


## Optional columns

- `poverty_2024_se` in `eicv7_district_poverty.csv`: standard error of the 2024 district poverty rate, in percentage points, if available from NISR.
- `finscope_n` in `finscope2024_district_access.csv`: FinScope 2024 sample size (adults) per district.

When present, these replace the default effective sample size (250) in the rank-uncertainty and round-comparison calculations.


## Added 26 October 2026

| Data | Source | Use | File |
|---|---|---|---|
| Active mobile money agent outlets, and per 100,000 adults, Rwanda, 2011 to 2024 | IMF Financial Access Survey, via FRED series [RWAFCMOANUM](https://fred.stlouisfed.org/series/RWAFCMOANUM) and [RWAFCMOAANUM](https://fred.stlouisfed.org/series/RWAFCMOAANUM) | "National context" chart. National only; it does not enter the district index or ranking | `data/raw/imf_mobile_money_agents.csv`, `app/ntw-context.js` |


**Not used:** EICV7 and FinScope household microdata (portal access not obtained), CPI series. The household model in `analysis/train_poverty_model.py` is ready for the microdata but has not been run on it.


## Verification done on 22 October 2026

- **FinScope 2024 "excluded" by district:** all 30 values in `data/raw/finscope2024_district_access.csv` were compared with the "Financial Exclusion by District" slide of the official FinScope 2024 presentation on the NISR microdata portal (https://microdata.statistics.gov.rw/index.php/catalog/120/download/1089). All 30 match. The slide text is machine-extracted, so the team should still glance at the slide itself.
- **Still unverified:** the `banked`, `other_formal_only` and `informal_only` columns (the slide's "Financial Inclusion Strand by District" numbers could not be matched reliably from the extracted text), and the EICV7 poverty and Census 2022 values. Check these against the originals and tick them here.
- **Sample size:** FinScope 2024 interviewed 13,994 households, about 400 per district (range 399 to 848); see `data/raw/finscope2024_district_sample.csv` (source: variable A2, FinScope 2024 data dictionary on the microdata portal). The rank-uncertainty simulation assumes an effective sample of 250 per district, which allows for survey design effects on about 400 households. That is a modelling assumption, not a published figure.


## Added 22 October 2026 (second update): VUP

| Data | Source | Use | File |
|---|---|---|---|
| VUP households and people in VUP households by province, EICV7 2023/24; 41% of VUP beneficiaries are poor | NISR, EICV7 Thematic Report: VUP 2025, Table 2.1 (p. 18) and Figure 3.1 (p. 23), https://microdata.statistics.gov.rw/index.php/catalog/121/download/1095 | "Social protection" section: people in VUP households per 100 poor people, by province. Not used in the district index | `data/raw/vup_province_eicv7.csv`, `app/ntw-vup.js` |

The report gives no district tables and no impact estimates, so the section describes coverage only. "About 650,000 poor people in VUP households (about 18% of all poor people)" is our own derivation: 41% of 1,591,579 people, divided by our estimate of 3,629,696 poor people. It assumes the 41% applies to people in VUP households.

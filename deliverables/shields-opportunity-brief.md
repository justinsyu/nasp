# Shields Health Solutions: HEOR Opportunity Brief

Prepared for internal use by an HEOR consulting firm serving health-system specialty pharmacy (HSSP) organizations. Customer of record for all proposals below is the **health system**, not payers, pharmacy benefit managers (PBMs), or pharmaceutical manufacturers. Where Shields' own assets are framed for a payer audience, those framings are noted only to be re-pointed toward health-system decisions.

Grounding corpus: 49 PDFs and 103 HTML pages in `C:\Users\Justin\Desktop\nasp\hssp_research_downloads\Shields`. Ten high-signal research assets were read in full for methodological assessment (Optum/AMCP cost poster; 2025 clinical-interventions white paper; 2024 clinician-utilization white paper; accreditation-restricted LDD revenue poster; oncology coverage-outcomes poster; Spartanburg NPS poster; diabetes white paper; oral oncolytic waste poster; PDC-benchmark poster; SDOH white paper; cost-of-care white paper), supported by the JAMA Network Open 2020 UMass Memorial press page.

---

## 1. Research approach snapshot

Shields is the most evidence-mature organization in this prospect set. It operates a repeatable evidence engine spanning a peer-reviewed claims study (Soni et al., JAMA Network Open 2020, UMass Memorial; Hellems et al., JMCP 2022), a multi-health-system actuarial cost analysis with Optum (CMS-HCC (Hierarchical Condition Categories) risk-adjusted total cost of care, 13% reduction, p=0.03), conference posters across at least eight disease states, disease-state and topical white papers, and a network outcomes report at scale (more than 2 million patients, 50-plus disease states, nearly 80 health systems).

Genuine strengths that should not be re-proposed are:

- Network-scale benchmarking infrastructure (a proportion of days covered (PDC) dashboard with therapeutic-class thresholds).
- A standardized care-model metric set (PDC, time to therapy, copay, Net Promoter Score (NPS), Average Provider Score, intervention acceptance rate).
- A documented cost-avoidance methodology with literature-anchored unit costs.

The remaining opportunity is not generating more evidence. It is raising the causal rigor of the existing descriptive and pre-post assets and re-pointing several outputs from a payer or generic-savings frame toward specific health-system decisions (build, expand, retain, optimize).

---

## 2. Quality-enhancement opportunities

| Asset (file) | Observed methodological weakness | Specific HEOR upgrade | Why it strengthens the health-system case |
|---|---|---|---|
| `SHS-Optum-AMCP-Poster.pdf` (total cost of care, Medicare Advantage (MA) cohort) | Treatment and benchmark groups are severely imbalanced (2019 N=197 vs N=8,824). They are also assigned by observed pharmacy use, so selection into HSSP use is uncontrolled. Risk adjustment is limited to a single CMS-HCC score divisor. There is no covariate balance table, no propensity-score matching, only two-tailed t-tests on means, a single follow-up year, no outlier handling (self-flagged), and MA-only generalizability (self-flagged). | Re-estimate with propensity-score or entropy-balancing matching on demographics, disease state, baseline utilization, and baseline cost. Add a difference-in-differences (DiD) specification using the 2018 baseline and 2019 follow-up already in hand, and report a covariate balance table (standardized mean differences), effect sizes with confidence intervals, and sensitivity analyses (outlier trimming, alternative risk-adjustment, falsification window). Extend to additional follow-up years as recommended in the poster's own next steps. | Converts an association into a defensible quasi-experimental estimate. A CFO or board evaluating a multi-million-dollar HSSP build will discount an unmatched 197-vs-8,824 comparison; a matched DiD with stated assumptions is the standard those audiences already apply to other capital decisions. |
| `Shields_WP_2025_Clinical-Interventions_10.14.25.pdf` and the cost-avoidance figures it cites ($75M over three years; $150M network 2024; $1,200 per member per month (PMPM)) | Cost avoidance is computed by an internal proprietary algorithm that assigns literature-derived unit costs to each accepted intervention, with no counterfactual (no comparison of intervened versus non-intervened participants) and no validation against realized claims. Acceptance rate (91%) measures provider agreement, not averted events. | Build a counterfactual-anchored cost-avoidance model: match intervened participants to non-intervened or pre-intervention participants and measure observed differences in emergency department (ED) visits, admissions, and total medical spend, rather than summing assumed unit costs. Publish the unit-cost crosswalk and a probabilistic sensitivity analysis so the headline figure carries a range, not a point estimate. | Health-system finance teams reconcile claimed savings against their own ledgers. A counterfactual-based, claims-validated estimate survives that reconciliation; an algorithmic sum of avoided-event list prices does not, and over-claiming erodes trust in the rest of the portfolio. |
| `ASHP-Poster-Pharmacist-Impact-on-Coverage-Outcomes-in-Oncology-REFRESHED-2025_FINAL.pdf` (prior authorization (PA) and appeal approval, pre vs post ACP) | Single health system (six NY clinics); asymmetric observation windows (Pre-ACP September 2020 to May 2021, roughly 9 months, vs Post-ACP June 2021 to December 2024, roughly 31 months); no statistical test reported on the approval-rate deltas; no adjustment for secular change in payer PA policy or drug mix over a 4-year span; denominators differ markedly (724 vs 3,381 PAs). | Apply an interrupted time series (ITS) design with monthly PA and appeal approval rates so the pre/post step change is separated from underlying trend; add segmented regression with confidence intervals; adjust for or stratify by drug class and payer to rule out case-mix drift. Where feasible, add a contemporaneous non-ACP comparison clinic. | Time to therapy and access are the metrics service-line chiefs and ambulatory operations leaders use to justify embedding a pharmacist. An ITS result that controls for secular PA trends is materially harder to attribute to anything other than the intervention. |
| `Revenue-and-Patient-Volume-Associated-with-Accreditation-Restricted-LDDs-in-HSSP_FINAL.pdf` | Purely descriptive cross-section (35 pharmacies, 25 LDDs, CY2023-24 weighted averages). The authors explicitly note no pre/post-accreditation comparison, no counterfactual, and no stratification by accreditation type or payer network. No statistical testing. | Construct the pre/post-accreditation analysis the authors call for: an interrupted time series or staggered-adoption difference-in-differences across sites by accreditation date, estimating the incremental fills, patients served, and revenue attributable to accreditation, with case-mix adjustment. | Accreditation is a discrete, fundable decision for pharmacy leadership and finance. A causal estimate of the volume and revenue unlocked per accreditation, rather than a static 9.4%-of-revenue snapshot, directly sizes the return on that decision. |
| `NASP-2024-NPS-Spartanburg-Poster-FINAL.pdf` (single-site NPS quality-improvement (QI) trend) | Single-site uncontrolled pre-post time series; response rates 12-19% with 50-129 respondents per year and no nonresponse-bias assessment; no statistical test on the trend; QI activities not linked to specific score movements; the National Association of Specialty Pharmacy (NASP) benchmark is a fixed external line, not a matched comparator. | Add nonresponse-weighting or comparison of respondents vs the served population; test the trend (e.g., regression on survey wave with confidence intervals); where multiple Shields sites ran comparable QI, pool them into a multi-site mixed-effects model so the network can state an average effect with between-site variation rather than one site's trajectory. | Quality and accreditation leaders need to know an experience gain is real and reproducible across sites, not a single high-performing site. A multi-site model converts an anecdote into a transferable expectation. |
| `Shields_WP_Diabetes_102022.pdf` and disease-state posters generally (e.g., `Shields-Poster-NASP-2023-DM-Outcomes_FINAL.pdf`, `Shields-Outcomes-RA-1.pdf`) | Headline outcomes (94% PDC, $10 copay, 2-day time to therapy, 0.7-1.0 hemoglobin A1c (HbA1c) reduction; Care Coach 1.6-2.3 HbA1c) are reported without denominators, cohort/eligibility definitions, index dates, follow-up windows, baseline values, or comparison groups on the published page. HbA1c reduction has no comparator and no statistical test. | Specify and publish a standardized analytic protocol per disease state: cohort entry, index date, eligibility, follow-up window, baseline value, and a comparison group (pre-enrollment within-patient change, or external benchmark with risk adjustment) with confidence intervals. Apply one outcome dictionary across disease states so figures are comparable network-wide. | Service-line and population-health leaders comparing diabetes, oncology, and rheumatology need outcomes defined the same way with visible denominators. Standardized, comparator-anchored estimates let a system trust cross-disease comparisons and its own internal performance against the network. |
| Cross-asset benchmark claims: "92% adherence vs 80% benchmark" and "4% vs 20% admission rate" (`Shields_WP_2025_Clinical-Interventions_10.14.25.pdf`); "industry-leading" framing on `shields-health-solutions-demonstrates-industry-leading-clinical-outcomes.html` | Comparator benchmarks are stated without a cited source, matched population, or risk adjustment; the admission-rate comparison in particular lacks a defined denominator and population. | Replace unsourced benchmarks with either a documented external reference standard (named source, population, period) or an internal risk-adjusted network benchmark from the existing dashboard, and apply consistent inclusion rules to both arms. | Health-system decision-makers and their quality committees scrutinize comparator provenance. A sourced, risk-adjusted benchmark withstands due diligence; an unattributed one invites discounting of the whole claim. |
| `ASHP2024_PDC_FINAL.pdf` (PDC benchmark-setting) | Strong foundation (literature-validated PDC thresholds by class, network dashboard), but thresholds are set by narrative literature review and expert consensus, not derived from the network's own outcome-linked data; no validation that meeting a threshold predicts a clinical or utilization outcome. | Empirically calibrate PDC thresholds against the network's own outcomes (e.g., the PDC level at which admissions or disease-control measures inflect), turning consensus targets into outcome-anchored thresholds with reported discrimination. | An adherence target tied to a downstream outcome is more defensible to quality leaders and more actionable for value-based care (VBC) reporting than a target inherited from external consensus. |

---

## 3. Relevance-enhancement opportunities

| Gap / unaddressed question | Proposed study or reframing | Design | Primary outcome domain | Health-system decision / audience served |
|---|---|---|---|---|
| **Prescription capture and retention is asserted but never measured.** Prescription capture and prescription retention are central claims, and leakage is the counterpart concept. The corpus repeatedly invokes "segmented care," and the JAMA study compares internal versus external specialty pharmacy (SP) fillers (`...jama-network-open...umass...html`). Yet no asset quantifies how much specialty volume the system captures or retains because of the HSSP, or the margin and continuity consequences of leakage. | A prescription capture and retention study: measure the share of system-originated specialty prescriptions filled within the HSSP before and after Shields integration (and against eligible-but-leaked volume), and link retained scripts to continuity-of-care and downstream utilization. | Retrospective pre-post within system using EHR + pharmacy claims; ideally staggered-adoption DiD across service lines or sites; capture rate and retained net revenue as co-primary measures. | Prescription capture and retention; total cost of care to the system. | Pharmacy leadership and system finance deciding whether to build or expand an HSSP; the single most direct economic argument and currently unquantified. |
| **Clinician time-saved is computed, not measured.** `Shields_WP_2024_ClinicianUtilization_081524_FINAL.pdf` reports 1.5M hours saved and 680,000 financial assistance (FA) and PA submissions by multiplying task counts by assumed per-task minutes; no observed clinician time or capacity change. | A time-and-capacity study measuring clinician administrative time and clinic throughput before and after HSSP integration in matched clinics, including reallocated visit slots or panel growth. | Time-motion or EHR time-log measurement with matched control clinics; pre-post with difference-in-differences; primary measure is observed clinician minutes on PA and FA tasks and net change in patient-facing capacity. | Clinician administrative burden and clinic capacity. | Service-line chiefs, ambulatory operations, and CMOs deciding whether HSSP integration relieves workforce strain; converts an estimate into a measured capacity gain. |
| **No equity-stratified outcomes exist.** `Shields_WP_2023_SDOH-V5.pdf` and `Shields-Case-Study-SDOH-2023.pdf` describe a screening framework and workflow but report zero stratified outcome data; the analysis file flags this. | An equity-stratified outcomes analysis: report adherence, time to therapy, copay, and avoidable utilization stratified by payer type, race/ethnicity, language, rurality/geography, and financial-assistance need, and test whether the model narrows disparities. | Retrospective cohort with subgroup analysis and interaction testing; where SDOH screening data exist, pre-post change among screened high-risk participants vs unscreened comparators. | SDOH / equity for the system's own population. | System boards, population-health leaders, and community-benefit/mission stakeholders; answers whether the HSSP improves access equitably, which framework content cannot. |
| **Service-line growth is claimed anecdotally, not attributed.** The Sentara case in the clinician-utilization white paper notes enrollment quadrupling and expansion into heart failure; growth-planning pages (`assisting-a-specialty-pharmacy-with-growth-planning.html`, `building-the-business-case-for-in-house-specialty-pharmacy.html`) are narrative with no outcome measurement. | A service-line growth-attribution study linking HSSP integration to downstream specialty-clinic volume, new-patient starts, and provider referral patterns. | Multi-site pre-post / interrupted time series on clinic volumes and new starts, with attention to confounders (new providers, drug launches); report attributable growth with uncertainty. | Service-line growth and provider satisfaction. | Service-line chiefs and strategy/growth leaders deciding where to expand; turns testimonial into a quantified growth case. |
| **Total cost of care is framed for a health-plan/payer perspective.** The Optum poster and cost-of-care white paper compute cost "from a health insurance perspective" (PMPM, MA members). Health systems bear a different cost object (avoidable admissions and ED visits at their own facilities, observation, readmissions, internal margin). | Re-specify total-cost-of-care analyses to the system's cost object: avoidable utilization occurring at the system's own facilities, 30-day readmissions, and contribution to VBC and accountable care organization (ACO) performance, rather than plan PMPM. | Retrospective cohort on system encounter data with risk adjustment; align to the system's existing VBC and ACO measure set. | Total cost of care to the system and avoidable utilization. | CFOs, ACO and VBC leaders, and population-health teams; makes the cost story actionable for the entity that actually pays for the avoidable utilization. |
| **Time to therapy is reported as a network average, not a patient-access/experience outcome for the system's own patients.** "2-day time to therapy" recurs across assets without distribution, disease-state variation, or linkage to abandonment/first-fill and patient experience. | Reframe time to therapy as an access-and-experience study: distribution (not just mean) by disease state and payer, linked to therapy abandonment and to patient-reported experience for the system's patients. | Retrospective cohort with time-to-event (survival) methods on time to first fill; link to abandonment and NPS. | Patient access; time to therapy; experience. | Ambulatory operations and quality/experience leaders; reframes a marketing average into an access metric tied to abandonment the system can act on. |

---

## 4. Top priority engagements

Ranked by combined value to Shields and feasibility/credibility.

**1. Matched, quasi-experimental re-analysis of the multi-health-system total cost of care.**
- Research question: After matching on case mix and baseline cost/utilization, does HSSP exposure causally reduce risk-adjusted total cost of care, and by how much, with what uncertainty?
- Design: Propensity-score or entropy-balancing matching plus difference-in-differences on the existing 2018 baseline / 2019 follow-up structure (and added years), with covariate balance table, confidence intervals, and sensitivity analyses.
- Primary outcome domain: Total cost of care and avoidable utilization.
- Audience: System CFOs, boards, ACO/VBC leaders.
- Builds on: `SHS-Optum-AMCP-Poster.pdf` and the JAMA Network Open 2020 / JMCP 2022 lineage.
- Rationale: Upgrades Shields' single most strategically important and most-cited claim (the 13% figure) from an unmatched association to a defensible causal estimate; highest impact because every downstream asset references it.

**2. Prescription capture and retention study.**
- Research question: How much system-originated specialty volume does the HSSP capture and retain, and what is the net revenue and care-continuity consequence of reduced leakage?
- Design: Retrospective pre-post (ideally staggered-adoption DiD) on EHR plus pharmacy claims; capture rate and retained net revenue as co-primary measures, with continuity and downstream utilization as secondary.
- Primary outcome domain: Prescription capture and retention; total cost of care to the system.
- Audience: Pharmacy leadership and system finance.
- Builds on: The internal-vs-external-filler comparison underlying the JAMA Network Open UMass study, re-pointed from cost to capture.
- Rationale: Closes the corpus's largest research gap and supplies the most direct build/expand economic argument; high feasibility because the data already sit in partner systems.

**3. Measured clinician time-and-capacity study.**
- Research question: How much clinician administrative time does HSSP integration actually remove, and does freed time convert into measurable patient-facing capacity?
- Design: Time-log/time-motion measurement with matched control clinics; pre-post difference-in-differences; observed minutes and net capacity change as primary measures.
- Primary outcome domain: Clinician administrative burden and clinic capacity.
- Audience: Service-line chiefs, ambulatory operations, CMOs.
- Builds on: `Shields_WP_2024_ClinicianUtilization_081524_FINAL.pdf`.
- Rationale: Replaces a multiplied estimate with measured evidence on the issue hospital CEOs rank first (workforce); credible and differentiating because almost no HSSP competitor measures this directly.

**4. Equity-stratified outcomes analysis.**
- Research question: Does the HSSP model improve adherence, access, affordability, and avoidable utilization equitably, and does it narrow disparities, across the system's own population?
- Design: Retrospective cohort with prespecified subgroup and interaction testing by payer, race/ethnicity, language, geography, and financial-assistance need; pre-post among screened high-risk participants where SDOH data exist.
- Primary outcome domain: SDOH / equity.
- Audience: System boards, population-health, community-benefit/mission leaders.
- Builds on: `Shields_WP_2023_SDOH-V5.pdf` and `Shields-Case-Study-SDOH-2023.pdf` (moving from framework to measured outcomes).
- Rationale: Converts process/framework content into outcome evidence on a question boards increasingly require; Shields already collects the screening data, so feasibility is high.

**5. Standardized disease-state outcomes protocol and counterfactual-anchored cost-avoidance model.**
- Research question: Across disease states, what are HSSP outcomes under a single, transparent analytic protocol with comparison groups, and what cost avoidance is supported by a claims-validated counterfactual?
- Design: One outcome dictionary and statistical analysis plan applied across disease states (defined cohorts, index dates, follow-up, baselines, comparators, confidence intervals); cost avoidance estimated from matched intervened-vs-not utilization differences with probabilistic sensitivity analysis.
- Primary outcome domain: Clinical/adherence outcomes and total cost of care.
- Audience: Service-line and population-health leaders; system finance.
- Builds on: `Shields_WP_Diabetes_102022.pdf`, `Shields_WP_2025_Clinical-Interventions_10.14.25.pdf`, `ASHP2024_PDC_FINAL.pdf`, and the disease-state poster set.
- Rationale: Standardization makes the existing high-volume evidence engine internally comparable and audit-ready, and replaces the algorithmic cost-avoidance figure with one that survives finance reconciliation; broad but lower marginal cost because it builds on assets Shields already produces.

---

## 5. Differentiation note

Shields can self-produce descriptive outcomes, posters, and dashboards at scale, and does so well; proposing more of that would add little. The credible, specific and tailored value is in the methods Shields' assets do not currently apply and that are difficult to staff internally:

- **Causal inference on observational data.** The flagship cost study uses risk-adjusted t-tests on a 197-vs-8,824 comparison; the LDD and PA posters are descriptive or asymmetric pre-post by the authors' own statements. Propensity-score/entropy matching, difference-in-differences on staggered adoption, and interrupted time series are exactly the designs absent across the portfolio and the ones health-system finance and quality committees expect for capital and accreditation decisions.
- **Counterfactual-anchored economics.** The cost-avoidance figures rest on an internal unit-cost algorithm with no comparison group. A claims-validated counterfactual with probabilistic sensitivity analysis is a recognized methodological standard Shields has not adopted and that protects the credibility of its headline numbers under decision-maker reconciliation.
- **Re-pointing the cost object and the audience.** Shields' strongest economic assets are computed from a health-insurance perspective (PMPM, MA). Re-specifying outcomes to the system's own cost object (avoidable utilization at the system's facilities, capture/leakage, clinician capacity, equity in the system's population) is a reframing the existing payer-oriented analyses do not provide and that maps directly to the decisions senior executives, pharmacy, service-line, and quality leaders actually make.
- **Standardization and audit-readiness across a large network.** Shields has the dashboard and the metric set; it lacks a published, uniform analytic protocol (cohort definitions, index dates, follow-up windows, comparators, statistical analysis plan) applied across disease states and sites. Imposing that consistency is high-value precisely because the network is large, and it is the kind of governance work that is hard to retrofit internally once an evidence engine is already running at volume.

Because Shields is the most evidence-mature prospect, the engagement approach is upgrade and re-point, not build-from-scratch. Each proposal above attaches to a specific existing asset and raises its causal rigor or re-aims its relevance to a named health-system decision, rather than duplicating evidence Shields already produces competently.

---

## Glossary

Clinical and operational terms:

- **Health-system specialty pharmacy (HSSP):** a specialty pharmacy owned and operated by a health system to serve its own patients.
- **Prescription capture (capture rate):** the share of specialty prescriptions written by a health system's providers that are filled by that system's own specialty pharmacy rather than an external pharmacy.
- **Leakage:** specialty prescriptions written within a health system but filled at an outside pharmacy, so the system loses the associated dispensing revenue and visibility into the patient's care.
- **Prescription retention:** keeping eligible specialty prescriptions within the system's own specialty pharmacy, that is, reducing leakage.
- **Limited distribution drug (LDD):** a specialty drug a manufacturer makes available through only a small number of approved pharmacies.
- **Proportion of days covered (PDC):** a standard adherence measure equal to the share of days in a period for which a patient had the medication on hand.
- **Time to therapy (time to first fill):** the elapsed time from when a prescription is written to when the patient receives the medication.
- **Abandonment:** a prescription that is approved or ready but never picked up or filled.
- **Social determinants of health (SDOH) / health-related social needs (HRSN):** non-medical factors (for example housing, transportation, food, income) that affect health and access to care.
- **Total cost of care:** total spending on a patient's care across all settings over a defined period.
- **Net Promoter Score (NPS):** a satisfaction measure based on how likely respondents are to recommend a service.
- **Specialty pharmacy accreditation (URAC, ACHC):** quality certifications from independent bodies that many payers and manufacturers require for network and drug access.
- **Prior authorization (PA):** an insurer requirement that a prescription be approved before it is covered, a common cause of delay in starting therapy.
- **Financial assistance (FA):** help securing copay support, manufacturer assistance, or grants to make a medication affordable.
- **Emergency department (ED):** the hospital unit providing emergency care; ED visits and admissions are common measures of avoidable utilization.
- **Hemoglobin A1c (A1C, HbA1c):** a blood marker of average blood glucose over roughly three months, used to gauge diabetes control.
- **Quality improvement (QI):** structured efforts to improve care processes and outcomes, typically without a research comparison group.
- **Per member per month (PMPM):** a standardized cost or utilization figure expressed as the average amount per enrolled health-plan member per month.
- **Medicare Advantage (MA):** privately administered Medicare health plans, an alternative to traditional fee-for-service Medicare.
- **Accountable care organization (ACO):** a group of providers held jointly accountable for the cost and quality of care for a defined population.
- **Value-based care (VBC):** payment and care models that tie reimbursement to outcomes and total cost rather than to volume of services.
- **Pharmacy benefit manager (PBM):** a company that administers prescription drug benefits for health plans and employers.

Research-method terms:

- **Comparison group (comparator):** a group that did not receive the intervention, used as a baseline to judge the intervention's effect.
- **Quasi-experimental design:** a study that estimates cause and effect without randomly assigning participants, by constructing comparison groups or using repeated measurements over time.
- **Propensity-score matching:** a method that pairs intervention and comparison participants who have similar characteristics so the two groups are comparable.
- **Risk adjustment (case-mix adjustment):** statistically accounting for differences in participants' health and complexity so comparisons are fair.
- **Difference-in-differences (DiD):** a method that compares the before-and-after change in a group that received an intervention with the change over the same period in a group that did not, to isolate the intervention's effect.
- **Interrupted time series (ITS):** a method that measures an outcome at many points before and after an intervention to separate the intervention's effect from pre-existing trends.
- **Counterfactual:** an estimate of what would have happened without the intervention.
- **Confidence interval:** a range around an estimate that expresses how much uncertainty it carries.
- **Entropy balancing:** a reweighting method that makes a comparison group statistically similar to the intervention group on chosen characteristics without one-to-one pairing.
- **Standardized mean difference:** a measure of how far apart two groups are on a characteristic, used to check whether matching produced balanced groups.
- **Segmented regression:** the statistical technique used in an interrupted time series to estimate the change in level and trend at the point of intervention.
- **Mixed-effects model:** a regression method that accounts for data grouped within sites or clusters when estimating an effect.
- **Co-primary measure:** one of two primary outcomes of equal importance in a study.
- **Sensitivity analysis:** re-running an analysis under different assumptions to test whether the conclusions hold.

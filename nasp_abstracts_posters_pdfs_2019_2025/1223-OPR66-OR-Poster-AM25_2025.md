# Hematological oral oncolytics: adherence, healthcare cost and utilization.

Staskon, F., PhD; Khan, K., CPhT; Pfeifer, A., PharmD; Havern, L.T., PharmD

Walgreens logo

# BACKGROUND

* Connected Care<sup>©</sup> Oncology (CC-Onc) is a patient centered clinical management program that includes a set of 21 unique oral hematological oncolytics for affected oncology patients.

# OBJECTIVE

* To identify significant associations between a discontinuation adherence metric for the set of CC-Onc hematological oral oncolytics and total medical costs, hospitalizations, and total length of stay (LOS). Research deemed exempt from HIPAA by a Walgreens Advarra IRB #39505 for inpatients.

* Provide an economic evaluation of this discontinuation cohort effect from predicted healthcare costs and utilization.

# METHODS

* A retrospective cohort design of patients was utilized from the MarketScan Commercial Claims and Encounters for 2022.

* The sample selection required patients have at least two fills of targeted medication (see therapeutic classes in Table 2.) from the 2022 files with a primary cancer diagnosis code in medical files for 2021 or 2022, be continuously enrolled, and aged from 18–64 years.

* Exclusion criteria were presence of hospice care or organ transplants, and those starting medication therapy in last 45 days of 2022.

* Discontinuation was indicated by a gap exceeding 1.5\*(prior days supply) on consecutive fills of hematological oncolytics.

* General linear models predicted total medical costs, hospitalizations, and LOS (with gamma or logit links).

* Predictors included discontinuation cohorts, gender (female vs. male), age (above median, 56 yrs.), census region (southern vs. other), metropolitan location (metro vs. not metro), Rx channels (Mail order or Retail order vs. mix), presence of comorbidity (any non-cancer Charlson comorbidity index category), COVID-19 indication, high level of provider visits (15+ distinct provider type/location vs. 1–14), any inpatient admission (present vs. or not), ER events (present vs. or not), inpatient surgeries (present vs. or not), PPO insurance type (all coverage vs. or not). Interactions were included between discontinuation and many covariates, depending on outcome type (e.g., hospitalization and LOS require an admission).

* The economic evaluation used predicted outcome values and the 2022 MarketScan payer eligible cancer patient population estimates to examine healthcare savings related to adherence after including medication costs.

# RESULTS

* Predicted outcomes are presented first, followed by the economic evaluation results.

* A total of 4,296 out of 4,312 patients in 2022 met model criteria with exclusion criteria, having a 27.8% discontinuation rate. Descriptives statistics for the predictors are presented in **Table 1.** per cohort.

* Cohorts differ in the same direction on healthcare utilization and clinical characteristics, with the discontinuation cohort having higher rates for all utilizations, comorbidities and Covid-19 (see **Table 1**).

# RESULTS CONTINUED

Table 1. Demographics and Clinical Characteristics for Modeled Sample.

| Adherence Cohort | N           | Southern Region | Age (56+)      | Female        | Metro area | Rx Retail | Rx Mail | PPO   |
| ---------------- | ----------- | --------------- | -------------- | ------------- | ---------- | --------- | ------- | ----- |
| Discontinued     | 3,106       | 48.7%           | 46.1%          | 44.9%         | 68.0%      | 62.9%     | 33.6%   | 49.7% |
| Not Discontinued | 1,190       | 45.5%           | 48.8%          | 47.0%         | 68.2%      | 58.0%     | 38.4%   | 46.0% |
| Adherence Cohort | Comorbidity | COVID           | High OP Visits | Admission     | ER         | Surgery   | LOS     |       |
| Discontinued     | 52.9%       | 22.8%           | 41.8%          | 29.3% (n=349) | 35.1%      | 8.4%      | 12.9    |       |
| Not Discontinued | 44.5%       | 19.3%           | 29.0%          | 15.0% (n=465) | 25.9%      | 4.9%      | 8.9     |       |


* Reported in **Table 2.** are the included therapeutic classes and their respective discontinuation rate and the yearly predicted mean net costs.

* BCR-ABL Kinase Inhibitors (asciminib, bosutinib, dasatinib, imatinib, nilotinib) was the most utilized class (46.6%) with a discontinuation rate of 22.3%, followed by Immunomodulators (lenalidomide, pomalidomide, thalidomide) at 34.1% with 32.8% discontinued over the year.

Table 2. Generic Oral Antineoplastic Utilized, Discontinuation Rates and Predicted Mean Rx Net Costs.

| Therapeutic Class                        | n     | Discontinuation Rate | Model Predicted Mean Rx Net Costs |
| ---------------------------------------- | ----- | -------------------- | --------------------------------- |
| Antimetabolites                          | 16    | 43.8%                | $115,811                          |
| BCR-ABL Kinase Inhibitors                | 2,000 | 22.3%                | $138,491                          |
| BRAF Kinase Inhibitors                   | 13    | 30.8%                | $128,676                          |
| BTK-Inhibitors                           | 225   | 19.1%                | $133,995                          |
| Histone Deacetylase Inhibitors           | 1     | 100.0%               | $89,610                           |
| Immunomodulators                         | 1,466 | 32.8%                | $134,488                          |
| Kinase Inhibitors                        | 13    | 53.8%                | $114,468                          |
| Multikinase Inhibitors                   | 19    | 57.9%                | $106,889                          |
| Proteasome Inhibitors                    | 55    | 41.8%                | $128,875                          |
| Antineoplastic Combinations              | 3     | 33.3%                | $147,197                          |
| Antineoplastics Misc.                    | 39    | 82.1%                | $90,452                           |
| Isocitrate Dehydrogenase-2 Inhibitors    | 4     | 25.0%                | $141,406                          |
| Janus Associated Kinase (JAK) Inhibitors | 404   | 30.7%                | $131,502                          |
| Selective Retinoid X Receptor Agonists   | 38    | 26.3%                | $135,943                          |


## Predicted Outcomes

* General linear models with a gamma link and listed covariates were used for the hematological oncolytics net total costs, and medical costs (combined inpatient and outpatient net payments), and total combined costs for the year. Only the model adjusted adherence effect is reported on below.

* As reported in **Table 3.** the adherent group had higher oncolytics costs than discontinued group ($50,228 PMPY, p<.0001) given they utilized more medication; but had significantly lower medical costs (-$73,663 PMPY, p<0001). Combined total costs was not significantly lower for the adherent cohort (-$19,193 PMPY, p<.46).

Table 3. Predicted Costs (PMPY) by Discontinuation Cohorts.

| Outcome         | Discontinued | Non-Discontinued | Δ Adherence | Significance |
| --------------- | ------------ | ---------------- | ----------- | ------------ |
| Oncolytic Costs | $99,007      | $149,234         | $50,228     | p<.0001      |
| Medical Costs   | $132,750     | $73,663          | (-$73,663)  | p<.0001      |
| Total Costs     | $225,870     | $206,677         | (-$19,193)  | p<.46        |


# RESULTS CONTINUED

* Compared to adherent patients, odds of hospitalization were significantly increased (OR=2.22, p<.0001) and LOS was significantly longer for discontinuation patients (4 days, p<.0001) (see **Figure 1.**).

Figure 1. Predicted Admission Rate and LOS by Adherence

| Category                | Discontinued | Non-Discontinued |
| ----------------------- | ------------ | ---------------- |
| Admission Rate (Adj. %) | 29.3         | 15.0             |
| LOS (Adj. Mean Days)    | 12.9         | 8.9              |
| Mean LOS per Admission  | 6.9          | 5.2              |


## Economic Evaluation

* Of the 2022 MarketScan Commercial enrollees with cancer and 18–64 years of age, 0.09% had at least 1 targeted oncolytic medication, or 0.17% for those with prescription coverage for the year.

* Results were calculated per 1,000 members using predicted outcome values previously presented.

* **Table 4.** presents calculated estimates of outcomes/utilization per 1,000 patients for inpatient utilization, indicating adherence is associated with reduced admission rates (difference of 290.6), and LOS (difference of 1.7) per 1,000. (Mean LOS per admission values are also displayed in **Figure 1.** above)

Table 4. Predicted inpatient utilization or costs per 1,000 by Cohorts.

| Parameter                                            | Adherent  | Discontinued |
| ---------------------------------------------------- | --------- | ------------ |
| Mean LOS per Admission (total days/total admissions) | 5.2       | 6.9          |
| Inpatient admission rate per 1,000 by Cohorts        | 255.6     | 546.2        |
| Reduction in Inpatient Rate per 1,000 with Adherence | (290.6)   |              |
| Reduction in Mean LOS with Adherence                 | (1.7)     |              |
| Total Hospital Days by Cohorts                       | 172       | 189          |
| Inpatient Costs per Day by Cohorts                   | $8,386    | $9,059       |
| Inpatient Costs PMPY (predicted outcome) by Cohorts  | $11,164   | $33,855      |
| Inpatient Savings with Adherence                     | ($22,691) |              |


* Based upon modeled study sample and predicted outcome values, when considering the difference in hospital admissions rate and length of stay when admitted, the predicted inpatient medical spend was higher for the nonadherent patients by $22,691 (PMPY), see **Table 4.**

# CONCLUSIONS

* Being adherent to oral hematological oncolytics can lead to lower medical costs, odds of hospitalization and LOS after controlling for many other influences on these outcomes. Supporting results are both from the modeled predicted costs and inpatient utilization outcomes as well as estimates from the economic evaluation. Hence, clinical management as offered in CC-Onc is designed to assist patients retain their adherence to therapy.

Presented at the Academy of Managed Care Pharmacy Nexus 2024 Meeting (AMCP Nexus 2024, Las Vegas). This research was approved Advarra IRB (#39505) and funded internally by Walgreen Co. All authors are employees of Walgreen Co. Please contact: <u>research@walgreens.com</u>.
This research was funded internally by Walgreen Co. ©2022 Walgreen Co. All rights reserved

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/img_p0_1.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/img_p0_2.png)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/img_p0_3.png)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_table_3_v2.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_table_4_v2.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_table_2_v2.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_table_1_v2.jpg)

![Extracted image from page 1](1223-OPR66-OR-Poster-AM25_2025_images/page_1_chart_1_v2.jpg)

# Impact of clinical dashboards for data capture and reporting across health system specialty pharmacies

Authors: Carson Kantoris, PharmD Candidate; Ana Lopez Medina, PharmD; Carly Giavatto, PharmD; Jessica Mourani, PharmD; Amber Skrtic, PharmD, CSP, AAHIVP; Hector Mayol Torres, BSEE; Erica Rosa, MPH; Casey Fitzpatrick, PharmD, BCPS

cps logo

## BACKGROUND

* For healthcare organizations, clinical dashboards allow clinicians to view and understand data trends on care processes and patient outcomes which can be utilized in the decision-making process to improve the quality of patient care.<sup>1,2</sup>

* Health system specialty pharmacies (HSSPs) rely on clinical outcome measures (COMs), which are instruments that provide a standardized evaluation of a patient’s clinical disease status, to make informed patient care decisions.<sup>3</sup>

* Capturing and reporting patient outcomes and COMs is essential to track patient progress in real time, allowing pharmacists to intervene proactively before undesirable outcomes occur.

* In the HSSP model, accurately documenting and tracking pharmacist interventions are important to highlight the care that pharmacists provide.

## OBJECTIVES

To determine the impact of clinical dashboards on COM capture rates and the completion of protocol-driven pharmacist interventions across multiple HSSP partner sites.

## METHODS

### Study Design

Retrospective quality improvement study that analyzed data from quarterly reports released from April 2020 to December 2022. Quarter 2 2020 report was selected as the pre-dashboard comparator while reports from Quarter 2 2022 and Quarter 4 2022 were randomly selected to represent post-dashboard implementation

### Dashboard Implementation

* Clinical dashboards were first introduced at Trellis Rx, now part of CPS, in Quarter 3 2020 to create a standardized collection and reporting method of selected metrics (e.g., protocol-driven pharmacist interventions) and COMs.

* Prior to implementation of dashboards, data was compiled through manual chart reviews by central support pharmacists. As part of this process, pharmacists would go profile by profile via spreadsheets on Microsoft® Excel® and mark which patient profiles or therapy cards were missing required data collection information.

* Metrics and COMs included in clinical dashboards were defined and identified through literature review, specialty pharmacy recommendations, and internal subcommittee discussions with disease state experts.<sup>4,5</sup>

## DATA ANALYSIS

* For a pre- versus post-dashboard implementation analysis, capture rates or completion percentages of nine corresponding COMs and completed protocol-driven pharmacist interventions from Quarter 2 2020 and Quarter 4 2022 were compared. Included COMs are composed of patient-reported outcome measures (PROMs), collected labs or tests, and operational outcome measures.

* To evaluate consistency in COM capture rates and completed interventions, a post-dashboard analysis was completed by comparing eleven corresponding metrics in Quarter 2 2022 and Quarter 4 2022.

* Fisher’s exact tests were conducted for each analysis to determine if a statistically significant association existed between the given variables.

* A p value < 0.05 was considered statistically significant.

* Analyses were performed using RStudio (version 2023.06.1+524)

## RESULTS

Table 1: Reported COMS and Completed Interventions

| Metric                                                           | Disease State      | Metric Group                            |
| ---------------------------------------------------------------- | ------------------ | --------------------------------------- |
| CGRP efficacy\*†                                                 | Neurology          | PROM                                    |
| Baseline RAPID3 collected\*†                                     | Autoimmune         | PROM                                    |
| Baseline DLQI or POEM collected\*†                               | Autoimmune         | PROM                                    |
| Baseline GI QOL collected\*†                                     | Autoimmune         | PROM                                    |
| CML BCR-ABL genetic test\*†                                      | Oncology           | Collected Lab or Test                   |
| HIV viral suppression within six months of therapy initiation\*† | Infectious disease | Collected Labs or Test                  |
| SVR12 assessment within six months of therapy completion\*†      | Infectious disease | Collected Lab or Test                   |
| Patients with intervention after LDL not at goal\*†              | Cardiology         | Protocol-Driven Pharmacist Intervention |
| RAPID3 intervention (after two consecutive worsening scores)\*†  | Autoimmune         | Protocol-Driven Pharmacist Intervention |
| New to therapy check-in†                                         | Oncology           | Operational Outcome Measure             |
| HCV therapy completion rate†                                     | Infectious disease | Operational Outcome Measure             |


\*included in pre- versus post-dashboard analysis
†included in post-dashboard analysis

Table 2: Pre- Versus Post-Dashboard Analysis

| Combined Metrics                               | Quarter 2 2020<br/>Count | Quarter 2 2020<br/>Capture Rate or Completion Percentage | Quarter 4 2022<br/>Count | Quarter 4 2022<br/>Capture Rate or Completion Percentage | P-value    |
| ---------------------------------------------- | ------------------------ | -------------------------------------------------------- | ------------------------ | -------------------------------------------------------- | ---------- |
| Total PROMs                                    | 720                      | 87%                                                      | 3653                     | 99%                                                      | **<0.001** |
| Total Collected Labs or Tests                  | 517                      | 88%                                                      | 1432                     | 95%                                                      | **<0.001** |
| Total Protocol-Driven Pharmacist Interventions | 48                       | 58%                                                      | 596                      | 100%                                                     | **<0.001** |


Table 3: Post-Dashboard Analysis

| Combined Metrics                               | Quarter 2 2022<br/>Count | Quarter 2 2022<br/>Capture Rate or Completion Percentage | Quarter 4 2022<br/>Count | Quarter 4 2022<br/>Capture Rate or Completion Percentage | P-value |
| ---------------------------------------------- | ------------------------ | -------------------------------------------------------- | ------------------------ | -------------------------------------------------------- | ------- |
| Total PROMs                                    | 3637                     | 99%                                                      | 3822                     | 99%                                                      | 1.000   |
| Total Collected Labs or Tests                  | 1333                     | 95%                                                      | 1432                     | 95%                                                      | 1.000   |
| Total Protocol-Driven Pharmacist Interventions | 457                      | 99%                                                      | 596                      | 100%                                                     | 0.304   |
| Total Operational Outcome Measures             | 1402                     | 95%                                                      | 1724                     | 94%                                                      | 0.239   |


## RESULTS

FIGURE 1: Reporting of Individual Metrics by Quarter

| Quarter | CGRP efficacy | Baseline RAPID3 collected | Baseline DLQI or POEM collected | Baseline GI QOL collected | CML BCR-ABL genetic test | HIV viral suppression within six months of therapy initiation | SVR12 assessment within six months of therapy completion | Patients with intervention after LDL not at goal | RAPID3 intervention (after two consecutive worsening scores) | New to therapy check-in | HCV therapy completion rate |
| ------- | ------------- | ------------------------- | ------------------------------- | ------------------------- | ------------------------ | ------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ | ----------------------- | --------------------------- |
| Q1 2020 | 45            |                           |                                 |                           |                          |                                                               |                                                          |                                                  |                                                              |                         |                             |
| Q2 2020 | 65            | 85                        | 88                              | 88                        | 88                       | 88                                                            | 88                                                       | 58                                               |                                                              |                         |                             |
| Q2 2021 | 95            | 98                        | 98                              | 98                        | 95                       | 95                                                            | 95                                                       | 98                                               | 98                                                           | 95                      | 95                          |
| Q3 2021 | 98            | 98                        | 98                              | 98                        | 95                       | 95                                                            | 95                                                       | 98                                               | 98                                                           | 95                      | 95                          |
| Q4 2021 | 98            | 98                        | 98                              | 98                        | 95                       | 95                                                            | 95                                                       | 98                                               | 98                                                           | 95                      | 95                          |
| Q1 2022 | 98            | 98                        | 98                              | 98                        | 95                       | 95                                                            | 95                                                       | 98                                               | 98                                                           | 95                      | 95                          |
| Q2 2022 | 98            | 99                        | 99                              | 99                        | 95                       | 95                                                            | 95                                                       | 99                                               | 99                                                           | 95                      | 95                          |
| Q3 2022 | 98            | 99                        | 99                              | 99                        | 95                       | 95                                                            | 95                                                       | 99                                               | 99                                                           | 95                      | 95                          |
| Q4 2022 | 98            | 99                        | 99                              | 99                        | 95                       | 95                                                            | 95                                                       | 100                                              | 100                                                          | 95                      | 94                          |


## DISCUSSION AND CONCLUSIONS

* This project highlights the utilization of clinical dashboards for HSSPs as an efficient data collection system for tracking and reporting of COMs and pharmacist interventions.

* There was a statistically significant improvement in PROM capture rates, collected labs or tests, and completed protocol-driven pharmacist interventions after dashboard implementation.

* Incorporation of clinical dashboards allow HSSP pharmacists to monitor patient progress in real-time to ensure that clinical goals and metrics are being achieved.

### Limitations

* The manual collection process used in pre-dashboard quarter to obtain data may have resulted in missed counts for some metrics.

* Implemented clinical protocols and the individual care provided by team members may have contributed to improved data capture.

## REFERENCES

1. What is a dashboard? A complete overview. Tableau. <u>https://www.tableau.com/learn/articles/dashboards/what-is</u>. Accessed May 11, 2023.

2. Kinney A, Bui Q, Hodding J et al. Pharmacy dashboard: An innovative process for pharmacy workload and productivity. Hosp Pharm. 2017; 52(3): 198-206.

3. Inojosa H, Schriefer D and Ziemssen T. Clinical outcome measures in multiple sclerosis: A review. Autoimmun Rev. 2020; 19(5): 102512.

4. Mourani J, Hardin B, Skrtic A et al. Dashboards for clinical outcome measure reporting. Abstract presented at Tenth Annual National Association of Specialty Pharmacy Annual Meeting & Expo. Orlando, Florida; 2022.

5. Patel K, Chim Y, Grant J et al. Development and implementation of clinical outcome measures for automated collection within specialty pharmacy practice. J Manag Care Spec Pharm. 2020; 26(7): 9201-909.

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/img_p0_1.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1_table_3_v2.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1_table_2_v2.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1_table_1_v2.jpg)

![Extracted image from page 1](69_Impact-of-clinical-dashboards-for-data-capture-and-reporting-across-health-system-specialty-pharmacies_2023_images/page_1_chart_1_v2.jpg)

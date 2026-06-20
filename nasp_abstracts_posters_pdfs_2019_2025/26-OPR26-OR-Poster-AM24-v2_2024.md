# Using Real-World Data to Better Understand Biosimilar Adoption Variation Across Healthcare Provider Specialties

Diane Faraone, PharmD, Russell Robbins, MD, MBA, Grace Kane, MS, Douglas Londono, PhD.

PurpleLab HEALTHCARE ANALYTICS logo

## BACKGROUND

* The US biologics market has significantly expanded in recent years; projected to reach $62 billion in prescription drug spend by 2025.<sup>1,2</sup>

* Biosimilar approvals have outpaced healthcare provider (HCP) adoption with goals to increase competition, reduce cost, and improve access,<sup>4,5,6,7</sup> highlighting needed focus for HCP awareness and real-world data explaining variation.

## METHODS

### Data Sources

We used PurpleLab’s HealthNexus™ report and data analytics to understand the impact of HCP specialty on biosimilar adoption. A total of 278,477 HCPs and 2,980,581 patient lives were captured from US commercial, Medicaid, and Medicare outpatient facility, professional, and pharmacy claims.

Reference and respective biosimilars included adalimumab, infliximab, rituximab and trastuzumab. Reporting periods varied for each reference biologic and biosimilar cohort to account for time on market and market launch.

## OBJECTIVE

To evaluate whether provider specialty is a driver for biosimilar adoption, defined as adoption probability difference (APD).

### Statistical Analysis

Data analysis was performed using R (4.4.0)<sup>8</sup> to create HCP relationships that account for real-world provider practice. We used a Random Forest model to predict variation of HCP specialty biosimilar APD. Higher adoption was defined as APD of greater than 20% in HCP specialty pairwise comparison for the biosimilar.

## RESULTS

* We analyzed patient distribution by HCP specialty and sub-specialty using NPI specialty taxonomy for each cohort with pairwise provider comparisons.

* New biosimilar launches had lower provider counts and adoption. Biosimilar APD was higher for specialty and non-specialty medical HCPs compared to specialty advanced practice providers (APPs) and rheumatology, gastroenterology, and dermatology specialties with adalimumab and infliximab.

* A similar trend was observed with rituximab and trastuzumab related to medical and APP providers, however, rituximab had a lower biosimilar APD for neurology, indicating more utilization of reference biologic for this specialty practice.

### Rituximab (Brand) Provider Specialty Distribution

| Specialty                                | Percentage |
| ---------------------------------------- | ---------- |
| Internal Medicine-Hematology & Oncology  | 41%        |
| Nurse Practitioner-Hematology & Oncology | 26%        |
| Internal Medicine-Hematology             | 8%         |
| Internal Medicine                        | 5%         |
| Psychiatry & Neurology-Neurology         | 4%         |
| Internal Medicine-Medical Oncology       | 3%         |
| Internal Medicine-Rheumatology           | 3%         |
| Internal Medicine-Nephrology             | 2%         |
| Family Medicine                          | 1%         |
| Nurse Practitioner-Orthopaedic Surgery   | 1%         |
| Others                                   | 6%         |


### Rituximab Biosimilars Provider Specialty Distribution

| Specialty                                | Percentage |
| ---------------------------------------- | ---------- |
| Internal Medicine-Hematology             | 51%        |
| Family Medicine                          | 13%        |
| Internal Medicine-Nephrology             | 10%        |
| Psychiatry & Neurology-Neurology         | 5%         |
| Internal Medicine                        | 4%         |
| Internal Medicine-Medical Oncology       | 3%         |
| Internal Medicine-Rheumatology           | 3%         |
| Internal Medicine-Hematology & Oncology  | 2%         |
| Nurse Practitioner-Hematology & Oncology | 2%         |
| Nurse Practitioner-Orthopaedic Surgery   | 1%         |
| Others                                   | 6%         |


### Trastuzumab (Brand) Provider Specialty Distribution

| Specialty                               | Percentage |
| --------------------------------------- | ---------- |
| Internal Medicine-Hematology            | 62%        |
| Internal Medicine-Medical Oncology      | 17%        |
| Gynecologic Oncology                    | 5%         |
| Nurse Practitioner-Hematology           | 3%         |
| Nurse Practitioner-Medical Oncology     | 3%         |
| Radiology-Radiation Oncology            | 3%         |
| Internal Medicine                       | 2%         |
| Nurse Practitioner-Gastroenterology     | 2%         |
| Nurse Practitioner-Orthopaedic Surgery  | 2%         |
| Internal Medicine-Hematology & Oncology | 1%         |
| Others                                  | 0%         |


### Trastuzumab Biosimilars Provider Specialty Distribution

| Specialty                                 | Percentage |
| ----------------------------------------- | ---------- |
| Internal Medicine-Hematology              | 62%        |
| Internal Medicine-Medical Oncology        | 16%        |
| Gynecologic Oncology                      | 5%         |
| Nurse Practitioner-Hematology             | 4%         |
| Nurse Practitioner-Medical Oncology       | 3%         |
| Radiology-Radiation Oncology              | 3%         |
| Internal Medicine                         | 2%         |
| Nurse Practitioner-Gynecological Oncology | 2%         |
| Nurse Practitioner-Orthopaedic Surgery    | 2%         |
| Internal Medicine-Hematology & Oncology   | 1%         |
| Others                                    | 0%         |


### Adalimumab (Brand) Provider Specialty Distribution

| Specialty                             | Percentage |
| ------------------------------------- | ---------- |
| Internal Medicine-Rheumatology        | 42%        |
| Family Medicine                       | 17%        |
| Physician Assistant-Rheumatology      | 11%        |
| Internal Medicine-Gastroenterology    | 11%        |
| Nurse Practitioner-Gastroenterology   | 4%         |
| Pediatrics-Pediatric Gastroenterology | 3%         |
| Internal Medicine                     | 3%         |
| Dermatology                           | 2%         |
| Nurse Practitioner-Rheumatology       | 2%         |
| Physician Assistant-Dermatology       | 2%         |
| Others                                | 3%         |


### Adalimumab Biosimilars - Provider Specialty Distribution

| Specialty                             | Percentage |
| ------------------------------------- | ---------- |
| Internal Medicine-Rheumatology        | 45%        |
| Family Medicine                       | 15%        |
| Physician Assistant-Dermatology       | 8%         |
| Nurse Practitioner-Gastroenterology   | 5%         |
| Internal Medicine-Gastroenterology    | 13%        |
| Pediatrics-Pediatric Gastroenterology | 3%         |
| Pediatrics-Pediatric Rheumatology     | 2%         |
| Medical Resident                      | 2%         |
| Internal Medicine                     | 2%         |
| Dermatology                           | 2%         |
| Nurse Practitioner-Rheumatology       | 3%         |
| Others                                | 0%         |


### Infliximab (Brand) Provider Specialty Distribution

| Specialty                                                              | Percentage |
| ---------------------------------------------------------------------- | ---------- |
| Internal Medicine-Gastroenterology                                     | 41%        |
| Nurse Practitioner-Family                                              | 28%        |
| Internal Medicine-Rheumatology                                         | 7%         |
| Internal Medicine                                                      | 4%         |
| Pediatrics-Pediatric Gastroenterology                                  | 4%         |
| Internal Medicine-Hematology & Oncology                                | 3%         |
| Nurse Practitioner-Gastroenterology                                    | 2%         |
| Family Medicine                                                        | 2%         |
| Internal Medicine-Infectious Disease                                   | 1%         |
| Nurse Practitioner-Other Musculoskeletal & Connective Tissue Disorders | 1%         |
| Others                                                                 | 7%         |


### Infliximab Biosimilars Provider Specialty Distribution

| Specialty                                                              | Percentage |
| ---------------------------------------------------------------------- | ---------- |
| Internal Medicine-Gastroenterology                                     | 36%        |
| Physician Assistant-Gastroenterology                                   | 26%        |
| Internal Medicine-Rheumatology                                         | 9%         |
| Internal Medicine                                                      | 7%         |
| Internal Medicine-Hematology & Oncology                                | 6%         |
| Pediatrics-Pediatric Gastroenterology                                  | 4%         |
| Family Medicine                                                        | 3%         |
| Nurse Practitioner-Gastroenterology                                    | 2%         |
| Internal Medicine-Infectious Disease                                   | 2%         |
| Nurse Practitioner-Other Musculoskeletal & Connective Tissue Disorders | 2%         |
| Others                                                                 | 3%         |


## DISCUSSION AND CONCLUSIONS

* The specialty biologic market growth is projected to continue at a rate of 8% yearly and by 2025 will account for $62 billion in prescription drug spend. These drugs represent only 2% of U.S. prescription volume, but account for 37% of drug spending.

* Our analysis found that biosimilar prescribing varied with specialty, defined by APD. Other reasons may include new launch, need for switching studies, minimal savings, and coverage restriction.<sup>9,10</sup> Survey data<sup>11</sup> reports providers dislike interchangeability without intervention.

* Expansion of biosimilars brings a need for provider awareness of product availability, experience, and use of real-world data to enhance the provider- patient journey.

* Provider adoption is key, but this can vary based on FDA approval status of interchangeability and payer drug formulary policy. While these medications are available, not all providers may be using them, so having this information can ultimately help direct patients to these HCP practices.

* These insights are important for provider organizations to develop strategies that focus on HCP awareness and enable pharma companies to identify provider specialty shifting and biosimilar adoption.

## REFERENCES

1. Cardinal Health 2024 Biosimilars Report. Accessed March 23, 2024. ADD ND https://www.cardinalhealth.com/content/dam/corp/web/documents/Report/cardinal-health-2024-Biosimilars-Report.pdf

2. Biosimilars in the United States 2023–2027. IQVIA Institute, January 2023. Accessed February 3, 2024. https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/biosimilars-in-the-united-states-2023-2027

3. Biosimilars pipeline report: A guide for understanding the growing market. Amerisource Bergen, March 11, 2024. Accessed May 24, 2024. https://www.amerisourcebergen.com/insights/manufacturers/biosimilar-pipeline-report

4. Mulcahy A, Buttorff, C. Projected US Savings from Biosimilars, 2021-2025. AJMC. January 3, 2022. Accessed May 24, 2024. https://www.ajmc.com/view/projected-us-savings-from-biosimilars-2021-2025

5. Gallagher A. Study: Biosimilar Drugs Could Generate $38.4 Billion in Savings Over 5 Years. January 11, 2022. Accessed May 24, 2024. https://www.pharmacytimes.com/view/study-biosimilar-drugs-could-generate-38-4-billion-in-savings-over-5-years

6. Report: 2023 U.S. Generic and Biosimilar Medicines Savings Report. Association for Accessible Medicines. Accessed May 24, 2024. https://accessiblemeds.org/resources/reports/2023-savings-report

7. FDA-TRACK: Center for Drug Evaluation and Research Pre-Approval Safety Review Biosimilars Dashboard. FDA. May 5, 2024. Accessed May 24, 2024. https://www.fda.gov/about-fda/fda-track-agency-wide-program-performance/fda-track-center-drug-evaluation-and-research-pre-approval-safety-review-biosimilars-dashboard

8. R Core Team (2024). *R: A Language and Environment for Statistical Computing*. R Foundation for Statistical Computing, Vienna, Austria. https://www.R-project.org/

9. Feng K, Russo, Massimiliano, Maini L. Patient Out-of-Pocket Costs for Biologic Drugs After Biosimilar Competition. JAMA Health Forum. 2024;5(3):e235429. doi:10.1001/jamahealthforum.2023.5429. Accessed May 24, 2024. https://jamanetwork.com/journals/jama-health-forum/fullarticle/2816952

10. Middlemen Increasingly Block Patient Access to New Generics. Association for Accessible Medicines. January 2023. Accessed May 24, 2024. https://accessiblemeds.org/sites/default/files/2023-01/AAM-Middlemen-Block-Patient-Access-New-Generics-2023.pdf

11. Shubow A. Qin S, Phan AL, Hammel DC, et al. Prescriber Perspectives on Biosimilar Adoption and Potential Role of Clinical Pharmacology: A Workshop Summary. Clin Pharmacol Ther. January 2023. Accessed May 24, 2024. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10099086/

PurpleLab HEALTHCARE ANALYTICS logo

QR Code

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_1.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_2.png)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_3.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_4.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_5.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_6.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_7.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_8.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_9.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_10.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/img_p0_11.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_image_3_v2.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_image_2_v2.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_chart_1_v2.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_image_4_v2.jpg)

![Extracted image from page 1](26-OPR26-OR-Poster-AM24-v2_2024_images/page_1_chart_2_v2.jpg)

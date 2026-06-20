# Using Real-World Data to Understand Treatment Variations in Migraine Patients Across Healthcare Settings

Diane M. Faraone, PharmD, PurpleLab™, Karina D’Angelo PhD., Parexel® International, Andreas Lysandropoulos, MD, PhD., Parexel® International

Logo

Parexel logo PurpleLab Healthcare Analytics logo

## Background

Headache disorders including migraine are highly prevalent and costly<sup>1</sup>. Studies<sup>2-8</sup> show that patients who do not receive appropriate migraine treatment access the health system to a greater extent<sup>9</sup> and are at higher risk of developing comorbid conditions<sup>10</sup>.

Both treatment and racial drivers may impact which therapies are preferred.<sup>11-13</sup> A patient-centered approach to symptoms and disease can shift care management from acute to a more specialized treatment pathway that better aligns with migraine population preferences.

## Objectives

* Understand variations in treatment with resulting shifts in care management that aligns with patient preferences and migraine-specific care.

* Observe if a relationship exists between racially diverse patients seeking care and healthcare provider (HCP) specialties, including alternative medicine providers.

## Methods

US representative claims data was analyzed with PurpleLab’s HealthNexus® data analytics platform in patients<sup>18-84</sup> years of age between 2018 and 2024 in the following migraine cohorts: Diagnosis (Dx), Diagnosis & Drug (Dx+Rx), Diagnosis & Acupuncture (Dx+AP), and Diagnosis & Other Procedures (Dx+Px).

Migraine and migraine subtypes were defined using ICD9CM, ICD10CM and Medicare Severity Diagnosis Related Groups (MS-DRGs). Drugs were defined using National Drug Code (NDCs) and HCPCS coding<sup>14</sup> which included selective serotonin (5HT) agonists (triptans), calcitonin gene-related peptide (CGRP) antagonists (monoclonal antibody and gpants), botulinum toxins, ergot derivatives, butalbital combinations, and homeopathic migraine preparations.

Other treatments included chemodenervation and local anesthetics. HCP specialty was identified using National Provider Identifier (NPI) taxonomy and patient volume in each treatment cohort.

## Conclusion

As patients sought treatment, there was a shift to HCPs who specialize in neurology, headache, pain, and CAM, compared to diagnosis cohort. This resulted in reduced ED and acute care encounters. Our analysis shows a potential relationship between racially diverse patients seeking care from specific HCP specialties, including alternative medicine providers. This was noted across all race subgroups, most notable in the Asian cohort where a higher percentage sought care from CAM providers. More specific treatment resulted reduction of acute and ED provider care and remained low or undetected as patients sought treatment from specialty HCPs. We identified treatment variations and care management shifting that may align with patient preference for certain migraine treatments. This evolving pattern of HCP specialty shifting in migraine management may align with diverse patient preferences and better outcomes.

## Results

We identified 9,102,934 patients attended by 645,716 healthcare providers (HCPs) during the analysis period and applied proprietary segmentation logic for HCPs specialty categories, defined by National Provider Identifier (NPI) taxonomy and patient volume for each treatment cohort. Similar to other studies<sup>15-20</sup> we observed migraine treatment begins in acute and general medicine settings, then proceeds to more specialized care, observed patient shift to HCP specialties in neurology, pain, and complementary and alternative medicine (CAM), and with this shift, a resulting decline in emergency department (ED) and acute migraine management, Fig. 1-4. Additionally, figure 5. illustrates HCP specialty distribution based on providers that had the highest percentages of relevant shifting with additional lines of therapy (across treatment cohorts).

HCP Specialty Distribution - Migraine Diagnosis

| Category                                                                        | Percentage |
| ------------------------------------------------------------------------------- | ---------- |
| Psychiatry & Neurology-Neurology                                                | 29.3%      |
| Family Medicine                                                                 | 19.1%      |
| Emergency Medicine                                                              | 11.4%      |
| Internal Medicine                                                               | 9.3%       |
| Radiology-Diagnostic Radiology                                                  | 3.8%       |
| Nurse Practitioner-Headache Disorders                                           | 3.6%       |
| Psychiatry & Neurology-Neurology with Special Qualifications in Child Neurology | 3.1%       |
| Pediatrics                                                                      | 3.0%       |
| Nurse Practitioner-General Practice                                             | 3.0%       |
| Psychiatry & Neurology-Clinical Neurophysiology                                 | 2.0%       |
| Nurse Practitioner-Pulmonary Disease                                            | 1.85%      |
| Ophthalmology                                                                   | 1.84%      |
| Nurse Practitioner-Family                                                       | 1.57%      |
| Physician Assistant-Pulmonary Disease                                           | 1.43%      |
| Pathology-Anatomic Pathology & Clinical Pathology                               | 1.31%      |
| Physician Assistant-Headache Disorders                                          | 1.29%      |
| Nurse Practitioner-Hypertension Disorders                                       | 1.22%      |
| Physician Assistant-General Practice                                            | 1.11%      |
| Radiology-Neuroradiology                                                        | 1.02%      |


Figure 1

HCP Specialty Distribution – Dx + Migraine Drug Treatment

| Category                                                                        | Percentage |
| ------------------------------------------------------------------------------- | ---------- |
| Psychiatry & Neurology-Neurology                                                | 46.2%      |
| Family Medicine                                                                 | 16.4%      |
| Nurse Practitioner-Headache Disorders                                           | 7.2%       |
| Internal Medicine                                                               | 6.4%       |
| Psychiatry & Neurology-Clinical Neurophysiology                                 | 3.1%       |
| Nurse Practitioner-General Practice                                             | 3.0%       |
| Physician Assistant-Headache Disorders                                          | 2.5%       |
| Psychiatry & Neurology-Neurology with Special Qualifications in Child Neurology | 2.4%       |
| Emergency Medicine                                                              | 1.8%       |
| Nurse Practitioner-Family                                                       | 1.63%      |
| Pediatrics                                                                      | 1.44%      |
| Physician Assistant-General Practice                                            | 1.35%      |
| Nurse Practitioner-Hypertension Disorders                                       | 1.30%      |
| Nurse Practitioner-Pulmonary Disease                                            | 1.17%      |
| Anesthesiology-Pain Medicine                                                    | 0.91%      |
| Physical Medicine & Rehabilitation                                              | 0.81%      |
| Psychiatry & Neurology-Neuromuscular Medicine                                   | 0.76%      |
| Physician Assistant                                                             | 0.72%      |
| Physician Assistant-Pulmonary Disease                                           | 0.68%      |


Figure 2

HCP Specialty Distribution – Dx + Acupuncture Treatment

| Category                                         | Percentage |
| ------------------------------------------------ | ---------- |
| Acupuncturist                                    | 82.4%      |
| Family Medicine                                  | 6.6%       |
| Naturopath                                       | 3.2%       |
| Internal Medicine                                | 2.64%      |
| Pediatrics                                       | 0.78%      |
| Psychiatry & Neurology-Neurology                 | 0.70%      |
| Nurse Practitioner-General Practice              | 0.67%      |
| Emergency Medicine                               | 0.64%      |
| Physical Medicine & Rehabilitation               | 0.44%      |
| Anesthesiology-Pain Medicine                     | 0.36%      |
| Physician Assistant-General Practice             | 0.31%      |
| Nurse Practitioner-Pulmonary Disease             | 0.31%      |
| Nurse Practitioner-Hypertension General Practice | 0.17%      |
| Nurse Practitioner-Family                        | 0.16%      |
| Physical Medicine & Rehabilitation-Pain Medicine | 0.14%      |
| Physician Assistant-Pulmonary Disease            | 0.12%      |
| Psychiatry & Neurology-Neuromuscular Medicine    | 0.11%      |
| Anesthesiology                                   | 0.10%      |
| Nurse Practitioner-Infectious Disease            | 0.10%      |


Figure 3

HCP Specialty Distribution – Dx + Other Procedures Treatment

| Category                                                                        | Percentage |
| ------------------------------------------------------------------------------- | ---------- |
| Psychiatry & Neurology-Neurology                                                | 63.6%      |
| Nurse Practitioner-Headache Disorders                                           | 10.0%      |
| Anesthesiology-Pain Medicine                                                    | 4.5%       |
| Physician Assistant-Headache Disorders                                          | 3.2%       |
| Anesthesiology                                                                  | 3.0%       |
| Family Medicine                                                                 | 2.8%       |
| Physical Medicine & Rehabilitation                                              | 2.4%       |
| Psychiatry & Neurology-Pain Medicine                                            | 1.34%      |
| Psychiatry & Neurology-Neurology with Special Qualifications in Child Neurology | 1.24%      |
| Pain Medicine-Interventional Pain Medicine                                      | 1.22%      |
| Nurse Practitioner-Family                                                       | 1.20%      |
| Anesthesiology                                                                  | 1.00%      |
| Psychiatry & Neurology-Neuromuscular Medicine                                   | 0.97%      |
| Physical Medicine & Rehabilitation-Pain Medicine                                | 0.96%      |
| Internal Medicine                                                               | 0.93%      |
| Physician Assistant                                                             | 0.68%      |
| Nurse Practitioner-Neurology                                                    | 0.46%      |
| Pain Medicine-Pain Medicine                                                     | 0.44%      |
| Physician Assistant-Rheumatology                                                | 0.44%      |


Figure 4

### Top HCP Specialty Distribution with Highest Percentages of Shifting Related to Line of Therapy

| HCP Specialty                          | Migraine Dx (Index) | Migraine Dx + Drugs | Migraine Dx + Acupuncture + Other Procedures | Migraine Dx + Drugs + Other Procedures |
| -------------------------------------- | ------------------- | ------------------- | -------------------------------------------- | -------------------------------------- |
| Psychiatry & Neurology Specialties     | 30                  | 45                  | 65                                           | 65                                     |
| General & Family medicine              | 20                  | 15                  | 5                                            | 5                                      |
| Complementary and Alternative Medicine | 2                   | 2                   | 85                                           | 2                                      |
| Acute Care/Emergency Department        | 12                  | 2                   | 2                                            | 2                                      |


Based on those providers with the highest percentages of relevant shifting that occurred with additional lines of therapy across treatment cohorts.
Figure 5

### Distribution by Race Across Migraine Treatment Cohorts

| Treatment Cohort      | White | Black/African American | Asian |
| --------------------- | ----- | ---------------------- | ----- |
| Migraine Dx           | 85.3% | 11.8%                  | 2.5%  |
| Migraine Dx + Rx      | 87.2% | 10.4%                  | 2%    |
| Migraine Dx + AP + Px | 89.3% | 7.1%                   | 3.1%  |
| Migraine Dx + Rx + Px | 89.8% | 7.8%                   | 2%    |
| Migraine Dx + Rx + AP | 88%   | 8.5%                   | 3.2%  |


Figure 6

We noted a non-proportional distribution for migraine diagnosis cohorts across reported racial groups with whites representing 85-90%, Black & African Americans between 7-12% and Asians between 2-3% (notably lower than reported-race prevalence of migraine 2-4).

White patients were more likely to seek multiple lines of therapy that included migraine-specific drugs, other procedures, and acupuncture to a lesser extent (87% vs. 89%). Black & African American patients tended toward migraine-specific drug treatment, other procedures and least for acupuncture (10% vs, 7%).

For Asian patients, less sought migraine-specific drug therapy (2%), either alone or with other procedures, and a more sought CAM that included acupuncture (3.2%), data not shown.

### References

1. Bonafede, M, Sapra S, Shah N, Tepper S, Cappell K, Desai P. Direct and indirect healthcare resource utilization and costs among migraine patients in the United States. Headache. 2018 May;58(5):700-714. doi: 10.1111/head.13275. Epub 2018 Feb 15. PMID: 29446063.

2. Stovner LJ, Hagen KH, Mattias L, Steiner TJ. The global prevalence of headache: and update, with analysis of the influences of methodological factors on prevalence estimates. The J Headache and Pain. 2022 Apr 12;23(1):34. doi: 10.1186/s10194-022-01402-2. PMID: 35410119; PMCID: PMC9004186.

3. Loder S, Sheikh HU, Loder E. The prevalence, burden, and treatment of severe, frequent, and migraine headaches in US minority populations: statistics from National survey studies. Headache. 2015 Feb 3;55(2):214-228. doi: 10.1111/head.12506, Epub 2015 Feb 3. PMID: 25644596

4. Befus DR, Hull S, de Oliveria JS, Schmidler GS, Weinberger M, Coeytaux RR. Nonpharmacological self-management of migraine across social locations: an equity-oriented, qualitative analysis. Glob Adv Health Med. 2019 Jun 13;8: 2164956119858034. doi: 10.1177/2164956119858034. PMID: 31223518; PMCID: PMC6566474

5. Kiarashi J, VanderPluym J, Szperka CL, Turner S, Minen MT, Broner S, et al. Factors associated with, and mitigation strategies for, health care disparities faced by patients with headache disorders. Neurology. 2021 Aug 10;97(6):280-289. doi: 10.1212/WNL.0000000000012261. Epub 2021 Jun 9. PMID: 34108270; PMCID: PMC8424498.

6. Racial disparities in migraine and headache care [Internet]. American Migraine Foundation. 2021 Feb 25 [cited 2024 Dec 10]. Available from: https://americanmigrainefoundation.org/resource-library/racial-disparities-in-migraine-care/

7. Inaccuracies in Medicare’s race and ethnicity data hinder the ability to assess health disparities [Internet]. U.S. Department of Health and Human Services Office of Inspector General Data Brief. 2022 Jun. OEI-02-21-00100. [cited 2024 Dec 10]. Available from: https://oig.hhs.gov/oei/reports/OEI-02-21-00100.pdf

8. Pressman AR, Buse DC, Jacobson AS, Vaidya SJ, Scott AB, Chia VM, et al. The migraine signature study: Methods and baseline results. Headache. 2021 Mar;61(3):462-484. doi: 10.1111/head.14033. Epub 2020 Dec 23. PMID: 33368248; PMCID: PMC8048806.

9. Buse DC, Reed ML, Fanning KM, Bostic R, Dodick DW, Schwedt TJ, et al. Comorbid and co-occurring conditions in migraine and associated risk of increasing headache pain intensity and headache frequency: results of the migraine in America symptoms and treatment (MAST) study. J Headache Pain. 2020 Mar 2;21(1):23. doi: 10.1186/s10194-020-1084-y. PMID: 32122324; PMCID: PMC7053108.

10. Petrova M, Besedina O, Hare B, Gupta A, Lakhan S. Comprehensive analysis of migraine burden and treatment trends: a retrospective cohort study of recent large multiple commercial payer databases (P9-12.005). Neurology. 2024 Apr 9;102(17_s1). doi.org/10.1212/WNL.0000000000208156.

11. Marmura MJ, Lin T, Harris D, Ironi A, Rosen NL. Incorporating Remote Electrical Neuromodulation (REN) Into Usual Care Reduces Acute Migraine Medication Use: An Open-Label Extension Study. Front Neurol. 2020 Apr 7;(11):226. doi: 10.3389/fneur.2020.00226. PMID: 32318014; PMCID: PMC7154105.

12. 10 complementary therapies that might ease headache pain [Internet]. Premier Health. 2021 Dec 14 [cited 2024 Dec 10]. Available from: https://www.premierhealth.com/your-health/articles/women-wisdom-wellness-/10-complementary-therapies-that-might-ease-headache-pain

13. Hepp Z, Rosen NL, Gillard PG, Varon SF, Mathew N, Dodick DW. Comparative effectiveness of onabotulinumtoxinA versus oral migraine prophylactic medications on headache-related resource utilization in the management of chronic migraine: Retrospective analysis of a US-based insurance claims database. Cephalalgia. 2016 Aug;36(9):862-74. doi: 10.1177/0333102415621294. Epub 2015 Dec 20. PMID: 26692400.

14. CPT® copyright American Medical Association Version 8. CPT® is a registered trademark of the American Medical Association

15. Nead KT, Hinkston CL, Wehner MR. Cautions When Using Race and Ethnicity in Administrative Claims Data Sets. JAMA Health Forum. 2022 Jul 1;3(7): e221812. doi: 10.1001/jamahealthforum.2022.1812. Erratum in: JAMA Health Forum. 2023 Jun 2;4(6): e231834. doi: 10.1001/jamahealthforum.2023.1834. PMID: 36218996.

16. Saadi A, Himmelstein DU, Woolhandler S, Mejia NI. Racial disparities in neurologic health care access and utilization in the United States. Neurology. 2017 Jun 13;88(24):2268-2275. doi: 10.1212/WNL.0000000000004025. Epub 2017 May 17. PMID: 28515272; PMCID: PMC5567325.

17. Yang S, Orlova Y, Lipe A, Boren M, Hincapie-Castillo JM, Park H, Chang CY, Wilson DL, Adkins L, Lo-Ciganic WH. Trends in the Management of Headache Disorders in US Emergency Departments: Analysis of 2007-2018 National Hospital Ambulatory Medical Care Survey Data. J Clin Med. 2022 Mar 3;11(5):1401. doi: 10.3390/jcm11051401. PMID: 35268492; PMCID: PMC8910868.

18. Adams AM, Serrano D, Buse DC, Reed ML, Marske V, Fanning KM, Lipton RB. The impact of chronic migraine: The Chronic Migraine Epidemiology and Outcomes (CaMEO) Study methods and baseline results. Cephalalgia. 2015 Jun;35(7):563-78. doi: 10.1177/0333102414552532. Epub 2014 Oct 10. PMID: 25304766; PMCID: PMC4430584.

19. Law HZ, Chung MH, Nissan G, Janis JE, Amirlak B. Hospital Burden of Migraine in United States Adults: A 15-year National Inpatient Sample Analysis. Plast Reconstr Surg Glob Open. 2020 Apr 23;8(4): e2790. doi: 10.1097/GOX.0000000000002790. PMID: 32440450; PMCID: PMC7209847.

20. Lipton RB, Nicholson RA, Reed ML, Araujo AB, Jaffe DH, Faries DE, Buse DC, Shapiro RE, Ashina S, Cambron-Mellott MJ, Rowland JC, Pearlman EM. Diagnosis, consultation, treatment, and impact of migraine in the US: Results of the OVERCOME (US) study. Headache. 2022 Feb;62(2):122-140. doi: 10.1111/head.14259. Epub 2022 Jan 25. PMID: 35076091; PMCID: PMC9305407.

© Copyright 2025 PurpleLab. All rights reserved.

NASP 2025 Annual Meeting & Expo | September 15 - 17 | Denver, CO

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/img_p0_1.png)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/img_p0_2.png)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/img_p0_3.png)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/img_p0_4.png)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/img_p0_5.png)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_1_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_2_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_3_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_image_2_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_4_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_6_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_image_3_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_chart_5_v2.jpg)

![Extracted image from page 1](1145-OPR19-OR-Poster-AM25_2025_images/page_1_image_4_v2.jpg)

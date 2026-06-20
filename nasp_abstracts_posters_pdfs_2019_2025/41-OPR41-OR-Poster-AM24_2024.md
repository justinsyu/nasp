SHIELDS HEALTH SOLUTIONS logo

# Impact of Integrated Health System Specialty Pharmacy Services and Associated Patient Factors on Inflammatory Bowel Disease Outcomes

Malerie Fiedler, PharmD, CSP; Bahareh Sameti, PharmD, CSP; Shreevidya Periyasamy, MS HIA; Y. Caleb Chun, MA; Martha Stutsky, PharmD, BCPS; Carolkim Huynh, PharmD, CSP

## BACKGROUND

* Inflammatory bowel disease (IBD) encompasses Crohn's disease (CD) and ulcerative colitis (UC). While CD and UC are clinically diverse, both are characterized by chronic inflammation of the gastrointestinal tract.
* Research suggests that a treat-to-target approach be used to manage this population, utilizing subjective and objective markers of disease.<sup>1</sup>
* Literature exists to support the role of a clinical pharmacy team in improving medication access, adherence, and quality of care; however, there are limited data on the pharmacy role in improving IBD outcomes.<sup>2-4</sup>
* This study aims to assess the impact of integrated health system specialty pharmacy [HSSP] services on IBD outcomes.

## Figure 1: HSSP IBD Patient Journey

```mermaid
graph LR
    A[Initialassessment] --> B[First-cyclefollow up]
    B --> C[Re-assessment]
    C --> D[ClinicalAssessment&Monitoring(every 10months)]

    subgraph Timeline
    direction LR
    T1[DAY 1] --- T2[MONTH 1] --- T3[MONTHS 2-3] --- T4[MONTH 4] --- T5[ONGOING]
    end

    A --- T1
    B --- T2
    C --- T4
    D --- T5

    CP[Clinical PharmacistInteraction]
    CL[Care LiaisonInteraction]

    B -.-> CP
    B -.-> CL
    C -.-> CP
    C -.-> CL
    D -.-> CP
    D -.-> CL
```

## METHODS

**Study Design**: Multi-center, retrospective observational analysis of adult and pediatric IBD patients receiving biologic or small molecule agents from HSSPs between January 1, 2022 and December 31, 2023
* **Inclusion Criteria**: Patients enrolled in the HSSP services for ≥ 4 months with a baseline and follow-up assessment of corticosteroid use, flares, and pain scores. Patients with ICD-10 codes unrelated to CD and UC were excluded.

**Primary Outcome**: percent reduction in corticosteroid usage from baseline

**Secondary Outcome**: percent reduction in IBD flares from baseline and reduction in average pain score from baseline

**Data Identification**: Data collected included age, sex, IBD medication, ICD-10 code, primary insurance type, treatment status, out-of-pocket cost, days on service, medication adherence measured by the proportion of days covered (PDC), corticosteroid use, number of IBD flares, and pain severity.

**Analysis**: A logistic regression model was utilized to evaluate the impact of various factors on changes in steroid use, flares, and pain.

## RESULTS

Table 1 summarizes patient characteristics and associated patient factors influence on steroid use, flares, and pain. The regression model showed that steroid-free and symptom-free patients at baseline were more likely to maintain positive outcomes at follow-up. We observed a 69% reduction in corticosteroid (Figure 2), 62% decrease in disease flares (Figure 3), and an average decrease in pain scores of 16% (Figure 4). The mean PDC was 94.5%.

### Table 1: Patient Characteristics and Associated Patient Factors

| Characteristic<br/>Age (n, %)   | N = 1373<br/>Age (n, %) | Steroid Use<br/>Age (n, %) | Flares<br/>Age (n, %) | Pain<br/>Age (n, %) |
| ------------------------------- | ----------------------- | -------------------------- | --------------------- | ------------------- |
| <65                             | 1198 (87%)              | -                          | -                     | -                   |
| ≥65                             | 175 (13%)               | 0.123                      | 0.150                 | 0.632\*\*           |
| Sex (n, %)                      |                         |                            |                       |                     |
| M                               | 655 (48%)               | 0.361\*                    | 0.422\*\*\*           | 0.123               |
| F                               | 688 (50%)               | -                          | -                     | -                   |
| Unknown                         | 30 (2%)                 | -0.448                     | 0.439                 | 0.713               |
| Diagnosis (n, %)                |                         |                            |                       |                     |
| UC                              | 398 (29%)               | -0.627\*\*\*               | -0.180                | 0.381\*\*           |
| CD                              | 975 (71%)               | -                          | -                     | -                   |
| Treatment Status (n, %)         |                         |                            |                       |                     |
| Experienced                     | 1119 (82%)              | -                          | -                     | -                   |
| Naïve                           | 254 (18%)               | 0.173                      | 0.071                 | 0.037               |
| Steroid Free at Baseline (n, %) | 1061 (77%)              | 2.115\*\*\*                |                       |                     |
| Symptom Free at Baseline (n, %) | 882 (64%)               |                            | 0.940\*\*\*           | 1.845\*\*\*         |
| Days of Service² (Range)        | 428                     | -0.002\*\*                 | 0.001\*               | 0.0002              |
|                                 | (129-727)               |                            |                       |                     |
| Insurance Type (n, %)           |                         |                            |                       |                     |
| Commercial                      | 629 (46%)               | -                          | -                     | -                   |
| Medicaid                        | 105 (8%)                | -0.558                     | -0.272                | -0.255              |
| Medicare                        | 209 (15%)               | -0.162                     | -0.103                | -0.255              |
| Unknown/Other                   | 430 (31%)               | 0.345                      | 0.091                 | 0.057               |
| Copay (n, %)                    |                         |                            |                       |                     |
| $0                              | 527 (38%)               | -                          | -                     | -                   |
| = $0                            | 846 (62%)               | 0.143                      | -0.118                | 0.138               |


\*p<0.1; \*\*p<0.05; \*\*\*p<0.01; <sup>2</sup> Median

### Figure 2: Corticosteroid Use

| Category              | Baseline | Follow Up |
| --------------------- | -------- | --------- |
| Total Population      | 312      | 95        |
| Treatment Naïve       | 81       | 22        |
| Treatment Experienced | 231      | 73        |


### Figure 3: IBD Flares

| Category              | Baseline | Follow Up |
| --------------------- | -------- | --------- |
| Total Population      | 491      | 186       |
| Treatment Naïve       | 124      | 47        |
| Treatment Experienced | 367      | 140       |


### Figure 4: Average Pain

| Category              | Baseline | Follow Up |
| --------------------- | -------- | --------- |
| Total Population      | 1.9      | 1.6       |
| Treatment Naïve       | 2.2      | 2.7       |
| Treatment Experienced | 1.8      | 1.5       |


## CONCLUSIONS

* IBD patients enrolled in HSSP services demonstrated clinically meaningful responses illustrated by the reduction in corticosteroid use, IBD flares, and average pain score.

* Patients achieved a consistently high adherence rate of 94.5%. This high adherence rate suggests the value of the HSSP in promoting adherence to specialty therapies.

* Steroid-free and symptom-free status at baseline are associated with positive outcomes, but additional analysis is needed to better identify what factors contribute to IBD outcomes.

* These findings highlight the potential for sustained disease control and improved quality of life. Additionally, they contribute to mitigating the risks associated with long-term corticosteroid use.

**DISCLOSURES**
The authors of this presentation have nothing to disclose concerning possible financial or personal relationships with commercial entities that may have a direct or indirect interest in the subject matter of this presentation.
Disclosure icon

**REFERENCES**
<sup>1</sup> Turner D, Ricciuto A, Lewis A, et al. STRIDE-II: An Update on the Selecting Therapeutic Targets in Inflammatory Bowel Disease (STRIDE) Initiative of the International Organization for the Study of IBD (IOIBD): Determining Therapeutic Goals for Treat-to-Target strategies in IBD. Gastroenterology. 2021;160(5):1570-1583. doi:https://doi.org/10.1053/j.gastro.2020.12.031
<sup>2</sup> Choi DK, Rubin DT, Puangampai A, Lach M. Role and Impact of a Clinical Pharmacy Team at an Inflammatory Bowel Disease Center. Crohn's & Colitis 360. 2023;5(2):otad018. doi:https://doi.org/10.1093/crocol/otad018
<sup>3</sup> Alrashed F, Almutairi N, Shehab M. The Role of Clinical Pharmacists in Improving Quality of Care in Patients with Inflammatory Bowel Disease: An Evaluation of Patients' and Physicians' Satisfaction. Healthcare. 2022;10(10):1818. doi:https://doi.org/10.3390/healthcare10101818
<sup>4</sup> Danielle Mae Thanh, Kandilian R, Khanh Le Nguyen. P099 Implementation of an Inflammatory Bowel Disease Clinical Pharmacy Service. The American Journal of Gastroenterology. 2019;114(1):S26-S26. doi:https://doi.org/10.14309/01.ajg.0000613364.78413.fd.

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_1.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_2.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_3.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_4.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_5.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_6.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_7.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_8.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_9.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/img_p0_10.png)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_2_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_3_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_chart_2_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_chart_1_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_4_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_5_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_6_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_image_7_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_chart_3_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_chart_5_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_chart_4_v2.jpg)

![Extracted image from page 1](41-OPR41-OR-Poster-AM24_2024_images/page_1_table_1_v2.jpg)

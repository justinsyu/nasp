# Streamlining Hepatitis C Management: A Collaborative Approach Between Clinical Pharmacists and Specialty Pharmacies

Geisinger logo

Susanne Burns PharmD, MBA, Allyson Hess PharmD, MBA, CSP, Amanda Popko PharmD, BCACP, Sara Gaines PharmD, BCPS

Geisinger, Danville, PA

**Background/Purpose:**

* Geisinger’s Medication Therapy Disease Management (MTDM) program has played a crucial role in initiating and monitoring therapy for patients with hepatitis C since 2016.

* A 99.7% sustained virologic response (SVR) rate has been achieved using collaborative management practices among physicians and pharmacists embedded in the clinics yet care between the clinics and the in-house specialty pharmacy (SP) was redundant and fragmented.

* Integration with in-house SP services aims to streamline care and improve outcomes.

**Objectives:**

* Describe the co-management workflow of MTDM pharmacists before and after integration with the SP.

* Evaluate the impact of this integration on:

    - Time to treatment initiation

    - Patient adherence

    - Number of patient outreaches

**Baseline Metrics :**

* Data collected using data from EPIC Hyperspace and Willow Ambulatory

| Embedded Hepatology Pharmacists   | 2      |
| --------------------------------- | ------ |
| Hep C Specialty Pharmacists       | 3      |
| Average Start to Treatment (days) | 3.42   |
| Average Touchpoints per Treatment | 9      |
| Patients Managed                  | 294    |
| Proportion of Days Covered (PDC)  | 95.64% |
| SVR Rate                          | 99.7%  |


**Process:**
**Baseline:**
Independent workflows

```mermaid
graph TD
    subgraph MTDM_Pharmacist [MTDM Pharmacist]
        A1[Referral] --> A2[Pre-visit review]
        A2 --> A3[Provider/RPh visit]
        A3 --> A4[Issue Rx to health system SP]
        A4 --> A5[4 week - on-treatment Visit]
        A5 --> A6[End of treatment visit]
        A6 --> A7[12 week - SVR visit]
    end

    subgraph Specialty_Pharmacy [Health System Specialty Pharmacy]
        B1[Rx Intake/Dispense] --> B2[Initial assessment]
        B2 --> B3[1 week - reassessment]
        B3 --> B4[Monthly refill calls]
        B4 --> B5["4 weeks after end of treatment + final assessment"]
    end

    A4 -.-> B1
    A5 --- B3
    A6 --- B5
    
    style Specialty_Pharmacy fill:#f9f,stroke:#333,stroke-width:2px
    style MTDM_Pharmacist fill:#bbf,stroke:#333,stroke-width:2px
```
\* Pharmacist Redundancy

**Integrated:**
Bidirectional communication between teams to reduce duplicative work

```mermaid
graph TD
    subgraph MTDM_Pharmacist_Int [MTDM Pharmacist]
        C1[Referral] --> C2[Pre-visit review]
        C2 --> C3["Provider/RPh visit + initial assessment"]
        C3 --> C4[Issue Rx to health system SP]
        C4 --> C5["4 week - on-treatment visit + reassessment"]
        C5 --> C6[End of treatment visit]
        C6 --> C7["12 week - SVR visit + final assessment"]
    end

    subgraph Specialty_Pharmacy_Int [Health System Specialty Pharmacy]
        D1[Rx Intake/Dispense] --> D2[1 week - follow-up call]
        D2 --> D3[Monthly refill calls]
    end

    C4 -.-> D1
    
    style Specialty_Pharmacy_Int fill:#f9f,stroke:#333,stroke-width:2px
    style MTDM_Pharmacist_Int fill:#bbf,stroke:#333,stroke-width:2px
```

**Notable Process Changes:**

* Initial assessment completed at in-person joint visit with provider and pharmacist

* Health System SP completing 1 week follow-up call to verify patient received medication and started therapy

* Reassessment completed by embedded pharmacist with on-treatment lab visit

* Final assessment completed during visit to confirm SVR and provide end of treatment education

**Conclusions:**

* Integrating MTDM clinical pharmacist workflows with specialty pharmacy patient management programs is anticipated to streamline care.

* Minimizing delays caused by missed patient communication is expected to increase efficiency, thus resulting in quicker initiation of therapy.

* This integrated clinical management model can be applied broadly across specialties with embedded pharmacists or when designing specialty pharmacy clinical programs.

**Next Steps:**

* The effectiveness of the integrated model will be assessed by comparing the number of patient outreaches and the time to initiation of treatment.

* Adherence rates before and after implementation will be evaluated to assess the impact of fewer touchpoints.

* Pharmacist engagement will be analyzed after elimination of duplicative tasks.

**Acknowledgements:**

Alesha Lane, PharmD

Presented at 2025 National Association of Specialty Pharmacy Annual Meeting, Denver, Colorado

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/img_p0_1.png)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/img_p0_2.png)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/img_p0_3.png)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/page_1.jpg)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/page_1_image_1_v2.jpg)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/page_1_table_1_v2.jpg)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/page_1_chart_1_v2.jpg)

![Extracted image from page 1](1184-PSP84-RP-Poster-AM25_2025_images/page_1_chart_2_v2.jpg)

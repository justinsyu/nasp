import csv
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CORPUS_DIR = ROOT / "nasp_abstracts_posters_pdfs_2019_2025"
MANIFEST = CORPUS_DIR / "download_manifest.csv"
OUT_JSON = ROOT / "assets" / "data" / "presentations-index.json"
OUT_MD = ROOT / "assets" / "data" / "nasp_abstracts_posters.md"
OUT_METHODS_JSON = ROOT / "assets" / "data" / "methods-analysis.json"


CATEGORY_RULES = {
    "Access & Affordability": [
        "access", "authorization", "benefit", "copay", "cost", "financial assistance",
        "limited distribution", "payer", "prior authorization", "reimbursement",
    ],
    "Adherence & Persistence": [
        "adherence", "compliance", "discontinuation", "gap", "pdc", "persistence",
        "proportion of days covered", "refill",
    ],
    "Clinical Outcomes": [
        "clinical outcome", "efficacy", "hospitalization", "outcome", "safety",
        "therapy", "treatment", "utilization",
    ],
    "Health-System Specialty Pharmacy": [
        "health-system", "health system", "integrated", "clinic", "collaborative",
        "embedded", "liaison", "specialty pharmacy services",
    ],
    "Operations & Quality": [
        "accreditation", "call center", "delivery", "implementation", "intervention",
        "operations", "process", "quality", "workflow",
    ],
    "Patient Experience & Support": [
        "caregiver", "education", "engagement", "experience", "outreach", "patient reported",
        "patient satisfaction", "quality of life", "support program",
    ],
    "Real-World Evidence & Analytics": [
        "claims", "cohort", "database", "evidence", "real-world", "retrospective",
        "review", "study", "survey",
    ],
    "Workforce & Education": [
        "extern", "pharmacist", "residency", "staff", "student", "technician",
        "training", "workforce",
    ],
}

THERAPY_RULES = {
    "Oncology": ["cancer", "carcinoma", "chemotherapy", "leukemia", "lymphoma", "myeloma", "oncology", "tumor"],
    "Inflammatory & Autoimmune": ["adalimumab", "arthritis", "crohn", "dermatitis", "ibd", "inflammatory", "psoriasis", "rheumatology", "ulcerative colitis"],
    "Neurology": ["als", "cgrp", "migraine", "multiple sclerosis", "neurology", "parkinson", "seizure"],
    "Infectious Disease": ["covid", "hcv", "hepatitis", "hiv", "infectious", "prep", "vaccine"],
    "Cardiometabolic": ["cardiovascular", "diabetes", "heart", "hyperkalemia", "lipid", "obesity", "pcsk9"],
    "Rare Disease": ["cystic fibrosis", "hemophilia", "hereditary", "orphan", "rare", "sickle"],
    "Renal": ["kidney", "renal", "dialysis"],
    "Respiratory": ["asthma", "pulmonary", "respiratory"],
}

METHOD_RULES = [
    {
        "id": "descriptive",
        "label": "Descriptive analyses",
        "description": "Counts, percentages, means, medians, standard deviations, interquartile ranges, or summary statistics.",
        "patterns": [
            r"\bdescriptive (?:statistics|analysis|analyses)\b",
            r"\bmean\b|\bmedian\b|\binterquartile range\b|\bIQR\b|\bstandard deviation\b|\bSD\b",
            r"\bn\s*\(%\)|\bpercent(?:age)?s?\b",
        ],
    },
    {
        "id": "pre_post",
        "label": "Pre/post or before/after comparison",
        "description": "Analyses comparing outcomes before and after a program, protocol, access change, or intervention.",
        "patterns": [
            r"\bpre[- ](?:protocol|implementation|intervention|access|period|group)\b",
            r"\bpost[- ](?:protocol|implementation|intervention|access|period|group)\b",
            r"\bbefore and after\b|\bpre/post\b|\bpre-?post\b",
        ],
    },
    {
        "id": "between_group",
        "label": "Between-group comparison",
        "description": "Formal or explicit comparison of cohorts, treatment groups, pharmacy types, participants versus non-participants, or exposure groups.",
        "patterns": [
            r"\bcompared (?:with|to|between)\b|\bcomparison (?:of|between)\b",
            r"\bintervention group\b|\bcontrol group\b|\btest group\b|\bmatched control\b",
            r"\bchi[- ]?square\b|\bt[- ]?test\b|\bMann[- ]?Whitney\b|\bMann[- ]?U\b|\bWilcoxon\b|\bFisher'?s exact\b|\bANOVA\b",
        ],
    },
    {
        "id": "statistical_testing",
        "label": "Statistical significance testing",
        "description": "Use of p-values, confidence intervals, hypothesis tests, or significance thresholds.",
        "patterns": [
            r"\bp[- ]?value\b|\bp\s*[<=>]\s*\.?\d",
            r"\bstatistically significant\b|\bsignificant at\b|\bsignificance\b",
            r"\b95%\s*(?:confidence interval|CI)\b|\bconfidence interval\b",
        ],
    },
    {
        "id": "regression",
        "label": "Regression or multivariable modeling",
        "description": "Regression models, odds ratios, hazard ratios, mediation, mixed effects, or other modeled estimates.",
        "patterns": [
            r"\bregression\b|\blogistic regression\b|\blinear regression\b|\bmultivariable\b|\bmultivariate\b",
            r"\bCox\b|\bproportional hazards\b|\bmixed effects\b|\bmediation analysis\b",
            r"\bodds ratio\b|\bOR\s*[=:]\s*\d|\bhazard ratio\b|\bHR\s*[=:]\s*\d",
        ],
    },
    {
        "id": "adjustment",
        "label": "Adjustment for confounding",
        "description": "Adjustment, matching, covariates, controls, propensity scores, or explicit confounder handling.",
        "patterns": [
            r"\badjust(?:ed|ing)? for\b|\bafter adjusting\b|\badjustment\b",
            r"\bconfound(?:er|ers|ing)\b|\bcovariate(?:s)?\b|\bcontrol variables\b",
            r"\bpropensity score\b|\bmatched\b|\bmatching\b|\brisk adjust",
        ],
    },
    {
        "id": "time_to_event",
        "label": "Time-to-event or survival methods",
        "description": "Kaplan-Meier, log-rank, Cox proportional hazards, persistence survival, or time-to-event analyses.",
        "patterns": [
            r"\bKaplan[- ]Meier\b|\blog[- ]rank\b|\bCox\b|\bproportional hazards\b",
            r"\btime to (?:non-)?persistence\b|\btime[- ]to[- ]event\b|\bsurvival analysis\b",
        ],
    },
    {
        "id": "correlation",
        "label": "Correlation or association analysis",
        "description": "Correlation, association testing, relationship testing, or bivariate association methods.",
        "patterns": [
            r"\bcorrelation\b|\bcorrelated\b|\bassociation between\b|\bassociated with\b",
            r"\bPearson\b|\bSpearman\b|\bbivariate\b",
        ],
    },
    {
        "id": "survey",
        "label": "Survey or patient-reported analysis",
        "description": "Survey response, satisfaction, patient-reported outcome, PROM, or questionnaire analysis.",
        "patterns": [
            r"\bsurvey\b|\bquestionnaire\b|\brespondent(?:s)?\b",
            r"\bpatient[- ]reported\b|\bPROMIS\b|\bsatisfaction\b|\bquality of life\b",
        ],
    },
    {
        "id": "qualitative",
        "label": "Qualitative or thematic analysis",
        "description": "Qualitative, thematic, interview, focus group, free-text, or content analysis.",
        "patterns": [
            r"\bqualitative\b|\bthematic analysis\b|\btheme(?:s)?\b",
            r"\binterview(?:s)?\b|\bfocus group(?:s)?\b|\bfree[- ]text\b|\bcontent analysis\b",
        ],
    },
    {
        "id": "economic",
        "label": "Cost or economic analysis",
        "description": "Medical cost, pharmacy cost, PMPM, cost avoidance, savings, financial or economic outcomes.",
        "patterns": [
            r"\bcost(?:s)?\b|\bmedical expense\b|\bpharmacy expense\b|\bPMPM\b|\bPMPY\b",
            r"\bsavings\b|\bcost avoidance\b|\bbudget impact\b|\beconomic\b|\bfinancial\b",
        ],
    },
    {
        "id": "adherence_metrics",
        "label": "Adherence or persistence metrics",
        "description": "PDC, MPR, persistence, refill gaps, therapy gaps, days on therapy, or discontinuation metrics.",
        "patterns": [
            r"\bproportion of days covered\b|\bPDC\b|\bmedication possession ratio\b|\bMPR\b",
            r"\bpersistence\b|\bpersistency\b|\btherapy gap(?:s)?\b|\bdays on therapy\b|\bDOT\b|\bdiscontinuation\b",
        ],
    },
    {
        "id": "real_world_data",
        "label": "Retrospective/RWE data source",
        "description": "Retrospective, real-world, claims, EHR, chart review, database, registry, or pharmacy-record analyses.",
        "patterns": [
            r"\bretrospective\b|\breal[- ]world\b|\bclaims\b|\bdatabase\b|\bregistry\b",
            r"\bchart review\b|\belectronic health record\b|\bEHR\b|\bEMR\b|\bpharmacy records?\b",
        ],
    },
]

DESIGN_RULES = [
    ("Retrospective cohort", [r"\bretrospective[, -]+cohort\b", r"\bretrospective cohort study\b"]),
    ("Retrospective review/analysis", [r"\bretrospective\b"]),
    ("Prospective study", [r"\bprospective\b"]),
    ("Pre/post or quality-improvement study", [r"\bpre[- ]post\b", r"\bbefore and after\b", r"\bquality improvement\b", r"\bQI\b"]),
    ("Cross-sectional or survey study", [r"\bcross[- ]sectional\b", r"\bsurvey\b", r"\bquestionnaire\b"]),
    ("Case study or implementation report", [r"\bcase study\b", r"\bimplementation\b", r"\bpilot\b"]),
    ("Literature review", [r"\bliterature review\b", r"\bsystematic review\b", r"\bscoping review\b"]),
]

DATA_SOURCE_RULES = [
    ("Claims or administrative data", [r"\bclaims\b", r"\badministrative data\b", r"\bbeneficiaries\b"]),
    ("Electronic health record / chart review", [r"\belectronic health record\b", r"\bEHR\b", r"\bEMR\b", r"\bchart review\b", r"\bmedical record\b"]),
    ("Pharmacy dispensing or refill data", [r"\bdispens(?:e|ed|ing)\b", r"\brefill\b", r"\bpharmacy records?\b", r"\bpharmacy software\b"]),
    ("Survey or patient-reported data", [r"\bsurvey\b", r"\bquestionnaire\b", r"\bpatient[- ]reported\b", r"\bPROMIS\b"]),
    ("Operational or program data", [r"\bworkflow\b", r"\bturnaround\b", r"\bcall center\b", r"\bprogram\b", r"\bdashboard\b"]),
]

OUTCOME_RULES = [
    {
        "id": "pdc",
        "label": "Proportion of days covered (PDC)",
        "category": "Adherence and persistence",
        "description": "Medication adherence measured as proportion of days covered.",
        "patterns": [r"\bproportion of days covered\b|\bPDC\b"],
    },
    {
        "id": "mpr",
        "label": "Medication possession ratio (MPR)",
        "category": "Adherence and persistence",
        "description": "Medication adherence measured as medication possession ratio.",
        "patterns": [r"\bmedication possession ratio\b|\bMPR\b"],
    },
    {
        "id": "adherence_rate",
        "label": "Adherence rate or optimal adherence",
        "category": "Adherence and persistence",
        "description": "Adherence rate, compliance, optimal adherence, or adherence score.",
        "patterns": [r"\badherence (?:rate|rates|score|scores|level|levels)\b", r"\boptimal adherence\b", r"\bmedication adherence\b"],
    },
    {
        "id": "persistence",
        "label": "Persistence / remaining on therapy",
        "category": "Adherence and persistence",
        "description": "Persistence, persistency, remaining on therapy, or therapy continuation.",
        "patterns": [r"\bpersisten(?:ce|cy)\b", r"\bremaining on therapy\b", r"\btherapy continuation\b"],
    },
    {
        "id": "days_on_therapy",
        "label": "Days on therapy (DOT)",
        "category": "Adherence and persistence",
        "description": "Duration or days on therapy.",
        "patterns": [r"\bdays on therapy\b|\bDOT\b", r"\bduration (?:of )?therapy\b"],
    },
    {
        "id": "gap_days",
        "label": "Gap days / therapy gaps",
        "category": "Adherence and persistence",
        "description": "Gap days, refill gaps, lapse in therapy, or therapy gaps.",
        "patterns": [r"\bgap days\b|\btherapy gap(?:s)?\b|\brefill gap(?:s)?\b|\blapse in therapy\b"],
    },
    {
        "id": "discontinuation",
        "label": "Therapy discontinuation",
        "category": "Adherence and persistence",
        "description": "Discontinuation rate, early discontinuation, treatment discontinuation, or therapy stop.",
        "patterns": [r"\bdiscontinuation (?:rate|rates|percentage|reasons?)\b", r"\bearly discontinuation\b", r"\btreatment discontinuation\b", r"\btherapy discontinuation\b"],
    },
    {
        "id": "refill_fill",
        "label": "Refills, fills, or prescription volume",
        "category": "Access and operations",
        "description": "Prescription fills, refill completion, additional fills, claims, or volume served.",
        "patterns": [r"\badditional fills\b", r"\bnumber of fills\b", r"\bprescriptions? (?:filled|dispensed|processed)\b", r"\bclaim(?:s)? volume\b"],
    },
    {
        "id": "time_to_access",
        "label": "Time to access / script-to-mouth",
        "category": "Access and operations",
        "description": "Time to medication access, script-to-mouth time, initiation time, or time to treatment start.",
        "patterns": [r"\bscript[- ]to[- ]mouth\b", r"\btime to (?:medication )?access\b", r"\btime to initiation\b", r"\btime to treatment\b"],
    },
    {
        "id": "turnaround_time",
        "label": "Turnaround time (TAT)",
        "category": "Access and operations",
        "description": "Turnaround time, TAT, referral turnaround, or prior authorization turnaround.",
        "patterns": [r"\bturnaround time\b|\bTAT\b", r"\btime from .* to .*\b"],
    },
    {
        "id": "prior_authorization",
        "label": "Prior authorization outcomes",
        "category": "Access and operations",
        "description": "Prior authorization approval, denial, submission, renewal, or turnaround.",
        "patterns": [r"\bprior authorization\b|\bPA denial\b|\bPA approval\b|\breauthorization\b"],
    },
    {
        "id": "referrals",
        "label": "Referrals / signed referrals",
        "category": "Access and operations",
        "description": "Referral volume, signed referrals, referral completion, or referral conversion.",
        "patterns": [r"\bsigned referrals?\b", r"\bnumber of referrals?\b", r"\breferral(?:s)? (?:volume|completion|conversion)\b"],
    },
    {
        "id": "outreach_engagement",
        "label": "Outreach, engagement, or response",
        "category": "Access and operations",
        "description": "Patient outreach, engagement, contact, reach rate, survey response, or text/call completion.",
        "patterns": [r"\boutreach(?:es)?\b", r"\bengagement\b", r"\breach(?:ed| rate)\b", r"\bresponse rate\b", r"\btexts? (?:delivered|sent|clicked)\b"],
    },
    {
        "id": "enrollment_retention",
        "label": "Enrollment, retention, or program participation",
        "category": "Access and operations",
        "description": "Enrollment, retention, participation, opt-in, or patients on service.",
        "patterns": [r"\benrollment\b|\benrolled\b", r"\bretention\b|\bretained patient\b", r"\bprogram participation\b", r"\bpatients? on service\b"],
    },
    {
        "id": "interventions",
        "label": "Pharmacist or staff interventions",
        "category": "Access and operations",
        "description": "Intervention counts, clinical interventions, pharmacist consults, or recommendations.",
        "patterns": [
            r"\b(?:number|count|percentage|rate|types?) of (?:pharmacist|clinical|staff)?\s*interventions?\b",
            r"\b(?:pharmacist|clinical|staff)?\s*intervention(?:s)? (?:documented|made|completed|activities|categories|types)\b",
            r"\bpharmacist consults?\b",
            r"\brecommendations? (?:accepted|made|documented)\b",
        ],
    },
    {
        "id": "hospitalization",
        "label": "Hospitalizations or admissions",
        "category": "Clinical outcomes",
        "description": "Hospitalizations, admissions, readmissions, or inpatient utilization.",
        "patterns": [r"\bhospitalizations?\b", r"\badmissions?\b", r"\breadmissions?\b", r"\binpatient utilization\b"],
    },
    {
        "id": "adverse_events",
        "label": "Adverse events / side effects",
        "category": "Clinical outcomes",
        "description": "Adverse events, side effects, toxicity, safety events, or drug intolerance.",
        "patterns": [r"\badverse events?\b|\bAEs\b", r"\bside effects?\b", r"\btoxicit(?:y|ies)\b", r"\bdrug intolerance\b", r"\bsafety events?\b"],
    },
    {
        "id": "disease_activity",
        "label": "Disease activity / severity scores",
        "category": "Clinical outcomes",
        "description": "Disease activity or severity scores such as RAPID3.",
        "patterns": [r"\bdisease activity\b", r"\bRAPID[- ]?3\b", r"\bseverity score(?:s)?\b"],
    },
    {
        "id": "viral_suppression",
        "label": "Viral suppression / viral response",
        "category": "Clinical outcomes",
        "description": "HIV or hepatitis viral suppression, viral load, viral response, cure rate, or SVR.",
        "patterns": [r"\bviral suppression\b", r"\bviral response\b", r"\bviral load\b", r"\bcure rate\b", r"\bSVR\b"],
    },
    {
        "id": "hba1c",
        "label": "HbA1c / A1C",
        "category": "Clinical outcomes",
        "description": "Hemoglobin A1c or A1C outcomes.",
        "patterns": [r"\bHbA1c\b|\bA1C\b"],
    },
    {
        "id": "fev1",
        "label": "FEV1 / pulmonary function",
        "category": "Clinical outcomes",
        "description": "FEV1 or pulmonary-function outcomes.",
        "patterns": [r"\bFEV\s*1\b|\bFEV<sub>1</sub>\b|\bforced expiratory volume\b"],
    },
    {
        "id": "bmi",
        "label": "Body mass index (BMI)",
        "category": "Clinical outcomes",
        "description": "BMI or body mass index.",
        "patterns": [r"\bbody mass index\b|\bBMI\b"],
    },
    {
        "id": "pulmonary_exacerbations",
        "label": "Pulmonary exacerbations",
        "category": "Clinical outcomes",
        "description": "Pulmonary exacerbations, PEx, or asthma exacerbation risk.",
        "patterns": [r"\bpulmonary exacerbations?\b|\bPEx\b", r"\basthma exacerbation\b"],
    },
    {
        "id": "molecular_response",
        "label": "Molecular response / BCR-ABL",
        "category": "Clinical outcomes",
        "description": "Molecular response patterns or BCR-ABL transcript levels.",
        "patterns": [r"\bmolecular response\b", r"\bBCR[- ]ABL\b"],
    },
    {
        "id": "pain_flares_symptoms",
        "label": "Pain, flares, or symptom burden",
        "category": "Clinical outcomes",
        "description": "Pain, flares, symptom burden, symptom-free days, or asthma control.",
        "patterns": [r"\bpain and flares\b", r"\bflares\b", r"\bsymptom burden\b", r"\bsymptom[- ]free days\b", r"\basthma control\b"],
    },
    {
        "id": "quality_of_life",
        "label": "Quality of life",
        "category": "Patient-reported outcomes",
        "description": "Quality of life or health-related quality of life.",
        "patterns": [r"\bquality of life\b", r"\bhealth[- ]related quality of life\b"],
    },
    {
        "id": "patient_satisfaction",
        "label": "Patient satisfaction",
        "category": "Patient-reported outcomes",
        "description": "Patient satisfaction, satisfaction survey, or experience score.",
        "patterns": [r"\bpatient satisfaction\b", r"\bsatisfaction survey\b", r"\bexperience score\b"],
    },
    {
        "id": "nps",
        "label": "Net Promoter Score (NPS)",
        "category": "Patient-reported outcomes",
        "description": "Net Promoter Score or NPS.",
        "patterns": [r"\bNet Promoter Score\b|\bNPS\b"],
    },
    {
        "id": "prom",
        "label": "Patient-reported outcome measures (PROMs)",
        "category": "Patient-reported outcomes",
        "description": "Patient-reported outcomes, PROMs, PRO scores, AIRQ, or questionnaire-based outcome measures.",
        "patterns": [
            r"\bpatient[- ]reported outcomes?\s+(?:were|was)?\s*(?:evaluated|assessed|measured|collected)\b",
            r"\bPROs?\s+(?:were|was)?\s*(?:evaluated|assessed|measured|collected)\b",
            r"\bPROMIS\b|\bPROMs?\b|\bAIRQ\b|\bEORTC\b|\bEQ-5D\b",
        ],
    },
    {
        "id": "cost_savings",
        "label": "Cost savings / cost avoidance",
        "category": "Economic outcomes",
        "description": "Cost savings, cost avoidance, projected savings, budget impact, or payer savings.",
        "patterns": [r"\bcost avoidance\b", r"\bcost savings\b|\bsavings\b", r"\bprojected cost\b", r"\bbudget impact\b"],
    },
    {
        "id": "costs",
        "label": "Medical, pharmacy, or total costs",
        "category": "Economic outcomes",
        "description": "Medical cost, pharmacy cost, total cost, claims dollars, PMPM, or PMPY.",
        "patterns": [r"\bmedical costs?\b", r"\bpharmacy costs?\b", r"\btotal costs?\b", r"\bclaims dollars\b", r"\bPMPM\b|\bPMPY\b"],
    },
    {
        "id": "copay_oop",
        "label": "Copay / out-of-pocket cost",
        "category": "Economic outcomes",
        "description": "Copay, patient out-of-pocket cost, or per-script copay.",
        "patterns": [r"\bcopay(?:s)?\b", r"\bout[- ]of[- ]pocket\b", r"\bOOP\b"],
    },
    {
        "id": "financial_assistance",
        "label": "Financial assistance",
        "category": "Economic outcomes",
        "description": "Financial assistance, grants, foundations, or patient assistance.",
        "patterns": [r"\bfinancial assistance\b", r"\bpatient assistance\b", r"\bfoundation assistance\b", r"\bgrant(?:s)?\b"],
    },
    {
        "id": "waste_stockpiling",
        "label": "Medication waste / stockpiling",
        "category": "Economic outcomes",
        "description": "Medication waste, unnecessary fills, held dispenses, or stockpiling.",
        "patterns": [r"\bmedication waste\b", r"\bstockpiling\b", r"\bheld dispenses?\b", r"\bunnecessary (?:fills|refills)\b"],
    },
    {
        "id": "revenue",
        "label": "Revenue",
        "category": "Economic outcomes",
        "description": "Revenue or financial return.",
        "patterns": [r"\brevenue\b"],
    },
    {
        "id": "provider_satisfaction",
        "label": "Provider satisfaction",
        "category": "Experience and quality",
        "description": "Provider satisfaction or provider survey results.",
        "patterns": [r"\bprovider satisfaction\b", r"\bprovider survey\b"],
    },
    {
        "id": "rems_compliance",
        "label": "REMS or audit compliance",
        "category": "Experience and quality",
        "description": "REMS compliance, audit compliance, or compliance with required program processes.",
        "patterns": [r"\bREMS\b", r"\baudit compliance\b", r"\bcompliance with\b"],
    },
    {
        "id": "safety_incidents",
        "label": "Safety incidents",
        "category": "Experience and quality",
        "description": "Safety incidents, medication errors, or incident reports.",
        "patterns": [r"\bsafety incidents?\b", r"\bmedication errors?\b", r"\bincident reports?\b"],
    },
    {
        "id": "testing_uptake",
        "label": "Testing, screening, or risk-assessment uptake",
        "category": "Experience and quality",
        "description": "Genetic testing, screening, assessment completion, or risk stratification uptake.",
        "patterns": [r"\bgenetic testing\b", r"\bscreening\b", r"\brisk assessment\b", r"\brisk stratification\b", r"\bassessment completion\b"],
    },
]

ORG_PATTERNS = [
    ("Vanderbilt Health / VUMC", [r"\bVanderbilt\b", r"\bVUMC\b"]),
    ("CVS Health", [r"\bCVS Health\b", r"\bCVS Specialty\b", r"\bCaremark\b"]),
    ("CenterWell / Humana", [r"\bCenterWell\b", r"\bHumana\b"]),
    ("Optum", [r"\bOptum\b"]),
    ("Trellis Rx", [r"\bTrellis Rx\b"]),
    ("Shields Health Solutions", [r"\bShields Health Solutions\b", r"\bShields\b"]),
    ("Walgreens", [r"\bWalgreens\b", r"\bAllianceRx\b"]),
    ("Accredo / Express Scripts", [r"\bAccredo\b", r"\bExpress Scripts\b", r"\bEvernorth\b"]),
    ("Fairview Pharmacy Services", [r"\bFairview\b"]),
    ("Yale New Haven Health", [r"\bYale New\s*Haven\b", r"\bYale NewHaven\b"]),
    ("Atrium Health", [r"\bAtrium Health\b"]),
    ("Wake Forest Baptist Health", [r"\bWake Forest Baptist\b"]),
    ("Penn Medicine / University of Pennsylvania", [r"\bPenn Medicine\b", r"\bUniversity of Pennsylvania\b"]),
    ("University Hospitals", [r"\bUniversity Hospitals\b"]),
    ("Cleveland Clinic", [r"\bCleveland Clinic\b"]),
    ("Johns Hopkins", [r"\bJohns Hopkins\b"]),
    ("Mayo Clinic", [r"\bMayo Clinic\b"]),
    ("Children's Hospital of Orange County", [r"\bChildren'?s Hospital of Orange County\b", r"\bCHOC\b"]),
    ("AcariaHealth", [r"\bAcariaHealth\b"]),
    ("PANTHERx", [r"\bPANTHERx\b"]),
    ("Kroger Specialty Pharmacy", [r"\bKroger\b"]),
    ("Orsini Specialty Pharmacy", [r"\bOrsini\b"]),
    ("BioPlus Specialty Pharmacy", [r"\bBioPlus\b"]),
    ("HealthBeacon", [r"\bHealthBeacon\b"]),
    ("CPS Solutions", [r"\bCPS Solutions\b", r"\bCPS\b"]),
    ("Clearway Health", [r"\bClearway Health\b", r"\bClearway\b"]),
    ("Maxor / VytlOne", [r"\bMaxor\b", r"\bVytlOne\b"]),
    ("AbbVie", [r"\bAbbVie\b"]),
    ("Amgen", [r"\bAmgen\b"]),
    ("Apellis", [r"\bApellis\b"]),
    ("Sanofi", [r"\bSanofi\b"]),
    ("Janssen / Johnson & Johnson", [r"\bJanssen\b", r"\bJohnson & Johnson\b"]),
    ("Pfizer", [r"\bPfizer\b"]),
    ("Novartis", [r"\bNovartis\b"]),
    ("Gilead", [r"\bGilead\b"]),
    ("Takeda", [r"\bTakeda\b"]),
    ("Biogen", [r"\bBiogen\b"]),
    ("Eli Lilly", [r"\bEli Lilly\b", r"\bLilly\b"]),
]


def clean_text(value: str) -> str:
    value = value.replace("\ufeff", "").replace("\u00a0", " ")
    value = value.replace("â€“", "-").replace("â€™", "'").replace("â€œ", '"').replace("â€\u009d", '"')
    value = re.sub(r"<[^>]+>", "", value)
    value = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", value)
    value = re.sub(r"```.*?```", "", value, flags=re.S)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def first_heading(markdown: str, fallback: str) -> str:
    match = re.search(r"^#\s+(.+)$", markdown, flags=re.M)
    if match:
        return clean_text(match.group(1))
    stem = re.sub(r"_20\d{2}$", "", fallback)
    return stem.replace("-", " ").replace("_", " ").strip().title()


def poster_code(filename: str) -> str:
    stem = Path(filename).stem
    stem = re.sub(r"_20\d{2}$", "", stem)
    match = re.match(r"^(\d{1,4}-[A-Z]{2,4}\d{1,3}(?:-[A-Z]{2})?)", stem, flags=re.I)
    if match:
        return match.group(1).upper()
    match = re.match(r"^(\d{1,4})", stem)
    if match:
        return match.group(1)
    return stem[:24].upper()


def extract_sections(markdown: str) -> dict:
    sections = {}
    matches = list(re.finditer(r"^##+\s+(.+)$", markdown, flags=re.M))
    for index, match in enumerate(matches):
        label = clean_text(match.group(1)).title()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        body = clean_text(markdown[start:end])
        if body:
            sections[label] = body[:6000]
    return sections


def extract_authors(markdown: str, title: str) -> str:
    after_title = markdown.split(title, 1)[-1] if title in markdown else markdown
    before_first_section = re.split(r"^##+\s+", after_title, maxsplit=1, flags=re.M)[0]
    lines = [
        clean_text(line).strip("* ")
        for line in before_first_section.splitlines()
        if clean_text(line).strip("* ")
    ]
    lines = [line for line in lines if not re.search(r"\blogo\b|qr code", line, flags=re.I)]
    return " ".join(lines[:3])[:1200]


def summarize(markdown: str, sections: dict) -> str:
    preferred = ["Conclusion", "Conclusions", "Results", "Objective", "Background", "Highlights"]
    for key in preferred:
        for label, value in sections.items():
            if label.lower() == key.lower() and len(value) > 60:
                return re.sub(r"\s+", " ", value)[:520]
    body = clean_text(markdown)
    body = re.sub(r"^# .+$", "", body, flags=re.M)
    return re.sub(r"\s+", " ", body)[:520]


def classify(text: str, rules: dict) -> list:
    haystack = text.lower()
    labels = [label for label, terms in rules.items() if any(term in haystack for term in terms)]
    return labels or ["Unclassified"]


def sentence_snippet(text: str, match: re.Match, window: int = 240) -> str:
    start = max(0, match.start() - window)
    end = min(len(text), match.end() + window)
    snippet = text[start:end]
    left_breaks = [snippet.rfind(mark, 0, match.start() - start) for mark in [". ", "\n", "; "]]
    left = max(left_breaks)
    if left > 20:
        snippet = snippet[left + 1 :]
    relative_match_end = match.end() - start
    right_candidates = [
        snippet.find(mark, max(0, relative_match_end - max(left, 0)))
        for mark in [". ", "\n\n", "\n", "; "]
    ]
    right_candidates = [item for item in right_candidates if item > 80]
    if right_candidates:
        snippet = snippet[: min(right_candidates) + 1]
    snippet = clean_text(re.sub(r"\s+", " ", snippet))
    return snippet[:520]


def first_pattern_match(text: str, patterns: list[str]):
    for pattern in patterns:
        match = re.search(pattern, text, flags=re.I)
        if match:
            return match
    return None


def method_source_text(record: dict) -> str:
    sections = record.get("sections") or {}
    labels = [
        "Methods", "Methodology", "Study Design", "Data Analysis", "Statistical Analysis",
        "Results", "Conclusion", "Conclusions",
    ]
    parts = []
    for label in labels:
        for key, value in sections.items():
            if key.lower() == label.lower():
                parts.append(f"{key}: {value}")
    if not parts:
        parts.append(record.get("summary", ""))
    return clean_text("\n\n".join(parts) or " ".join([record.get("title", ""), record.get("authors", "")]))


def outcome_source_blocks(record: dict, markdown: str) -> list[dict]:
    sections = record.get("sections") or {}
    labels = [
        "Measures", "Measurement", "Measurements", "Data Collection", "Data Collection And Endpoints",
        "Endpoints", "Endpoint", "Outcomes", "Outcome Measures", "Evaluation Measures",
        "Goals & Outcomes", "Study Exposure And Outcomes", "Primary Outcome", "Secondary Outcome",
        "Primary Endpoint", "Secondary Endpoint", "Methods", "Methodology", "Study Design",
        "Statistical Analysis", "Results",
    ]
    blocks = []
    for label in labels:
        for key, value in sections.items():
            if key.lower() == label.lower() or any(term in key.lower() for term in ["outcome", "endpoint", "measure"]):
                blocks.append({"section": key, "text": clean_text(value)})
    if not blocks:
        blocks.append({"section": "Summary", "text": record.get("summary", "")})

    # Pull explicit outcome-labeled lines from the full markdown because OCR often
    # keeps endpoint lists as bullets or table rows outside clean section bodies.
    explicit_lines = []
    for line in markdown.splitlines():
        cleaned = clean_text(line).strip("| -*_")
        if not cleaned or len(cleaned) > 420:
            continue
        if cleaned.startswith("#") or re.search(r"\b(reference|references|recommended by|recommendations? for use|doi:|pmid:)\b", cleaned, flags=re.I):
            continue
        if re.search(r"\b(primary|secondary|exploratory)?\s*(outcome|endpoint|measure)s?\b", cleaned, flags=re.I):
            explicit_lines.append(cleaned)
    if explicit_lines:
        blocks.append({"section": "Explicit outcome lines", "text": "\n".join(explicit_lines[:80])})
    return blocks


def outcome_role(text: str) -> str:
    if re.search(r"\bprimary (?:outcome|endpoint|measure)s?\b", text, flags=re.I):
        return "primary"
    if re.search(r"\bsecondary (?:outcome|endpoint|measure)s?\b", text, flags=re.I):
        return "secondary"
    if re.search(r"\bexploratory (?:outcome|endpoint|measure)s?\b", text, flags=re.I):
        return "exploratory"
    return "unspecified"


def outcome_context_is_evaluated(text: str) -> bool:
    if re.search(
        r"\b(future|will be|planned|could be considered|to be collected|not assessed|not evaluated|were not evaluated|not collected|only assessed|could not assess)\b",
        text,
        flags=re.I,
    ):
        return False
    evaluated_patterns = [
        r"\b(primary|secondary|exploratory)\s+(outcome|endpoint|measure)s?\b",
        r"\b(outcome|endpoint|measure)s?\s+(?:included|include|was|were|is|are)\b",
        r"\b(outcome of interest|endpoint of interest)\b",
        r"\b(evaluated|assessed|measured|analyzed|collected|tracked|calculated|compared)\b",
    ]
    return any(re.search(pattern, text, flags=re.I) for pattern in evaluated_patterns)


def outcome_block_is_candidate(text: str) -> bool:
    return bool(
        re.search(
            r"\b(outcome|outcomes|endpoint|endpoints|measure|measures|measured|evaluated|assessed|reported|analyzed|included|collected|tracked)\b",
            text,
            flags=re.I,
        )
    )


def detect_rule_list(text: str, rules: list[dict]) -> list[dict]:
    findings = []
    for rule in rules:
        match = first_pattern_match(text, rule["patterns"])
        if match:
            findings.append(
                {
                    "id": rule["id"],
                    "label": rule["label"],
                    "description": rule["description"],
                    "evidence": sentence_snippet(text, match),
                }
            )
    return findings


def detect_outcomes(record: dict, markdown: str) -> list[dict]:
    findings = {}
    for block in outcome_source_blocks(record, markdown):
        block_text = block["text"]
        if not outcome_block_is_candidate(block_text):
            continue
        for rule in OUTCOME_RULES:
            match = first_pattern_match(block_text, rule["patterns"])
            if not match:
                continue
            snippet = sentence_snippet(block_text, match)
            if not outcome_context_is_evaluated(snippet):
                snippet = sentence_snippet(block_text, match, window=360)
            if not outcome_context_is_evaluated(snippet):
                continue
            item = {
                "id": rule["id"],
                "label": rule["label"],
                "category": rule["category"],
                "description": rule["description"],
                "role": outcome_role(snippet),
                "source_section": block["section"],
                "evidence": snippet,
            }
            key = (item["id"], item["role"])
            existing = findings.get(key)
            if not existing or len(item["evidence"]) < len(existing["evidence"]):
                findings[key] = item
    return sorted(findings.values(), key=lambda item: (item["category"], item["label"], item["role"]))


def detect_named_rule(text: str, rules: list[tuple[str, list[str]]], fallback: str) -> dict:
    for label, patterns in rules:
        match = first_pattern_match(text, patterns)
        if match:
            return {"label": label, "evidence": sentence_snippet(text, match)}
    return {"label": fallback, "evidence": ""}


def sample_bucket(value: int | None) -> str:
    if not value:
        return "Not reported"
    if value < 50:
        return "<50"
    if value < 200:
        return "50-199"
    if value < 1000:
        return "200-999"
    return "1,000+"


def extract_sample_size(text: str) -> dict:
    patterns = [
        r"\b(?:n|N)\s*=\s*([0-9][0-9,]{0,8})\b",
        r"\b(?:total of|included|enrolled|evaluated|reviewed|analyzed)\s+([0-9][0-9,]{0,8})\s+(patients|members|beneficiaries|participants|respondents|records|claims|prescriptions|fills|drops|surveys)\b",
        r"\b([0-9][0-9,]{0,8})\s+(patients|members|beneficiaries|participants|respondents|records|claims|prescriptions|fills|drops|surveys)\b",
    ]
    candidates = []
    for pattern in patterns:
        for match in re.finditer(pattern, text, flags=re.I):
            raw_value = match.group(1).replace(",", "")
            try:
                value = int(raw_value)
            except ValueError:
                continue
            if value < 2 or value > 10_000_000 or 1900 <= value <= 2035:
                continue
            unit = match.group(2).lower() if len(match.groups()) >= 2 and match.group(2) else "records"
            candidates.append((value, unit, sentence_snippet(text, match)))
    if not candidates:
        return {"value": None, "unit": "", "bucket": "Not reported", "evidence": ""}
    value, unit, evidence = max(candidates, key=lambda item: item[0])
    return {"value": value, "unit": unit, "bucket": sample_bucket(value), "evidence": evidence}


def top_matter(markdown: str, title: str) -> str:
    return clean_text(re.split(r"^##+\s+", markdown, maxsplit=1, flags=re.M)[0])


def detect_organization(record: dict, markdown: str) -> dict:
    zone = "\n".join([record.get("authors", ""), top_matter(markdown, record.get("title", ""))])
    zone = clean_text(zone)
    for label, patterns in ORG_PATTERNS:
        match = first_pattern_match(zone, patterns)
        if match:
            return {"name": label, "evidence": sentence_snippet(zone, match)}
    lines = [clean_text(line).strip("* ") for line in zone.splitlines()]
    candidates = [
        line for line in lines
        if line
        and len(line) < 180
        and not line.startswith("#")
        and not re.search(r"@|https?://|photograph|image|figure|table|blvd|street|avenue|presented at", line, flags=re.I)
        and not re.search(r"PharmD|PhD|MD|MPH|MBA|BCPS|CSP|RPh|author|presenting|email", line, flags=re.I)
        and len(line.split()) <= 9
        and re.search(r"\b(?:pharmacy|health|hospital|university|solutions|rx|clinic|analytics|therapeutics|medicine)\b", line, flags=re.I)
    ]
    if candidates:
        candidate = re.sub(r"\blogo\b", "", candidates[0], flags=re.I)
        candidate = re.sub(r"^(?:\d+|<sup>\d+</sup>)\s*", "", candidate).strip(" ;,.")
        return {"name": candidate[:90], "evidence": candidates[0]}
    return {"name": "Not parsed", "evidence": ""}


def is_abstract_book(record: dict) -> bool:
    title = record.get("title", "")
    filename = record.get("pdf", {}).get("filename", "")
    if re.search(r"\bAbstracts from\b|\babstract book\b|TF-IJDA|Abstracts-from-the", title + " " + filename, flags=re.I):
        return True
    sections = record.get("sections") or {}
    return sum(value.count("POSTER #") for value in sections.values()) > 10


def build_methods_analysis(records: list[dict]) -> dict:
    method_records = []
    method_counter = Counter()
    sponsor_counter = Counter()
    sample_counter = Counter()
    design_counter = Counter()
    outcome_counter = Counter()
    outcome_category_counter = Counter()
    year_counter = Counter()
    excluded = 0

    for record in records:
        md_path = ROOT / record["markdown_path"]
        markdown = md_path.read_text(encoding="utf-8", errors="replace") if md_path.exists() else ""
        if is_abstract_book(record):
            excluded += 1
            continue
        source_text = method_source_text(record)
        full_text = clean_text("\n".join([record.get("title", ""), record.get("authors", ""), markdown]))
        method_findings = detect_rule_list(source_text + "\n\n" + full_text[:12000], METHOD_RULES)
        if not method_findings:
            method_findings = [
                {
                    "id": "not_reported",
                    "label": "No explicit statistical method reported",
                    "description": "No specific statistical method was detected in the parsed poster text.",
                    "evidence": source_text[:520],
                }
            ]
        design = detect_named_rule(source_text + "\n\n" + full_text[:8000], DESIGN_RULES, "Not specified")
        data_source = detect_named_rule(source_text + "\n\n" + full_text[:8000], DATA_SOURCE_RULES, "Not specified")
        sample = extract_sample_size(source_text + "\n\n" + full_text[:12000])
        organization = detect_organization(record, markdown)
        outcomes = detect_outcomes(record, markdown)

        for method in method_findings:
            method_counter[method["label"]] += 1
        for label in {outcome["label"] for outcome in outcomes}:
            outcome_counter[label] += 1
        for category in {outcome["category"] for outcome in outcomes}:
            outcome_category_counter[category] += 1
        sponsor_counter[organization["name"]] += 1
        sample_counter[sample["bucket"]] += 1
        design_counter[design["label"]] += 1
        year_counter[record["year"]] += 1

        method_records.append(
            {
                "uid": record["uid"],
                "year": record["year"],
                "poster_code": record["poster_code"],
                "title": record["title"],
                "authors": record["authors"],
                "organization": organization,
                "sample_size": sample,
                "study_design": design,
                "data_source": data_source,
                "methods": method_findings,
                "outcomes": outcomes,
                "categories": record.get("categories", []),
                "therapies": record.get("therapies", []),
                "pdf": record["pdf"],
                "markdown_path": record["markdown_path"],
            }
        )

    method_records.sort(key=lambda item: (item["year"], item["poster_code"], item["title"]))
    return {
        "source": "Generated from parsed NASP poster markdown and source PDF metadata.",
        "record_count": len(method_records),
        "excluded_abstract_books": excluded,
        "method_counts": [{"name": name, "count": count} for name, count in method_counter.most_common()],
        "outcome_counts": [{"name": name, "count": count} for name, count in outcome_counter.most_common()],
        "outcome_category_counts": [{"name": name, "count": count} for name, count in outcome_category_counter.most_common()],
        "sponsor_counts": [{"name": name, "count": count} for name, count in sponsor_counter.most_common()],
        "sample_size_counts": [{"name": name, "count": sample_counter.get(name, 0)} for name in ["Not reported", "<50", "50-199", "200-999", "1,000+"]],
        "study_design_counts": [{"name": name, "count": count} for name, count in design_counter.most_common()],
        "year_counts": [{"name": name, "count": count} for name, count in year_counter.most_common()],
        "method_definitions": [{"id": rule["id"], "label": rule["label"], "description": rule["description"]} for rule in METHOD_RULES],
        "outcome_definitions": [{"id": rule["id"], "label": rule["label"], "category": rule["category"], "description": rule["description"]} for rule in OUTCOME_RULES],
        "records": method_records,
    }


def counts(records, field):
    counter = Counter()
    for record in records:
        value = record.get(field)
        if isinstance(value, list):
            counter.update(value)
        elif value:
            counter[value] += 1
    return [{"name": name, "count": count} for name, count in counter.most_common()]


def main():
    manifest_rows = {}
    with MANIFEST.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            manifest_rows[row["filename"]] = row

    records = []
    for pdf_path in sorted(CORPUS_DIR.glob("*.pdf"), key=lambda p: p.name.lower()):
        row = manifest_rows.get(pdf_path.name, {})
        year = int(row.get("year") or re.search(r"(20\d{2})", pdf_path.name).group(1))
        md_path = pdf_path.with_suffix(".md")
        markdown = md_path.read_text(encoding="utf-8", errors="replace") if md_path.exists() else ""
        title = first_heading(markdown, pdf_path.stem)
        sections = extract_sections(markdown)
        authors = extract_authors(markdown, title)
        full_text = " ".join([title, authors, markdown])
        categories = classify(full_text, CATEGORY_RULES)
        therapies = classify(full_text, THERAPY_RULES)
        uid = pdf_path.stem.lower()
        records.append(
            {
                "uid": uid,
                "year": year,
                "poster_code": poster_code(pdf_path.name),
                "title": title,
                "authors": authors,
                "summary": summarize(markdown, sections),
                "categories": categories,
                "therapies": therapies,
                "sections": sections,
                "pdf": {
                    "filename": pdf_path.name,
                    "local_path": f"nasp_abstracts_posters_pdfs_2019_2025/{pdf_path.name}",
                    "source_url": row.get("url", ""),
                    "bytes": int(row.get("bytes") or pdf_path.stat().st_size),
                },
                "markdown_path": f"nasp_abstracts_posters_pdfs_2019_2025/{md_path.name}",
            }
        )

    records.sort(key=lambda item: (item["year"], item["poster_code"], item["title"]))
    data = {
        "source": "https://naspnet.org/annual-meeting/abstracts-posters",
        "record_count": len(records),
        "pdf_count": len(records),
        "year_counts": counts(records, "year"),
        "categories": counts(records, "categories"),
        "therapies": counts(records, "therapies"),
        "presentations": records,
    }
    OUT_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    lines = ["# NASP Abstracts and Posters 2019-2025", ""]
    for record in records:
        lines.extend(
            [
                f"## {record['year']} / {record['poster_code']} / {record['title']}",
                "",
                f"- PDF: {record['pdf']['local_path']}",
                f"- Source: {record['pdf']['source_url']}",
                f"- Categories: {', '.join(record['categories'])}",
                f"- Therapy areas: {', '.join(record['therapies'])}",
                "",
                record["summary"],
                "",
            ]
        )
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    methods_data = build_methods_analysis(records)
    OUT_METHODS_JSON.write_text(json.dumps(methods_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} records to {OUT_JSON}")
    print(f"Wrote {methods_data['record_count']} method records to {OUT_METHODS_JSON}")


if __name__ == "__main__":
    main()

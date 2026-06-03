# Data Dictionary (B.P2)

## doctors
| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | Unique doctor id |
| name | VARCHAR(255) | Doctor full name |
| specialty | VARCHAR(255) | Medical specialty |
| department | VARCHAR(255) | Assigned department |
| contact_info | VARCHAR(255) | Phone/email |

## patients
| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | Unique patient id |
| name | VARCHAR(255) | Patient full name |
| personal_info | TEXT | Clinical notes / demographic summary |
| doctor_id | INTEGER FK | Assigned doctor (`doctors.id`) |

## diagnoses
| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | Unique diagnosis id |
| icd_code | VARCHAR(50) | ICD classification code |
| description | TEXT | Diagnosis details |
| severity | VARCHAR(50) | Low/Medium/High/Critical |
| patient_id | INTEGER FK | Related patient (`patients.id`) |

## users
| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | User id |
| username | VARCHAR(255) UNIQUE | Login username |
| password_hash | VARCHAR(255) | Bcrypt hash |
| role | VARCHAR(50) | admin / clinician / receptionist |
| created_at | TIMESTAMP | Account creation time |

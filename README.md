# BTEC Unit 25 Full Stack Development - CareTrack Clinic TYBT

**Student:** Bezod Isomiddinov

## Table of Contents
1. Project Overview
2. Repository Structure
3. Technology Stack
4. Quick Start
5. Assessment Criteria Coverage
6. Conclusion
7. References

## 1) Project Overview
CareTrack Clinic TYBT is a medical records management system that implements all required BTEC Unit 25 deliverables: research, design artifacts, feedback/refinement, full-stack implementation, testing evidence, and final evaluation.

## 2) Repository Structure
```text
full-stack-/
├── README.md
├── docs/
│   ├── Activity-1-Research-Report.md
│   ├── Activity-2-Design-Documents/
│   │   ├── ERD.md
│   │   ├── Data-Dictionary.md
│   │   ├── Wireframes.md
│   │   └── Technical-Spec.md
│   ├── Activity-3-Feedback-Analysis.md
│   ├── Activity-4-Development-Testing.md
│   │   ├── Test-Plans.md
│   │   ├── Test-Results.md
│   │   └── User-Feedback.md
│   ├── Activity-5-Evaluation.md
│   └── References.md
├── backend/
│   ├── server.js
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── database.sql
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/app.js
│   ├── components/
│   └── pages/
└── tests/
    ├── unit-tests.js
    ├── integration-tests.js
    └── test-results.md
```

## 3) Technology Stack
- Frontend: React.js + HTML/CSS/JavaScript
- Backend: Node.js + Express.js
- Database: PostgreSQL (schema in `backend/database.sql`)
- Auth: JWT + role-based access control (admin/clinician/receptionist)
- Testing: Unit + integration tests (`node:test` + `supertest`)

## 4) Quick Start
```bash
cd backend
npm install
# Configure PostgreSQL env vars and JWT_SECRET
psql -d caretrack -f database.sql
# Create a secure admin user (bcrypt hash) in users table
npm start
```

Frontend is static and can be opened from `frontend/index.html` (or served with any static server).

## 5) Assessment Criteria Coverage
- Activity 1 (A.P1, A.M1, A.D1): `docs/Activity-1-Research-Report.md`
- Activity 2 (B.P2): `docs/Activity-2-Design-Documents/*`
- Activity 3 (B.P3, B.M2): `docs/Activity-3-Feedback-Analysis.md`
- Activity 4 (C.P4, C.P5, C.M3): backend/frontend code + `docs/Activity-4-Development-Testing*`
- Activity 5 (C.P6, BC.D2, BC.D3): `docs/Activity-5-Evaluation.md`

## 6) Conclusion
This repository delivers a full-stack TYBT implementation and aligned assessment evidence for CareTrack Clinic.

## 7) References
See `docs/References.md`.

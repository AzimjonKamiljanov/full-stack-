# Activity 1: Research Report (A.P1, A.M1, A.D1)

> Formatting note: this document is prepared for export in Calibri 11pt.

## Table of Contents
1. System comparison (A.P1)
2. Full-stack tools analysis (A.M1)
3. Architecture evaluation (A.D1)
4. Conclusion

## 1) System comparison (A.P1)

| Area | OpenMRS | Epic Systems | CareTrack direction |
|---|---|---|---|
| Design | Open-source modular UI | Enterprise integrated suite | Lightweight clinic-focused UI |
| Functionality | Patient records, concepts, forms | Full EHR + billing + analytics | Core records + diagnosis + profile joins |
| Tools | Java backend, modular apps | Proprietary enterprise stack | React + Node/Express + PostgreSQL |
| Cost/Flexibility | High flexibility, low license cost | High cost, high support | Medium complexity, educational delivery |

## 2) Full-stack tools analysis (A.M1)
- **Frontend (React/HTML/CSS/JS):** component-based dashboard, responsive layouts, role-specific actions.
- **Backend (Node.js/Express):** REST API endpoints for CRUD and role checks.
- **API security (JWT):** token-based authentication and role claims.
- **Database (PostgreSQL):** normalized relational model with FK joins (`doctors -> patients -> diagnoses`).

## 3) Architecture evaluation (A.D1)
- **Layered architecture** improves maintainability (routes/controllers/models).
- **RBAC middleware** ensures access is controlled by role.
- **Relational design** supports patient profile aggregation and reporting.
- **REST principles** (resource routes, HTTP status codes) provide interoperability.

## 4) Conclusion
For CareTrack Clinic context, a focused full-stack architecture balances usability, delivery speed, and data integrity. The selected stack is suitable for TYBT assessment goals and practical clinical workflows.

# Technical Specification and Requirements (B.P2)

## User requirements (6-8 requirements)
1. Admin can fully manage doctors, patients, diagnoses, and users.
2. Clinician can view/update patients and diagnoses.
3. Receptionist can register patients and view doctor schedule/list.
4. System must provide patient full profile with assigned doctor and all diagnoses.
5. Search/filter should work across core entities.
6. JWT authentication must protect APIs.
7. Responsive UI should support desktop and mobile.
8. PostgreSQL schema should enforce data relationships.

## Key non-functional requirements
- Secure token validation and role checks.
- Structured error handling with proper status codes.
- Maintainable route/controller/model separation.

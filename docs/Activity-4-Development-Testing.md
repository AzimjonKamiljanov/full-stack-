# Activity 4: Development & Testing Summary (C.P4, C.P5, C.M3)

## C.P4 Full stack implementation
- Frontend: React-based single-page UI (`frontend/`).
- Backend: Node.js/Express REST API (`backend/`).
- Database: PostgreSQL schema with FK relationships (`backend/database.sql`).

## C.P5 Functional implementation
- CRUD for doctors, patients, diagnoses routes.
- SQL joins for patient profile endpoint (`/api/patients/:id/profile`).
- RBAC:
  - Admin: full CRUD
  - Clinician: read/update selected resources
  - Receptionist: register patients + read doctors

## C.M3 Optimization from tests/feedback
- Added role-limited UI rendering.
- Added global search endpoint for quicker lookup.
- Added focused API auth tests for reliability.

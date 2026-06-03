# Activity 3: Feedback & Refinement (B.P3, B.M2)

## Stakeholder feedback (B.P3)
- **Clinician:** Requested faster access to patient full profile.
- **Receptionist:** Asked for simpler patient registration flow.
- **Admin:** Requested clear role boundaries to avoid accidental edits.

## Before/After refinement (B.P3)
- **Before:** profile view required manual navigation.
  **After:** dedicated patient profile action loads doctor + diagnosis together.
- **Before:** all actions shown to all users.
  **After:** role-based UI sections visible by role.
- **Before:** no global search endpoint.
  **After:** `/api/search` returns grouped entity matches.

## Design decision justification (B.M2)
- Role-based UI and API checks reduce misuse risk in clinic context.
- Structured schema with FK constraints supports reliable medical records linkage.
- Simplified forms reduce training time for receptionist and clinicians.

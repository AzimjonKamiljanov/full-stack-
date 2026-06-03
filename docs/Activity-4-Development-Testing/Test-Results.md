# Test Results (C.M3)

| Test Case | Expected | Result |
|---|---|---|
| Health endpoint | 200 + `{status: ok}` | Pass |
| No auth token | 401 on protected route | Pass |
| Invalid JWT | 401 | Pass |
| Role restriction | 403 when role not allowed | Pass |

## Improvement evidence
- Added explicit middleware tests to prevent RBAC regressions.
- Added integration test for auth-protected endpoint behavior.

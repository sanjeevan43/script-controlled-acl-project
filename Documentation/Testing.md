# Test Matrix & Verification Scenarios

## Test Environment Setup
- Create test records in `u_institution_details`:
  - Record 1: `Branch` = `EEE`, `Student Name` = `John Doe`, `Faculty Name` = `Dr. Smith`
  - Record 2: `Branch` = `CSE`, `Student Name` = `Jane Alice`, `Faculty Name` = `Dr. Brown`
- Impersonate test user with specified role (`bb1`, `bb2`, `bb3`, or `bb4`).

## Test Scenarios Matrix

| Scenario # | User Role | Record Branch | Attempted Operation | Expected Result | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | `bb1` | `EEE` | READ | **ALLOWED** | Record is visible in list/form view |
| **TC-02** | `bb1` | `CSE` | READ | **DENIED** | Record is hidden / security restricted |
| **TC-03** | `bb2` | `EEE` | CREATE | **ALLOWED** | Record inserted successfully |
| **TC-04** | `bb2` | `CSE` | CREATE | **DENIED** | Form submit blocked by security rules |
| **TC-05** | `bb3` | `EEE` | WRITE | **ALLOWED** | Fields edited and saved successfully |
| **TC-06** | `bb3` | `CSE` | WRITE | **DENIED** | Fields are read-only / save rejected |
| **TC-07** | `bb4` | `EEE` | DELETE | **ALLOWED** | Delete button enabled; record deleted |
| **TC-08** | `bb4` | `CSE` | DELETE | **DENIED** | Delete button hidden / operation forbidden |
| **TC-09** | None | `EEE` | READ / WRITE | **DENIED** | Complete access denied |

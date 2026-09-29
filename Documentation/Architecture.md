# System Architecture & Technical Specification

## Overview
The **Script-Controlled ACL System** provides fine-grained, dynamic access control for records in the `u_institution_details` table inside ServiceNow. Access is dynamically determined at runtime based on the authenticated user's assigned role (`bb1`, `bb2`, `bb3`, `bb4`) and field values on the target record (`current.branch == 'EEE'`).

## System Architecture Diagram

```mermaid
graph TD
    A[User Access Attempt on u_institution_details] --> B{Authenticated & Active Session?}
    B -- No --> C[Access Denied - 401/403]
    B -- Yes --> D{Check Required Operation Role}
    
    D -- READ --> E{Has Role bb1?}
    E -- No --> C
    E -- Yes --> I{Evaluate ACL Script}
    
    D -- CREATE --> F{Has Role bb2?}
    F -- No --> C
    F -- Yes --> I
    
    D -- WRITE --> G{Has Role bb3?}
    G -- No --> C
    G -- Yes --> I
    
    D -- DELETE --> H{Has Role bb4?}
    H -- No --> C
    H -- Yes --> I

    I --> J{Record Branch == 'EEE'?}
    J -- Yes --> K[Access Granted]
    J -- No --> C
```

## Security Rule Matrix

| Operation | Target Table | Required Role | Script Condition | Access Granted |
| :--- | :--- | :--- | :--- | :--- |
| **READ** | `u_institution_details` | `bb1` | `current.branch == 'EEE'` | Yes (Only for EEE records) |
| **READ** | `u_institution_details` | `bb1` | `current.branch != 'EEE'` | Denied |
| **READ** | `u_institution_details` | None | Any | Denied |
| **CREATE** | `u_institution_details` | `bb2` | `current.branch == 'EEE'` | Yes (Only for EEE records) |
| **CREATE** | `u_institution_details` | `bb2` | `current.branch != 'EEE'` | Denied |
| **WRITE** | `u_institution_details` | `bb3` | `current.branch == 'EEE'` | Yes (Only for EEE records) |
| **WRITE** | `u_institution_details` | `bb3` | `current.branch != 'EEE'` | Denied |
| **DELETE** | `u_institution_details` | `bb4` | `current.branch == 'EEE'` | Yes (Only for EEE records) |
| **DELETE** | `u_institution_details` | `bb4` | `current.branch != 'EEE'` | Denied |

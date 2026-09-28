# System Architecture & Technical Specification

## Overview
The **Script-Controlled ACL System** provides fine-grained, dynamic access control for sensitive business documents inside ServiceNow. Access is dynamically determined at runtime based on the authenticated user's role assignment and field values on the target record (`u_assigned_user`, `u_confidentiality_level`, and `u_active`).

## Workflow Diagram

```mermaid
graph TD
    A[User Request / Access Attempt] --> B{User Authenticated?}
    B -- No --> C[Access Denied 401/403]
    B -- Yes --> D{Check Role Assignment}
    D -- Has secure_document_admin --> E[Access Granted - Admin Bypass]
    D -- Has secure_document_user --> F{Evaluate ACL Operation}
    D -- No Security Role --> C

    F -- READ --> G{Is Record Active?}
    G -- No --> C
    G -- Yes --> H{Confidentiality Level?}
    H -- Public / Internal --> E
    H -- Confidential --> I{Is User == Assigned User?}
    I -- Yes --> E
    I -- No --> C

    F -- CREATE --> J{Is Record Active?}
    J -- No --> C
    J -- Yes --> K{Is Assigned User == Current User?}
    K -- Yes --> E
    K -- No --> C

    F -- WRITE --> L{Is Record Active?}
    L -- No --> C
    L -- Yes --> M{Is User == Assigned User?}
    M -- Yes --> E
    M -- No --> C

    F -- DELETE --> N{Is Record Active & Non-Confidential?}
    N -- No --> C
    N -- Yes --> O{Is User == Assigned User?}
    O -- Yes --> E
    O -- No --> C
```

## Security Rule Matrix

| Operation | User Role | Record Active | Confidentiality Level | Assigned User Constraint | Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **READ** | `secure_document_admin` | Any | Any | Any | **ALLOWED** |
| **READ** | `secure_document_user` | `true` | `public` / `internal` | Any | **ALLOWED** |
| **READ** | `secure_document_user` | `true` | `confidential` | Current User | **ALLOWED** |
| **READ** | `secure_document_user` | `true` | `confidential` | Other User | **DENIED** |
| **READ** | `secure_document_user` | `false` | Any | Any | **DENIED** |
| **CREATE**| `secure_document_admin` | Any | Any | Any | **ALLOWED** |
| **CREATE**| `secure_document_user` | `true` | Any | Current User | **ALLOWED** |
| **CREATE**| `secure_document_user` | `true` | `confidential` | Other User | **DENIED** |
| **WRITE** | `secure_document_admin` | Any | Any | Any | **ALLOWED** |
| **WRITE** | `secure_document_user` | `true` | Any | Current User | **ALLOWED** |
| **WRITE** | `secure_document_user` | `true` | Any | Other User | **DENIED** |
| **WRITE** | `secure_document_user` | `false` | Any | Any | **DENIED** |
| **DELETE**| `secure_document_admin` | Any | Any | Any | **ALLOWED** |
| **DELETE**| `secure_document_user` | `true` | `public` / `internal` | Current User | **ALLOWED** |
| **DELETE**| `secure_document_user` | `true` | `confidential` | Current User | **DENIED** |
| **DELETE**| `secure_document_user` | `false` | Any | Any | **DENIED** |

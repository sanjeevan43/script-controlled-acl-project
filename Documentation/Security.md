# Security Architecture & Best Practices

## Table-Level vs Field-Level ACLs
- **Table-Level ACL (`u_secure_documents` | `None`):** Evaluated first when accessing records or querying lists. If table-level READ access fails, the user cannot see the record or any of its fields.
- **Field-Level ACL (`u_secure_documents.*` or `u_secure_documents.u_field`):** Evaluated after table-level access is granted. Controls visibility and editability of specific columns on form/list views.

## ACL Evaluation Hierarchy
For a user to gain access in ServiceNow, **ALL THREE** of the following conditions must be met:
1. **Role Check:** User possesses required role(s) specified in the ACL record.
2. **Condition Builder:** Standard ServiceNow conditions evaluate to true.
3. **Script Evaluation:** Server-side script executes and sets `answer = true`.

If ANY of the three checks evaluate to false, access is DENIED (`answer = false`).

## Defense-in-Depth Against Bypasses
1. **Record Modification vs Security Field Escalation:**
   Without Field-Level WRITE ACLs, a normal user could edit `u_assigned_user` to another user or change `u_confidentiality_level` from `confidential` to `public` before saving, effectively bypassing record-level security constraints. Field-level WRITE ACLs lock critical security-governing fields after creation.
2. **Implicit Deny Principle:**
   ACL scripts initialize `answer = false;` explicitly at the start of execution. Access is granted only when affirmative conditions evaluate cleanly.

## Admin Role Overrides
- ServiceNow system administrators (`admin` role) have `Elevated Privilege` capability.
- In ACL design, explicitly checking `gs.hasRole('secure_document_admin')` ensures administrative governance without relying solely on global `admin` privileges.

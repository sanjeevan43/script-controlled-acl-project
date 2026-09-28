# Testing Procedures & Verification Matrix

## Test Data Setup
Create the following test records in `u_secure_documents` as Administrator:

| Record # | Short Description | Confidentiality Level | Assigned User | Active |
| :--- | :--- | :--- | :--- | :--- |
| **DOC0001** | Public Document | `public` | `secure.user` | `true` |
| **DOC0002** | Internal Document | `internal` | `secure.user` | `true` |
| **DOC0003** | Confidential Self | `confidential` | `secure.user` | `true` |
| **DOC0004** | Confidential Other | `confidential` | `secure.admin` | `true` |
| **DOC0005** | Inactive Document | `public` | `secure.user` | `false` |

---

## Testing Matrix & Expected Results

| User | Target Record | Operation | Expected Outcome | Technical Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `secure.user` | DOC0001 (Public) | **READ** | **ALLOW** | Active document, public confidentiality level. |
| `secure.user` | DOC0002 (Internal) | **READ** | **ALLOW** | Active document, internal confidentiality level. |
| `secure.user` | DOC0003 (Confidential Self) | **READ** | **ALLOW** | Active document, confidential level MATCHES assigned user (`secure.user`). |
| `secure.user` | DOC0004 (Confidential Other)| **READ** | **DENY** | Confidential document assigned to `secure.admin`. User is blocked by READ ACL. |
| `secure.user` | DOC0005 (Inactive) | **READ** | **DENY** | Inactive document. Standard users cannot read inactive documents. |
| `secure.user` | New Record (Self Assigned) | **CREATE** | **ALLOW** | Creating active document assigned to self. |
| `secure.user` | New Record (Assigned to Admin)| **CREATE** | **DENY** | CREATE ACL blocks assigning record to another user during insertion. |
| `secure.user` | DOC0001 (Public Self) | **WRITE** | **ALLOW** | Record is active and assigned to `secure.user`. |
| `secure.user` | DOC0004 (Confidential Other)| **WRITE** | **DENY** | Not assigned user. |
| `secure.user` | DOC0005 (Inactive) | **WRITE** | **DENY** | Inactive record write restriction. |
| `secure.user` | DOC0001 (Public Self) | **DELETE** | **ALLOW** | Active, self-assigned, non-confidential. |
| `secure.user` | DOC0003 (Confidential Self)| **DELETE** | **DENY** | DELETE ACL restricts deletion of Confidential records to Admin only. |
| `secure.admin`| Any Record | **ALL** | **ALLOW** | `secure_document_admin` role triggers immediate admin override (`answer = true`). |

---

## Negative Security Tests

### Test 1: Direct URL Access (Confidential Other)
- **Step:** Log in / impersonate `secure.user`.
- **Action:** Open URL `https://<instance>.service-now.com/u_secure_documents.do?sys_id=<SYS_ID_OF_DOC0004>`.
- **Expected Result:** Security error message: *"Record not found or access denied"*.

### Test 2: List Security & Aggregate Security
- **Step:** Impersonate `secure.user` and navigate to `u_secure_documents_list.do`.
- **Expected Result:** DOC0004 and DOC0005 are completely excluded from list view. A message `"Number of rows removed by Security Constraints: X"` appears at bottom of list.

### Test 3: Field Tampering Attack (Reassignment)
- **Step:** Impersonate `secure.user`, open DOC0001.
- **Action:** Attempt to edit `Assigned User` field to `secure.admin`.
- **Expected Result:** Field is read-only due to `u_secure_documents.u_assigned_user` WRITE ACL.

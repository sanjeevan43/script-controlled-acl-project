# ServiceNow Update Set Instructions

## Overview
This directory contains exported ServiceNow Remote Update Sets packaging table definitions, dictionary fields, security roles, and Access Control List (ACL) rules for the **Script-Controlled ACL** project.

## Update Set File Details
- **Filename:** [`Script_Controlled_ACL_v1.xml`](file:///c:/projects/clg/NM/service%20now/Update_Sets/Script_Controlled_ACL_v1.xml)
- **Sys ID:** `b30c3432c36f4b1052ad98ec050131de`
- **Application Scope:** `Global` (`global`)
- **Captured Metadata Objects:**
  - Security Roles (`bb1`, `bb2`, `bb3`, `bb4`, `custom_record_user`)
  - Target Table Schema & Dictionary Fields (`u_institution_details` / `u_secure_data`)
  - Table-Level ACL Records (`read`, `create`, `write`, `delete`)
  - Advanced Script Logic for field-level access control (`Branch == 'EEE'`)

---

## How to Import and Deploy Update Set in ServiceNow

1. Log in to your target ServiceNow instance as System Administrator.
2. Navigate to **System Update Sets → Retrieved Update Sets** in the Filter Navigator.
3. Scroll to the **Related Links** section at the bottom of the list and click **Import Update Set from XML**.
4. Click **Choose File**, select `Update_Sets/Script_Controlled_ACL_v1.xml` (or `sys_remote_update_set_b30c3432c36f4b1052ad98ec050131de.xml`), and click **Upload**.
5. Open the uploaded update set record titled **`Script-Controlled ACL`**.
6. Click **Preview Update Set**. Ensure there are no errors/conflicts.
7. Click **Commit Update Set**.

> [!NOTE]
> Test Users (`eee_user_test`, `cse_user_test`) and transactional records are data (`sys_user` / `u_institution_details`) and are **NOT** packaged in Update Sets. Run `Scripts/Background_Setup.js` in Scripts - Background to automatically generate test users.

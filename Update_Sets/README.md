# ServiceNow Update Set Instructions

## Overview
This directory contains exported ServiceNow Update Sets packaging table definitions, ACL security rules, roles, and configuration choices.

## Update Set Contents
The file `Script_Controlled_ACL_v1.xml` captures:
- Roles (`secure_document_user`, `secure_document_admin`)
- Table & Dictionary Entries (`u_secure_documents` & custom fields)
- Field Choice definitions (`public`, `internal`, `confidential`)
- Table-Level ACL records (`read`, `create`, `write`, `delete`)
- Field-Level ACL records (`u_assigned_user`, `u_confidentiality_level`, `u_active`)

> [!NOTE]
> Test Users (`secure.user`, `secure.admin`) and Test Data Records (DOC0001 - DOC0005) are data records (`sys_user` / `u_secure_documents`) and are **NOT** automatically captured in Update Sets. They must be created manually in target instances as documented in `Documentation/Testing.md`.

# Step-by-Step Installation & Setup Guide

## Step 1: Create Roles
1. Navigate to **All → System Security → Users and Groups → Roles**.
2. Click **New**.
3. Create Role 1:
   - **Name:** `secure_document_user`
   - **Description:** Standard user access to non-confidential active documents.
4. Click **Submit**.
5. Click **New** again.
6. Create Role 2:
   - **Name:** `secure_document_admin`
   - **Description:** Administrative full access to all secure documents.
7. Click **Submit**.

## Step 2: Create Test Users
1. Navigate to **All → System Security → Users and Groups → Users**.
2. Click **New**.
3. User 1 Configuration:
   - **User ID:** `secure.user`
   - **First name:** Secure
   - **Last name:** Test User
   - **Email:** `secure.user@example.com`
   - **Password:** Set a secure password or enable Impersonation.
4. Click **Submit**.
5. Open `secure.user` record, scroll to **Roles** related list, click **Edit...**, add `secure_document_user`, and click **Save**.

6. Click **New** under Users list.
7. User 2 Configuration:
   - **User ID:** `secure.admin`
   - **First name:** Secure
   - **Last name:** Admin User
   - **Email:** `secure.admin@example.com`
   - **Password:** Set a secure password.
8. Click **Submit**.
9. Open `secure.admin` record, scroll to **Roles** related list, click **Edit...**, add `secure_document_admin`, and click **Save**.

## Step 3: Create Table & Fields
1. Navigate to **All → System Definition → Tables**.
2. Click **New**.
3. Label: `Secure Document` (Name will auto-populate as `u_secure_documents`).
4. Keep **Application** as `Global` (or your scope).
5. Uncheck **Create module** or customize menu.
6. Columns Tab - Add the following fields:
   - `u_number` | Type: `Integer` or `Auto Number`
   - `u_short_description` | Type: `String` (Length: 100)
   - `u_description` | Type: `HTML` or `String` (Length: 4000)
   - `u_assigned_user` | Type: `Reference` (Table: `sys_user`)
   - `u_confidentiality_level` | Type: `Choice`
   - `u_active` | Type: `True/False` (Default: `true`)
7. Click **Submit**.
8. Configure Choices for `u_confidentiality_level`:
   - Open table `u_secure_documents` field `u_confidentiality_level`.
   - Add Choices:
     - Label: `Public`, Value: `public`
     - Label: `Internal`, Value: `internal`
     - Label: `Confidential`, Value: `confidential`

## Step 4: Security Admin Elevation
1. Click profile icon (top right) → **Elevate Role**.
2. Check `security_admin` checkbox and click **OK**.

## Step 5: Configure ACLs
Navigate to **All → System Security → Access Control (ACL)**.
Create Table-Level ACLs (`u_secure_documents` | `None`):
1. READ ACL (`Operation: read`, `Advanced: true`, paste `Scripts/Read_ACL.js`)
2. CREATE ACL (`Operation: create`, `Advanced: true`, paste `Scripts/Create_ACL.js`)
3. WRITE ACL (`Operation: write`, `Advanced: true`, paste `Scripts/Write_ACL.js`)
4. DELETE ACL (`Operation: delete`, `Advanced: true`, paste `Scripts/Delete_ACL.js`)

Create Field-Level WRITE ACLs (`u_secure_documents.u_assigned_user`, etc.):
1. `u_secure_documents.u_assigned_user` -> paste `Scripts/Field_ACLs/Write_Assigned_User_Field_ACL.js`
2. `u_secure_documents.u_confidentiality_level` -> paste `Scripts/Field_ACLs/Write_Confidentiality_Level_Field_ACL.js`
3. `u_secure_documents.u_active` -> paste `Scripts/Field_ACLs/Write_Active_Field_ACL.js`

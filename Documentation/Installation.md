# Step-by-Step Installation & Setup Guide

## Step 1: Create Roles
1. Navigate to **All → System Security → Users and Groups → Roles**.
2. Click **New**.
3. Create Role 1:
   - **Name:** `bb1`
   - **Description:** Read access role for Institution Details.
4. Create Role 2:
   - **Name:** `bb2`
   - **Description:** Create access role for Institution Details.
5. Create Role 3:
   - **Name:** `bb3`
   - **Description:** Write access role for Institution Details.
6. Create Role 4:
   - **Name:** `bb4`
   - **Description:** Delete access role for Institution Details.

## Step 2: Create Table & Fields
1. Navigate to **All → System Definition → Tables**.
2. Click **New**.
3. **Label:** `Institution Details` (Name will auto-populate as `u_institution_details`).
4. Columns Tab - Add the following fields:
   - `Branch` (`u_branch` / `branch`) | Type: `String` / `Choice`
   - `Description` (`u_description`) | Type: `String` / `HTML`
   - `Email` (`u_email`) | Type: `String` / `Email`
   - `Faculty Name` (`u_faculty_name`) | Type: `String`
   - `Phone Number` (`u_phone_number`) | Type: `String` / `Phone Number`
   - `Student Name` (`u_student_name`) | Type: `String`
5. Click **Submit**.

## Step 3: Security Admin Elevation
1. Click profile icon (top right) → **Elevate Role**.
2. Check `security_admin` checkbox and click **OK**.

## Step 4: Configure Access Control Lists (ACLs)
Navigate to **All → System Security → Access Control (ACL)**.
Create Table-Level ACLs (`u_institution_details` | `None`):
1. **READ ACL:**
   - **Operation:** `read`
   - **Role:** `bb1`
   - **Advanced:** `true`
   - **Script:** Paste contents from [`Scripts/Read_ACL.js`](file:///c:/projects/clg/NM/service%20now/Scripts/Read_ACL.js)
2. **CREATE ACL:**
   - **Operation:** `create`
   - **Role:** `bb2`
   - **Advanced:** `true`
   - **Script:** Paste contents from [`Scripts/Create_ACL.js`](file:///c:/projects/clg/NM/service%20now/Scripts/Create_ACL.js)
3. **WRITE ACL:**
   - **Operation:** `write`
   - **Role:** `bb3`
   - **Advanced:** `true`
   - **Script:** Paste contents from [`Scripts/Write_ACL.js`](file:///c:/projects/clg/NM/service%20now/Scripts/Write_ACL.js)
4. **DELETE ACL:**
   - **Operation:** `delete`
   - **Role:** `bb4`
   - **Advanced:** `true`
   - **Script:** Paste contents from [`Scripts/Delete_ACL.js`](file:///c:/projects/clg/NM/service%20now/Scripts/Delete_ACL.js)

## Step 5: Commit to Source Control via Studio
1. Open ServiceNow Studio (**Filter Navigator → studio**).
2. Select your application.
3. Click **Source Control → Commit Changes**.
4. Select all custom roles, table dictionary entries, and ACLs.
5. Push commit to your GitHub repository.

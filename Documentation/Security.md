# Security Policy & Execution Principles

## Core Principles

1. **Default Deny Strategy:**
   All ACL scripts explicitly begin with `answer = false;`. Access is granted only when all conditions (role check and `Branch == 'EEE'` logic) pass.

2. **Role Isolation:**
   - `bb1`: Restricted to Read operation evaluation.
   - `bb2`: Restricted to Create operation evaluation.
   - `bb3`: Restricted to Write operation evaluation.
   - `bb4`: Restricted to Delete operation evaluation.

3. **Field Value Enforcement:**
   Record access dynamically checks the `branch` / `u_branch` field value at evaluation time:
   ```javascript
   var branchValue = current.u_branch ? current.u_branch.toString() : (current.branch ? current.branch.toString() : '');
   if (branchValue === 'EEE') {
       answer = true;
   }
   ```

4. **ServiceNow Studio Metadata Packaging:**
   All security components (ACLs, Roles, Dictionary Entries) are packaged in Application Metadata and versioned in Git via ServiceNow Studio.

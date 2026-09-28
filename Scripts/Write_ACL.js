/**
 * ServiceNow Advanced Record-Level WRITE ACL Script
 * Table: u_secure_documents (Secure Documents)
 * Operation: write
 * 
 * Policy:
 * 1. Admin (secure_document_admin): Can write/modify any valid record.
 * 2. Normal User (secure_document_user):
 *    - Can modify active records assigned to themselves.
 *    - Cannot modify inactive records.
 *    - Cannot modify documents assigned to other users.
 */
(function executeRule(current, previous /*null when async*/) {

    // Default deny access
    answer = false;

    // Check 1: Admin override
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Check 2: Normal user check
    if (gs.hasRole('secure_document_user')) {
        // Cannot modify inactive records
        if (!current.u_active) {
            answer = false;
            return;
        }

        var currentUserID = gs.getUserID();
        var assignedUserID = current.u_assigned_user ? current.u_assigned_user.toString() : '';

        // Must be the assigned user to modify
        if (assignedUserID === currentUserID) {
            answer = true;
            return;
        }
    }

})(current, previous);

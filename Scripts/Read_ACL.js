/**
 * ServiceNow Advanced Record-Level READ ACL Script
 * Table: u_secure_documents (Secure Documents)
 * Operation: read
 * 
 * Policy:
 * 1. Admin (secure_document_admin): Full read access to all records.
 * 2. Normal User (secure_document_user):
 *    - Can read active non-confidential records ('public' or 'internal').
 *    - Can read active confidential records ONLY if assigned to themselves.
 * 3. Inactive records are hidden from non-admin users.
 */
(function executeRule(current, previous /*null when async*/) {

    // Initialize access to false
    answer = false;

    // Check 1: Admin role bypass
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Check 2: Normal user security check
    if (gs.hasRole('secure_document_user')) {
        // Record must be active for normal users
        if (!current.u_active) {
            answer = false;
            return;
        }

        var confidentiality = current.u_confidentiality_level ? current.u_confidentiality_level.toString() : '';
        var currentUserID = gs.getUserID();
        var assignedUserID = current.u_assigned_user ? current.u_assigned_user.toString() : '';

        // Rule A: Public or Internal document access
        if (confidentiality === 'public' || confidentiality === 'internal') {
            answer = true;
            return;
        }

        // Rule B: Confidential document access (assigned user only)
        if (confidentiality === 'confidential') {
            if (assignedUserID !== '' && assignedUserID === currentUserID) {
                answer = true;
                return;
            }
        }
    }

})(current, previous);

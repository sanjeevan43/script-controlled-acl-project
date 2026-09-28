/**
 * ServiceNow Advanced Record-Level DELETE ACL Script
 * Table: u_secure_documents (Secure Documents)
 * Operation: delete
 * 
 * Policy:
 * 1. Admin (secure_document_admin): Can delete any record.
 * 2. Normal User (secure_document_user):
 *    - Can delete active, non-confidential records assigned to themselves.
 *    - Cannot delete confidential records (requires admin).
 *    - Cannot delete inactive records (archived / protected).
 *    - Cannot delete records assigned to other users.
 */
(function executeRule(current, previous /*null when async*/) {

    // Default deny
    answer = false;

    // Check 1: Admin override
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Check 2: Normal user validation
    if (gs.hasRole('secure_document_user')) {
        // Must be active
        if (!current.u_active) {
            answer = false;
            return;
        }

        var currentUserID = gs.getUserID();
        var assignedUserID = current.u_assigned_user ? current.u_assigned_user.toString() : '';
        var confidentiality = current.u_confidentiality_level ? current.u_confidentiality_level.toString() : '';

        // Must be assigned user
        if (assignedUserID !== currentUserID) {
            answer = false;
            return;
        }

        // Confidential documents cannot be deleted by normal users
        if (confidentiality === 'confidential') {
            answer = false;
            return;
        }

        // Access allowed for active, self-assigned, public/internal records
        answer = true;
    }

})(current, previous);

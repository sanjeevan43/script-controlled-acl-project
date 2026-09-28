/**
 * ServiceNow Advanced Record-Level CREATE ACL Script
 * Table: u_secure_documents (Secure Documents)
 * Operation: create
 * 
 * Policy:
 * 1. Admin (secure_document_admin): Can create any document with any valid field configuration.
 * 2. Normal User (secure_document_user):
 *    - Can create documents only if assigned user is set to themselves (or unassigned/draft default).
 *    - Record must be created as active.
 *    - Cannot create confidential documents directly unless assigned to themselves.
 */
(function executeRule(current, previous /*null when async*/) {

    // Default deny access
    answer = false;

    // Check 1: Admin override
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Check 2: Normal user validation
    if (gs.hasRole('secure_document_user')) {
        var currentUserID = gs.getUserID();
        var assignedUserID = current.u_assigned_user ? current.u_assigned_user.toString() : '';
        var confidentiality = current.u_confidentiality_level ? current.u_confidentiality_level.toString() : '';

        // Must create as active
        if (current.u_active === false) {
            answer = false;
            return;
        }

        // Assigned user must be current user (or default self)
        if (assignedUserID !== '' && assignedUserID !== currentUserID) {
            answer = false; // Cannot create document assigned to someone else
            return;
        }

        // Non-admin creating confidential record must be assigned to self
        if (confidentiality === 'confidential' && assignedUserID !== currentUserID) {
            answer = false;
            return;
        }

        answer = true;
    }

})(current, previous);

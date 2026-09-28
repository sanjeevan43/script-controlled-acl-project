/**
 * ServiceNow Field-Level WRITE ACL Script
 * Table: u_secure_documents
 * Field: u_assigned_user
 * Operation: write
 * 
 * Policy:
 * Prevents normal users from reassignment attacks (transferring record ownership to bypass ACLs).
 * Only admins can reassign existing records.
 */
(function executeRule(current, previous /*null when async*/) {

    answer = false;

    // Admin can edit assigned user field anytime
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Normal user: Allow setting assigned user ONLY on NEW record creation (current.isNewRecord())
    if (gs.hasRole('secure_document_user')) {
        if (current.isNewRecord()) {
            answer = true;
            return;
        }
    }

})(current, previous);

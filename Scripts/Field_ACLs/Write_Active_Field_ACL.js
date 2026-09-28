/**
 * ServiceNow Field-Level WRITE ACL Script
 * Table: u_secure_documents
 * Field: u_active
 * Operation: write
 * 
 * Policy:
 * Normal users cannot reactivate inactive records or deactivate active records unless admin.
 * Assigned users can set active on record creation.
 */
(function executeRule(current, previous /*null when async*/) {

    answer = false;

    // Admin can toggle active status anytime
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Normal user can only set active status on initial record insertion
    if (gs.hasRole('secure_document_user')) {
        if (current.isNewRecord()) {
            answer = true;
            return;
        }
    }

})(current, previous);

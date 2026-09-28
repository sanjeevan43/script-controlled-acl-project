/**
 * ServiceNow Field-Level WRITE ACL Script
 * Table: u_secure_documents
 * Field: u_confidentiality_level
 * Operation: write
 * 
 * Policy:
 * Prevents normal users from downgrading Confidential documents to Public/Internal to bypass security controls.
 * Admins have full access. Normal assigned users can edit during record creation or if assigned to record.
 */
(function executeRule(current, previous /*null when async*/) {

    answer = false;

    // Admin can always modify confidentiality level
    if (gs.hasRole('secure_document_admin')) {
        answer = true;
        return;
    }

    // Normal user: Assigned user can set/edit confidentiality on active documents assigned to self
    if (gs.hasRole('secure_document_user')) {
        if (current.isNewRecord() || (current.u_active && current.u_assigned_user.toString() === gs.getUserID())) {
            answer = true;
            return;
        }
    }

})(current, previous);

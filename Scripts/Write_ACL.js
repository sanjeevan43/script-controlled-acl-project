/**
 * ServiceNow Advanced Record-Level WRITE ACL Script
 * Project: Script-Controlled ACL – Restrict Record Access Based on Field Value
 * Table: u_institution_details (Institution Details)
 * Operation: write
 * Role Required: bb3
 * 
 * Policy:
 * Grants write/edit access on u_institution_details table records ONLY IF:
 * 1. The user possesses the 'bb3' security role.
 * 2. The record's Branch field value equals 'EEE' (current.branch == 'EEE' or current.u_branch == 'EEE').
 */
(function executeRule(current, previous /*null when async*/) {

    // Default deny access
    answer = false;

    // Check 1: User must possess the 'bb3' role
    if (!gs.hasRole('bb3')) {
        answer = false;
        return;
    }

    // Check 2: Evaluate field value (Branch == 'EEE')
    var branchValue = '';
    if (current.u_branch) {
        branchValue = current.u_branch.toString();
    } else if (current.branch) {
        branchValue = current.branch.toString();
    }

    if (branchValue === 'EEE') {
        answer = true;
    } else {
        answer = false;
    }

})(current, previous);


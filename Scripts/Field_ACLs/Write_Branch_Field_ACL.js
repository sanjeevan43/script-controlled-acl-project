/**
 * ServiceNow Advanced Field-Level WRITE ACL Script
 * Table: u_institution_details (Institution Details)
 * Field: u_branch / branch
 * Operation: write
 * 
 * Policy:
 * Restricts modifying the Branch field on existing u_institution_details records.
 * Only users with the 'bb3' role can update the Branch value if it equals 'EEE'.
 */
(function executeRule(current, previous /*null when async*/) {

    // Default deny
    answer = false;

    // Must possess bb3 write role
    if (!gs.hasRole('bb3')) {
        answer = false;
        return;
    }

    var branchValue = current.u_branch ? current.u_branch.toString() : (current.branch ? current.branch.toString() : '');

    if (branchValue === 'EEE') {
        answer = true;
    } else {
        answer = false;
    }

})(current, previous);

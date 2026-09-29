/**
 * Background Script: Automated Setup for Roles and Test Users
 * Target Table: sys_user_role, sys_user, sys_user_has_role
 * Scope: Global / Scoped Application
 * 
 * Usage:
 * Paste and run in ServiceNow -> System Definition -> Scripts - Background
 */
(function setupSecurityUsersAndRoles() {
    gs.info('=== Starting Script-Controlled ACL Setup ===');

    // 1. Define Security Roles
    var roles = [
        { name: 'custom_record_user', description: 'Standard user access role for institution details' },
        { name: 'bb1', description: 'Read operation role for institution details' },
        { name: 'bb2', description: 'Create operation role for institution details' },
        { name: 'bb3', description: 'Write operation role for institution details' },
        { name: 'bb4', description: 'Delete operation role for institution details' }
    ];

    var roleSysIds = {};
    for (var i = 0; i < roles.length; i++) {
        var grRole = new GlideRecord('sys_user_role');
        grRole.addQuery('name', roles[i].name);
        grRole.query();
        if (!grRole.next()) {
            grRole.initialize();
            grRole.name = roles[i].name;
            grRole.description = roles[i].description;
            roleSysIds[roles[i].name] = grRole.insert();
            gs.info('[SETUP] Created Role: ' + roles[i].name);
        } else {
            roleSysIds[roles[i].name] = grRole.getUniqueValue();
            gs.info('[SETUP] Role already exists: ' + roles[i].name);
        }
    }

    // 2. Define Test Users
    var users = [
        { user_name: 'eee_user_test', first_name: 'EEE', last_name: 'TestUser', email: 'eee.user@example.com', roles: ['custom_record_user', 'bb1', 'bb2', 'bb3', 'bb4'] },
        { user_name: 'cse_user_test', first_name: 'CSE', last_name: 'TestUser', email: 'cse.user@example.com', roles: ['custom_record_user', 'bb1'] }
    ];

    for (var j = 0; j < users.length; j++) {
        var u = users[j];
        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('user_name', u.user_name);
        grUser.query();
        var userSysId = '';
        if (!grUser.next()) {
            grUser.initialize();
            grUser.user_name = u.user_name;
            grUser.first_name = u.first_name;
            grUser.last_name = u.last_name;
            grUser.email = u.email;
            grUser.active = true;
            userSysId = grUser.insert();
            gs.info('[SETUP] Created User: ' + u.user_name);
        } else {
            userSysId = grUser.getUniqueValue();
            gs.info('[SETUP] User already exists: ' + u.user_name);
        }

        // 3. Assign Roles to User
        for (var k = 0; k < u.roles.length; k++) {
            var roleName = u.roles[k];
            if (roleSysIds[roleName]) {
                var grHasRole = new GlideRecord('sys_user_has_role');
                grHasRole.addQuery('user', userSysId);
                grHasRole.addQuery('role', roleSysIds[roleName]);
                grHasRole.query();
                if (!grHasRole.next()) {
                    grHasRole.initialize();
                    grHasRole.user = userSysId;
                    grHasRole.role = roleSysIds[roleName];
                    grHasRole.insert();
                    gs.info('[SETUP] Assigned role ' + roleName + ' to user ' + u.user_name);
                }
            }
        }
    }

    gs.info('=== Setup Completed Successfully ===');
})();

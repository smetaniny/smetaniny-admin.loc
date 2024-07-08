import {default as GroupPermissionsList} from '../resource/groupPermissions/GroupPermissionsList';
import {default as GroupPermissionsCreate} from '../resource/groupPermissions/GroupPermissionsCreate';
import {default as GroupPermissionsEdit} from '../resource/groupPermissions/GroupPermissionsEdit';

export default (permissions = []) => {
    return {
        list: permissions.some((el) => el.name === 'GroupPermissionsList' || el.group_permission_id === 1) ?
            <GroupPermissionsList permissions={permissions} /> : null,
        create: permissions.some((el) => el.name === 'GroupPermissionsCreate' || el.group_permission_id === 1) ?
            <GroupPermissionsCreate permissions={permissions} /> : null,
        edit: permissions.some((el) => el.name === 'GroupPermissionsEdit' || el.group_permission_id === 1) ?
            <GroupPermissionsEdit permissions={permissions} /> : null
    };
};

import {default as PermissionsList} from '../resource/permissions/PermissionsList';
import {default as PermissionsCreate} from '../resource/permissions/PermissionsCreate';
import {default as PermissionsEdit} from '../resource/permissions/PermissionsEdit';

export default (permissions = []) => {
    return {
        list: permissions.some((el) => el.name === 'PermissionsList') ?
            <PermissionsList permissions={permissions} /> : undefined,
        create: permissions.some((el) => el.name === 'PermissionsCreate') ?
            <PermissionsCreate permissions={permissions} /> : undefined,
        edit: permissions.some((el) => el.name === 'PermissionsEdit') ?
            <PermissionsEdit permissions={permissions} /> : undefined
    };
};

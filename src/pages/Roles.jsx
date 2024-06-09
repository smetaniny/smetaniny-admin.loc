import {default as RolesList} from '../resource/roles/RolesList';
import {default as RolesCreate} from '../resource/roles/RolesCreate';
import {default as RolesEdit} from '../resource/roles/RolesEdit';

export default (permissions = []) => {
    return {
        list: permissions.some((el) => el.name === 'RolesList') ?
            <RolesList permissions={permissions} /> : null,
        create: permissions.some((el) => el.name === 'RolesCreate') ?
            <RolesCreate permissions={permissions} /> : null,
        edit: permissions.some((el) => el.name === 'RolesEdit') ?
            <RolesEdit permissions={permissions} /> : null,
    };
};


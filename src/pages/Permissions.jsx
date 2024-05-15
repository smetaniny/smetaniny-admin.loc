const user = JSON.parse(sessionStorage.getItem('user'));
import {default as PermissionsList} from '../components/permissions/PermissionsList';
import {default as PermissionsCreate} from '../components/permissions/PermissionsCreate';
import {default as PermissionsEdit} from '../components/permissions/PermissionsEdit';

export default {
    list: user?.role?.permissions?.some((el) => el.name === 'PermissionsList') ? PermissionsList : null,
    create: user?.role?.permissions?.some((el) => el.name === 'PermissionsCreate') ? PermissionsCreate : null,
    edit: user?.role?.permissions?.some((el) => el.name === 'PermissionsEdit') ? PermissionsEdit : null,
};

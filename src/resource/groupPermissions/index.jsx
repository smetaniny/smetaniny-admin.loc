import { default as GroupPermissionsList } from "./GroupPermissionsList";
import { default as GroupPermissionsCreate } from "./GroupPermissionsCreate";
import { default as GroupPermissionsEdit } from "./GroupPermissionsEdit";

export default (permissions = []) => {
  return {
    list: permissions.some(
      (el) =>
        el.name === "group.permissions.list" || el.group_permission_id === 1,
    ) ? (
      <GroupPermissionsList permissions={permissions} />
    ) : undefined,
    create: permissions.some(
      (el) =>
        el.name === "group.permissions.create" || el.group_permission_id === 1,
    ) ? (
      <GroupPermissionsCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some(
      (el) =>
        el.name === "group.permissions.edit" || el.group_permission_id === 1,
    ) ? (
      <GroupPermissionsEdit permissions={permissions} />
    ) : undefined,
  };
};

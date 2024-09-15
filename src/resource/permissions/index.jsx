import { default as PermissionsList } from "./PermissionsList";
import { default as PermissionsCreate } from "./PermissionsCreate";
import { default as PermissionsEdit } from "./PermissionsEdit";

export default (permissions = []) => {
  return {
    list: permissions.some((el) => el.name === "permissions.list") ? (
      <PermissionsList permissions={permissions} />
    ) : undefined,
    create: permissions.some((el) => el.name === "permissions.create") ? (
      <PermissionsCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some((el) => el.name === "permissions.edit") ? (
      <PermissionsEdit permissions={permissions} />
    ) : undefined,
  };
};

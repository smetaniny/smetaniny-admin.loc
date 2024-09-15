import { default as RolesList } from "./RolesList";
import { default as RolesCreate } from "./RolesCreate";
import { default as RolesEdit } from "./RolesEdit";

export default (permissions = []) => {
  return {
    list: permissions.some((el) => el.name === "roles.list") ? (
      <RolesList permissions={permissions} />
    ) : undefined,
    create: permissions.some((el) => el.name === "roles.create") ? (
      <RolesCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some((el) => el.name === "roles.edit") ? (
      <RolesEdit permissions={permissions} />
    ) : undefined,
  };
};

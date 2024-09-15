import { default as UsersAdminList } from "./UsersAdminList";
import { default as UsersAdminCreate } from "./UsersAdminCreate";
import { default as UsersAdminEdit } from "./UsersAdminEdit";

export default (permissions = []) => {
  return {
    list: permissions.some((el) => el.name === "users.admin.list") ? (
      <UsersAdminList permissions={permissions} />
    ) : undefined,
    create: permissions.some((el) => el.name === "users.admin.create") ? (
      <UsersAdminCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some((el) => el.name === "users.admin.edit") ? (
      <UsersAdminEdit permissions={permissions} />
    ) : undefined,
  };
};

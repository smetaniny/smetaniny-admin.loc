import { default as UsersList } from "./UsersList";
import { default as UsersCreate } from "./UsersCreate";
import { default as UsersEdit } from "./UsersEdit";

export default (permissions = []) => {
  return {
    list: permissions.some((el) => el.name === "users.list") ? (
      <UsersList permissions={permissions} />
    ) : undefined,
    create: permissions.some((el) => el.name === "users.create") ? (
      <UsersCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some((el) => el.name === "users.edit") ? (
      <UsersEdit permissions={permissions} />
    ) : undefined,
  };
};

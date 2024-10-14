import React from "react";
import { Permission } from "../../../interface/Permission";

export type UsersAdminModule = (permissions?: Permission[]) => {
  list: React.ReactElement | undefined;
  create: React.ReactElement | undefined;
  edit: React.ReactElement | undefined;
};

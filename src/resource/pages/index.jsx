import { default as PagesList } from "./PagesList";
import { default as PagesCreate } from "./PagesCreate";
import { default as PagesEdit } from "./PagesEdit";

export default (permissions = []) => {
  return {
    list: permissions.some((el) => el.name === "pages.list") ? (
      <PagesList permissions={permissions} />
    ) : undefined,
    create: permissions.some((el) => el.name === "pages.create") ? (
      <PagesCreate permissions={permissions} />
    ) : undefined,
    edit: permissions.some((el) => el.name === "pages.edit") ? (
      <PagesEdit permissions={permissions} />
    ) : undefined,
  };
};

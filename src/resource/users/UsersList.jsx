import React from "react";
import { Fragment } from "react";
import { DatagridConfigurable, DateField, List, TextField } from "react-admin";
import { Divider } from "@mui/material";
import { ListActions } from "../components/BaseList";
import ListFilter from "../components/ListFilter";

const UsersList = (props) => {
  return (
    <List
      {...props}
      filterDefaultValues={{
        contentFields: [],
      }}
      sort={{ field: "created_at", order: "DESC" }}
      actions={<ListActions />}
      filters={<ListFilter />}
    >
      <Fragment>
        <Divider />
        <DatagridConfigurable
          rowClick="edit"
          omit={["total_ex_taxes", "delivery_fees", "taxes"]}
        >
          <TextField source="id" label="Индитификатор" />
          <TextField source="name" label="Имя" />
          <TextField source="email" label="email" />
          <DateField source="created_at" showTime label="Создание" />
          <DateField source="updated_at" showTime label="Обновление" />
        </DatagridConfigurable>
      </Fragment>
    </List>
  );
};

export default UsersList;

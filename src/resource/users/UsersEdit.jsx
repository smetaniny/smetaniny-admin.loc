import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import { Tab, Tabs } from "@mui/material";

const UsersEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <Tabs>
          <Tab label="Общие" />
        </Tabs>
        <TabOneRoles />
      </SimpleForm>
    </Edit>
  );
};

const TabOneRoles = () => {
  return (
    <>
      <TextInput disabled label="Id" source="id" fullWidth />
      <TextInput source="name" label="Имя" fullWidth />

      {/*<ArrayInput source="permissions" fullWidth className={'mt-30'}>*/}
      {/*    <SimpleFormIterator fullWidth inline>*/}
      {/*        <TextInput source="group" fullWidth />*/}
      {/*        <TextInput source="name" fullWidth />*/}
      {/*        <TextInput source="description" fullWidth className={'mb-30'} />*/}
      {/*    </SimpleFormIterator>*/}
      {/*</ArrayInput>*/}
    </>
  );
};

export default UsersEdit;

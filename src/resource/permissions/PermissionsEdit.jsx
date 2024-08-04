// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Edit, SimpleForm, TextInput,} from 'react-admin';


const PermissionsEdit = (props) => {
    return <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" fullWidth />
            <TextInput source="name" label="Имя" fullWidth />
            <TextInput source="description" label="Описание" fullWidth />
            <TextInput source="group" label="Группа" fullWidth />
        </SimpleForm>
    </Edit>
};

export default PermissionsEdit;

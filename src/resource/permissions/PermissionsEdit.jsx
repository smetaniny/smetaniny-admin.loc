import * as React from 'react';
import {useState} from 'react';
import {Edit, SimpleForm, useRefresh, useNotify, useRecordContext, TextInput,} from 'react-admin';
import {Box, Card, CardContent, Grid, Tab, Tabs} from "@mui/material";


const PermissionsEdit = (props) => {
    const [error, setError] = useState(null);
    // const [value, setValue] = useState(0);
    const refresh = useRefresh();
    const notify = useNotify();

    // const handleSubmit = async (values) => {
    //     await dataProvider.handleSubmitEdit('permissions', values, setError, notify);
    //     setValue(0);
    //     refresh();
    // };

    const onSuccess = () => {
        refresh();
        notify('Изменения сохранены');
    };

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const PagesTitle = () => {
        const record = useRecordContext();
        return record ? (
            <span>
            {record.title}
        </span>
        ) : null;
    };

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

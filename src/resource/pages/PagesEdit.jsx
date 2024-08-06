// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState} from "react";
import {Edit, SimpleForm, useRefresh, useNotify, useRecordContext} from 'react-admin';
import { dataProvider }  from '@/dataProvider';
import PageCard from '@/resource/pages/PageCard';

const PagesEdit = () => {
    const [value, setValue] = useState(0);
    const refresh = useRefresh();
    const notify = useNotify();

    const handleSubmit = async (values) => {
        await dataProvider.create('pages', values);
        setValue(0);
        refresh();
    };

    const onSuccess = () => {
        refresh();
        notify('Изменения сохранены');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const PagesTitle = () => {
        const record = useRecordContext();
        return record ? (
            <span>
            {record.title}
        </span>
        ) : null;
    };

    return <Edit
        mutationOptions={{onSuccess}}
        title={<PagesTitle />}
        component="div">
        <SimpleForm
            undoable="false"
            onSubmit={handleSubmit}>
            <PageCard setValue={setValue} value={value} handleChange={handleChange} flag="edit" />
        </SimpleForm>
    </Edit>

};



export default PagesEdit;

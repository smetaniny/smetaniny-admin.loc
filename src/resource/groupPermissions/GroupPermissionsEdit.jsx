import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    required,
} from 'react-admin';
import SectionTitle from "../components/SectionTitle";

const GroupPermissionsEdit = (props) => {
    const { record } = props;

    return (
        <Edit {...props}>
            <SimpleForm>
                <SectionTitle>Общие</SectionTitle>
                <TextInput disabled label="Id" source="id" fullWidth />
                <TextInput source="name" label="Имя" validate={required()} fullWidth />
                <SectionTitle>Разрешения</SectionTitle>
                {/* Ввод массива разрешений */}
                <ArrayInput source="permissions" label="Список разрешений">
                    <SimpleFormIterator fullWidth>
                        <TextInput source="id" label="ID" disabled fullWidth />
                        <TextInput source="name" label="Имя" validate={required()} fullWidth />
                        <TextInput source="description" label="Описание" fullWidth className={`mb-15`} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};

export default GroupPermissionsEdit;

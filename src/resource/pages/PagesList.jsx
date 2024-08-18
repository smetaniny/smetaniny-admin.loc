// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Fragment} from 'react';
import {
    DatagridConfigurable,
    DateField,
    List,
    TextField,
} from 'react-admin';
import {Divider} from '@mui/material';

const PagesList = (props) => {
    return <List {...props}>
        <Fragment>
            <Divider />
            <DatagridConfigurable
                rowClick="edit"
                omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
            >
                <TextField source="id" label="Индитификатор" />
                <TextField source="content.menu_title" label="Псевдоним" />
                <TextField source="content.slug" label="URL" />
                <TextField source="ontent.parent_id" label="ID Родителя" />
                <DateField source="created_at" showTime label="Создание" />
                <DateField source="updated_at" showTime label="Обновление" />
            </DatagridConfigurable>
        </Fragment>
    </List>
};


export default PagesList;

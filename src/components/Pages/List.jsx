import * as React from 'react';
import {Fragment} from 'react';
import {
    DatagridConfigurable,
    DateField,
    List,
    TextField,
} from 'react-admin';
import {Divider} from '@mui/material';
import {ListActions, OrderFilters} from "../BaseList";

const PagesList = (props) => {

    return <List
        {...props}
        filterDefaultValues={{status: 'ordered'}}
        sort={{field: 'created_at', order: 'DESC'}}
        perPage={10}
        filters={OrderFilters}
        actions={<ListActions />}
    >
        <Fragment>
            <Divider />
            <DatagridConfigurable
                rowClick="edit"
                omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
            >
                <TextField source="id" label="Индитификатор" />
                <TextField source="alias" label="Псевдоним" />
                <TextField source="name" label="Имя" />
                <TextField source="description" label="Описание" />
                <DateField source="created_at" showTime label="Создали" />
                <DateField source="updated_at" showTime label="Обноаили" />
            </DatagridConfigurable>
        </Fragment>
    </List>
};


export default PagesList;

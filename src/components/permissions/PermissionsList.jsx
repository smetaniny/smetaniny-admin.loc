import * as React from 'react';
import {Fragment} from 'react';
import {
    DatagridConfigurable,
    DateField,
    SimpleList,
    List,
    useRecordContext,
    TextField,
    DateInput, Filter, SearchInput, SelectArrayInput, SelectInput, useListContext
} from 'react-admin';
import {Divider} from '@mui/material';
import {ListActions, OrderFilters} from "../BaseList";


const PermissionsList = (props) => {
    return <List
        {...props}
        filterDefaultValues={
            {
                group: {distinct: true},
                table: 'permissions',
                contentFields: [
                    'name',
                    'description',
                    'group',
                ],
                selectFields: [
                    'group',
                ],
            }
        }
        sort={{field: 'created_at', order: 'DESC'}}
        actions={<ListActions />}
        filters={<PermissionsListFilter />}
    >
        <Fragment>
            <Divider />
            <DatagridConfigurable
                rowClick="edit"
                omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
            >
                <TextField source="id" label="Индитификатор" />
                <TextField source="group" label="Имя" />
                <TextField source="description" label="Описание" />
                <TextField source="roles[0].name" label="Имя роли" />
                <DateField source="created_at" showTime label="Создание" />
                <DateField source="updated_at" showTime label="Обновление" />
            </DatagridConfigurable>
        </Fragment>
    </List>
};


/**
 * Компонент для фильтрации
 *
 * @param {object} props Пропсы компонента.
 * @returns {JSX.Element} Компонент фильтра.
 */
const PermissionsListFilter = (props) => {
    // Разбираем пропсы, используя де структуризацию. Если filterValues не заданы в пропсах, то используем пустой объект по умолчанию.
    const {filterValues = {}, ...restProps} = props;

    // Возвращаем компонент Filter с настроенными SearchInput и DateInput компонентами.
    return (
        <Filter {...restProps}>
            {/* Поле для поиска */}
            <SearchInput
                source={`content`}
                alwaysOn
            />
            {/* Поле для выбора даты начала */}
            <DateInput label={`От`} source="date_start" alwaysOn />
            {/* Поле для выбора даты окончания */}
            <DateInput label={`До`} source="date_end" alwaysOn />
        </Filter>
    );
};

export default PermissionsList;

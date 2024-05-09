import React from 'react';
import {
    CreateButton,
    ExportButton,
    SearchInput,
    SelectColumnsButton,
    TopToolbar,
    useListContext
} from "react-admin";

const OrderFilters = [
    <SearchInput source="q" name={``} alwaysOn />,
];

const ListActions = () => {
    const listContext = useListContext();
    if (listContext.data !== undefined && listContext.data.length === 0) {
        return <TopToolbar>
            <CreateButton />
        </TopToolbar>
    } else {
        return <TopToolbar>
            <SelectColumnsButton />
            <ExportButton />
            <CreateButton />
        </TopToolbar>
    }
};

export {OrderFilters, ListActions}

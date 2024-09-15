// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import {
  CreateButton,
  ExportButton,
  SearchInput,
  SelectColumnsButton,
  TopToolbar,
  useListContext,
} from "react-admin";

const OrderFilters = [<SearchInput key="search-input" source="q" alwaysOn />];

const ListActions = () => {
  const { data } = useListContext();

  return (
    <TopToolbar>
      {data && data.length > 0 && (
        <>
          <SelectColumnsButton />
          <ExportButton />
        </>
      )}
      <CreateButton />
    </TopToolbar>
  );
};

export { OrderFilters, ListActions };

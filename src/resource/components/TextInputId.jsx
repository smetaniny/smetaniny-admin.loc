import React from 'react';
import {Grid} from "@mui/material";
import {TextInput, useRecordContext} from "react-admin";

const TextInputId = ({flag}) => {
    if (flag !== "create") {
        return <Grid item xs={12}>
            <TextInput
                source="id"
                label="Индитификатор"
                disabled={true}
                fullWidth
            /></Grid>
    } else {
        return null;
    }
};

export default TextInputId;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Grid} from "@mui/material";
import {TextInput} from "react-admin";
import PropTypes from 'prop-types';

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

TextInputId.propTypes = {
    flag: PropTypes.bool,
};


export default TextInputId;

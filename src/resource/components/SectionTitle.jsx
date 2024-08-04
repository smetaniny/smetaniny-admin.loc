// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ children }) => {
    return (
        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {children}
        </h2>
    );
};

SectionTitle.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SectionTitle;

import React from 'react';

const SectionTitle = ({ children }) => {
    return (
        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {children}
        </h2>
    );
};

export default SectionTitle;

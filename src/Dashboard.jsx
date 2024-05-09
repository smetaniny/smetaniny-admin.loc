import React from 'react';
import { useMediaQuery } from '@mui/material';


import Welcome from './pages/Welcome';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Dashboard = () => {
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('lg')
    );

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <Welcome />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
        </div>
    ) : (
        <>
            <Welcome />
        </>
    );
};

export default Dashboard;

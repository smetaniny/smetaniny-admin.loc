// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CircularProgress,
} from '@mui/material';
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
} from 'react-admin';

import Box from '@mui/material/Box';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = () => {
        const auth = { username, password }; // Используйте значения из состояний
        setLoading(true);
        login(
            auth,
            location.state ? (location.state).nextPathname : '/'
        ).catch((error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                {
                    type: 'error',
                    messageArgs: {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                    ? error.message
                                    : undefined,
                    },
                }
            );
        });
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: '№F8F8F8',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Card sx={{minWidth: 300, marginTop: '6em'}}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'start',
                    }}
                    >
                        <a href={"https://smetaniny.ru/"} target={"_blank"} className="loginLink" rel="noreferrer">
                            Smetaniny
                        </a>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                    </Box>
                    <Box sx={{padding: '0 1em 1em 1em'}}>
                        <Box sx={{marginTop: '1em'}}>
                            <TextInput
                                autoFocus
                                source="username"
                                label={translate('ra.auth.username')}
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box sx={{marginTop: '1em'}}>
                            <TextInput
                                source="password"
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <CardActions sx={{padding: '0 1em 1em 1em'}}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

export default Login;


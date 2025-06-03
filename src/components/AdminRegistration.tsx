import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

type FormData = {
    name: string;
    password: string;
};

const AdminRegistrationForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const [registrationToken, setRegistrationToken] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Extract token from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        setRegistrationToken(token);
    }, []);

    const onSubmit = async (data: FormData) => {
        setApiError(null);
        setSuccess(false);

        if (!registrationToken) {
            setApiError('Missing registration token from URL.');
            return;
        }

        try {
            await axios.post(API_ENDPOINTS.ADMIN_REGISTRATION, {
                user: data,
                registration_token: registrationToken,
            });

            setSuccess(true);
        } catch (error: any) {
            setApiError(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
            <Typography variant="h5" gutterBottom>
                Complete Your Registration
            </Typography>

            {apiError && <Alert severity="error">{apiError}</Alert>}
            {success && <Alert severity="success">Registration successful!</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                            startIcon={isSubmitting && <CircularProgress size={20} />}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AdminRegistrationForm;

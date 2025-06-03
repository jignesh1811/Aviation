import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { API_ENDPOINTS } from '../config/apiConfig';
import axios from 'axios';

type EnterpriseCreationFormData = {
    name: string;
    number_of_tails: number;
    email: string;
    phone_number: string;
    admin_email: string;
    domain: string;
};

const EnterpriseCreationForm: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EnterpriseCreationFormData>();

    const [apiError, setApiError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    const onSubmit = async (data: EnterpriseCreationFormData) => {
        setApiError(null);
        setSuccess(false);
        try {
            const response = await axios.post(API_ENDPOINTS.ENTERPRISE_CREATION,
                data,
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                },
            );

            setSuccess(true);
            reset();
        } catch (error: any) {
            setApiError(error.response?.data?.message || error.message || 'Something went wrong');
        }
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
    const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Enterprise Creation Form
            </Typography>

            {apiError && <Alert severity="error">{apiError}</Alert>}
            {success && <Alert severity="success">Registration successful!</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Company name is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company Name"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="number_of_tails"
                            control={control}
                            rules={{
                                required: 'Number of aircraft is required',
                                min: { value: 1, message: 'Must be at least 1' },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Number of Aircraft"
                                    type="number"
                                    fullWidth
                                    error={!!errors.number_of_tails}
                                    helperText={errors.number_of_tails?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Company email is required',
                                pattern: {
                                    value: emailRegex,
                                    message: 'Enter a valid email address',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company Email"
                                    type="email"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="phone_number"
                            control={control}
                            rules={{
                                required: 'Phone number is required',
                                pattern: {
                                    value: phoneRegex,
                                    message: 'Enter a valid phone number',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone Number"
                                    fullWidth
                                    error={!!errors.phone_number}
                                    helperText={errors.phone_number?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="admin_email"
                            control={control}
                            rules={{
                                required: 'Admin email is required',
                                pattern: {
                                    value: emailRegex,
                                    message: 'Enter a valid email address',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Admin Email"
                                    type="email"
                                    fullWidth
                                    error={!!errors.admin_email}
                                    helperText={errors.admin_email?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="domain"
                            control={control}
                            rules={{
                                required: 'Company domain is required',
                                pattern: {
                                    value: domainRegex,
                                    message: 'Enter a valid domain (e.g., example.com)',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company Domain"
                                    fullWidth
                                    error={!!errors.domain}
                                    helperText={errors.domain?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={isSubmitting}
                            startIcon={isSubmitting && <CircularProgress size={20} />}
                        >
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
};

export default EnterpriseCreationForm;

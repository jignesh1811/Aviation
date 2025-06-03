import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

type FormData = {
  name: string;
  email: string;
  password: string;
  crew_role: string;
};

const crewRoles = ['pilot', 'flight_attendant', 'mechanic'];

const UserRegistrationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [registrationToken, setRegistrationToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
      await axios.post(API_ENDPOINTS.USER_REGISTRATION, {
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
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
            <Controller
              name="crew_role"
              control={control}
              rules={{ required: 'Crew role is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Crew Role"
                  select
                  fullWidth
                  error={!!errors.crew_role}
                  helperText={errors.crew_role?.message}
                >
                  {crewRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.replace('_', ' ').toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
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

export default UserRegistrationForm;

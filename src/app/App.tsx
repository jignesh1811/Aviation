import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Button, Container } from '@mui/material';
import { useColorMode } from '../theme/ThemeContext';
import { appRoutes } from './routes';
import { BrowserRouter, useRoutes } from 'react-router-dom';

const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

const App: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <BrowserRouter>
      <Container sx={{ mt: 4 }}>
        <Button variant="contained" onClick={toggleColorMode}>
          Toggle Theme
        </Button>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Container>
    </BrowserRouter>
  );
};

export default App;

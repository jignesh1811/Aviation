import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import { RouteObject } from "react-router-dom";
import NoAccess from '../components/NoAccess';
import PrivateRoute from './privateRoute';
import EnterpriseCreationForm from '../components/EnterpriseCreationForm';
import UserRegistrationForm from '../components/UserRegistration';
import AdminRegistrationForm from '../components/AdminRegistration';

export const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <PrivateRoute allowedAccess={['dashboard']}><Dashboard /></PrivateRoute>,
    },
    {
        path: '/enterprisecreationform',
        element: <EnterpriseCreationForm />,
    },
    {
        path: '/adminregistrationform',
        element: <AdminRegistrationForm />,
    },
     {
        path: '/userregistrationform',
        element: <UserRegistrationForm />,
    },
    {
        path: '/noaccess',
        element: <NoAccess />,
    },
    //   {
    //     path: '*',
    //     element: <NotFound />,
    //   },
];
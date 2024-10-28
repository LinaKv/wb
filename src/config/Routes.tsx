import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Sales from '../pages/Sales';

export const router = createBrowserRouter([
    {
        Component: App, // root layout route
        children: [
            { path: '/', Component: () => <Navigate to="/home" replace /> },
            { path: '/home', Component: Home },
            { path: '/sales', Component: Sales },
        ],
    },
]);

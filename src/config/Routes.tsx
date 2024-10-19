import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import App from '../App';
import Home from '../pages/Home';

export const router = createBrowserRouter([
    {
        Component: App, // root layout route
        children: [
            {
                path: '/',
                Component: MainLayout,
                children: [{ path: '/home', Component: Home }],
            },
        ],
    },
]);

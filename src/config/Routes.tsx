import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import App from '../App';

export const router = createBrowserRouter([
    {
        Component: App, // root layout route
        children: [
            {
                path: '/',
                Component: MainLayout,
            },
        ],
    },
]);

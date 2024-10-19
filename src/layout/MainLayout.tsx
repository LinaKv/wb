import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

const MainLayout = () => {
    return (
        <DashboardLayout>
            <PageContainer breadcrumbs={[]} title="">
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
};

export default MainLayout;

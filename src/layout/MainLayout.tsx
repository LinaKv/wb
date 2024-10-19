import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

type Props = {};

const MainLayout = (props: Props) => {
    return (
        <DashboardLayout>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
};

export default MainLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Content } from 'antd/es/layout/layout';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Sidebar />
            <Layout>
                <Content style={{ padding: '20px', minWidth: '100%' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

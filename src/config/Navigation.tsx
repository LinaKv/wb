import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { NavItem } from '../types/common';
import { Link } from 'react-router-dom';

const NAVIGATION: NavItem[] = [
    {
        title: 'Home',
        icon: <HomeOutlined />,
        path: '/home',
    },
    {
        title: 'Продажи',
        icon: <ShoppingCartOutlined />,
        path: '/sales',
    },
    {
        title: 'Заказы',
        icon: <ShoppingOutlined />,
        path: '/orders',
    },
];

export const menuItems = NAVIGATION.map((navItem) => ({
    key: navItem.title,
    icon: navItem.icon,
    label: <Link to={navItem.path}>{navItem.title}</Link>,
}));

import { Dayjs } from 'dayjs';

export type NavItem = {
    title: string;
    icon: React.ReactNode;
    path: string;
};

export type DateType = {
    startDate: Dayjs;
    endDate: Dayjs;
};

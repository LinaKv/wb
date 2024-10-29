import { Button, Flex } from 'antd';
import { useState } from 'react';
import { Space } from 'antd';
import { Dayjs } from 'dayjs';

import PickerDates from './PickerDates';
import { DateType } from '../../types/common';

type TableTitleProps = {
    title: string;
    startDate: Dayjs;
    endDate: Dayjs;
    onUpdate: () => void;
    onChangeDate: ({ startDate, endDate }: DateType) => void;
};

const TableTitle = ({ title, onUpdate, startDate, endDate, onChangeDate }: TableTitleProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const startTimer = () => {
        setIsLoading(true);
        setRemainingTime(60);

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setIsLoading(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const onClick = () => {
        onUpdate();
        startTimer();
    };

    return (
        <Flex align="center" justify="space-between">
            <h4>{title}</h4>
            <Space>
                <PickerDates endDate={endDate} startDate={startDate} onChangeDate={onChangeDate} />
                <Button type="primary" onClick={onClick} disabled={isLoading}>
                    {isLoading ? `Подожди ${remainingTime} сек` : 'Обновить данные'}
                </Button>
            </Space>
        </Flex>
    );
};

export default TableTitle;

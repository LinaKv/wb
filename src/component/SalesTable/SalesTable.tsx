import { Table, message } from 'antd';
import { useState } from 'react';
import { DataType, SalesItem } from '../../types/sales';
import TableTitle from '../TableWithData/TableTitle';
import { handlerResponseSales } from './responseHandler';
import { salesColumns } from './tableColumns';
import dayjs from 'dayjs';
import { DateType } from '../../types/common';

const token = import.meta.env.VITE_API_TOKEN;
const today = dayjs();

const SalesTable = () => {
    const [data, setData] = useState<DataType[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [datePeriod, setDatePeriod] = useState<DateType>({ startDate: today.subtract(30, 'day'), endDate: today });

    const [messageApi, contextHolder] = message.useMessage();

    const onUpdateData = async () => {
        setIsLoading(true);
        const dateFrom = '2019-06-20T23:59:59';
        try {
            const response = await fetch(
                `https://statistics-api.wildberries.ru/api/v1/supplier/sales?dateFrom=${encodeURIComponent(dateFrom)}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData: SalesItem[] = await response.json();

            console.log(datePeriod);
            const newData1 = handlerResponseSales(responseData, datePeriod);

            setData(newData1);
            console.log('Sales Data:', newData1);
        } catch (error) {
            handlerError('Ошибка при загрузке данных');
        }
        setIsLoading(false);
    };

    const onChangeDate = ({ startDate, endDate }: DateType) => {
        setDatePeriod({ startDate, endDate });
    };

    const handlerError = (err: string) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    };

    return (
        <>
            {contextHolder}
            <Table<DataType>
                columns={salesColumns}
                dataSource={data}
                loading={isLoading}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 100 * 5, x: 'max-content' }}
                title={() => (
                    <TableTitle
                        title="Таблица продаж"
                        startDate={datePeriod.startDate}
                        endDate={datePeriod.endDate}
                        onUpdate={onUpdateData}
                        onChangeDate={onChangeDate}
                    />
                )}
            />
        </>
    );
};

export default SalesTable;
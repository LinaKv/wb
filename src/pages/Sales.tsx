import { Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { SalesItem } from '../types/sales';

const token = import.meta.env.VITE_API_TOKEN;

interface DataType {
    key: string;
    supplierArticle: string;
    totalPrice: number;
    discountPercent: number;
    spp: number;
    forPay: number;
    finishedPrice: number;
    priceWithDisc: number;
    saleID: string;
}

const Sales = () => {
    const [data, setData] = useState<DataType[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID продажи/возврата',
            dataIndex: 'saleID',
            key: 'saleID',
            render: (text) => <Tag color={text.toUpperCase().includes('S') ? 'green' : 'red'}>{text}</Tag>,
            width: 'min-content',
        },
        {
            title: 'Артикул',
            dataIndex: 'supplierArticle',
            key: 'supplierArticle',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Цена без скидок',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Скидка продавца',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
        },
        {
            title: 'Скидка WB',
            dataIndex: 'spp',
            key: 'spp',
        },
        {
            title: 'К перечислению продавцу',
            dataIndex: 'forPay',
            key: 'forPay',
        },
        {
            title: 'Фактическая цена',
            dataIndex: 'finishedPrice',
            key: 'finishedPrice',
        },
        {
            title: 'Цена со скидкой продавца',
            dataIndex: 'priceWithDisc',
            key: 'priceWithDisc',
        },
    ];

    useEffect(() => {
        const getSalesData = async () => {
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
                const newData = responseData.map((el, index) => ({
                    supplierArticle: el.supplierArticle,
                    discountPercent: el.discountPercent,
                    key: `${index}`,
                    spp: el.spp,
                    totalPrice: el.totalPrice,
                    forPay: el.forPay,
                    finishedPrice: el.finishedPrice,
                    priceWithDisc: el.priceWithDisc,
                    saleID: el.saleID,
                }));
                setData(newData);
                console.log('Sales Data:', data); // Работаем с полученными данными
            } catch (error) {
                console.error('Error:', error); // Обработка ошибок
            }
            setIsLoading(false);
        };

        getSalesData();
    }, []);

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 100 * 5, x: 'max-content' }}
                title={() => 'Таблица продаж'}
            />
        </div>
    );
};

export default Sales;

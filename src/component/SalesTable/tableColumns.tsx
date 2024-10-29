import { TableProps } from 'antd';
import { DataType } from '../../types/sales';
import { toRub } from '../../helpers/helpers';

export const salesColumns: TableProps<DataType>['columns'] = [
    {
        title: 'Артикул',
        dataIndex: 'supplierArticle',
        key: 'supplierArticle',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Кол-во продаж',
        dataIndex: 'amount',
        key: 'amount',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Цена без скидок',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Скидка продавца',
        dataIndex: 'discountPercent',
        key: 'discountPercent',
        render: (text) => <>{text.toFixed(2)} %</>,
    },
    {
        title: 'Скидка WB',
        dataIndex: 'spp',
        key: 'spp',
        render: (text) => <>{text.toFixed(2)} %</>,
    },
    {
        title: 'К перечислению продавцу',
        dataIndex: 'forPay',
        key: 'forPay',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Фактическая цена',
        dataIndex: 'finishedPrice',
        key: 'finishedPrice',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Цена со скидкой продавца',
        dataIndex: 'priceWithDisc',
        key: 'priceWithDisc',
        render: (text) => <>{toRub(text)}</>,
    },
];

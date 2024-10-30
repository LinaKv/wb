import { Flex } from 'antd';
import OrdersTable from '../component/OrdersTable/OrdersTable';
import SalesTable from '../component/SalesTable/SalesTable';

const Static = () => {
    return (
        <Flex gap={30} vertical>
            <SalesTable />
            <OrdersTable />
        </Flex>
    );
};

export default Static;

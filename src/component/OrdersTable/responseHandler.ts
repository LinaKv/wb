import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType } from '../../types/common';
import { DataOrdersType, OrdersType } from '../../types/orders';
dayjs.extend(isBetween);

export const handlerResponseOrders = (responseData: OrdersType[], datePeriod: DateType) => {
    return responseData.reduce((acc: DataOrdersType[], item, index) => {
        const { supplierArticle, spp, totalPrice, finishedPrice, date } = item;

        const dateToCheck = dayjs(date).startOf('day');
        const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');

        const shouldAddItem = isGoodDate;
        // check if item exist
        const existingItem = acc.find((item) => item.supplierArticle === supplierArticle && shouldAddItem);

        if (existingItem) {
            existingItem.amount += 1;
            existingItem.sppSum += spp;
            existingItem.spp = existingItem.sppSum / existingItem.amount;
            existingItem.totalPriceSum += totalPrice;
            existingItem.totalPriceSum += totalPrice;
            existingItem.totalPrice = existingItem.totalPriceSum / existingItem.amount;
            existingItem.finishedPriceSum += finishedPrice;
            existingItem.finishedPrice = existingItem.finishedPriceSum / existingItem.amount;
        } else if (shouldAddItem) {
            acc.push({
                supplierArticle,
                spp,
                sppSum: spp,
                totalPrice,
                totalPriceSum: totalPrice,
                finishedPrice,
                finishedPriceSum: finishedPrice,
                key: index,
                amount: 1,
            });
        }

        return acc;
    }, []);
};

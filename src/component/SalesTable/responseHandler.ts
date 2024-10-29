import { DataType, SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType } from '../../types/common';
dayjs.extend(isBetween);

export const handlerResponseSales = (responseData: SalesItem[], datePeriod: DateType) => {
    return responseData.reduce((acc: DataType[], item, index) => {
        const {
            supplierArticle,
            discountPercent,
            spp,
            totalPrice,
            forPay,
            finishedPrice,
            priceWithDisc,
            saleID,
            date,
        } = item;

        const dateToCheck = dayjs(date).startOf('day');
        const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');
        const isSale = saleID.includes('S');

        const shouldAddItem = isGoodDate && isSale;
        // check if item exist
        const existingItem = acc.find((item) => item.supplierArticle === supplierArticle && shouldAddItem);

        if (existingItem) {
            existingItem.amount += 1;
            existingItem.discountPercentSum += discountPercent;
            existingItem.discountPercent = existingItem.discountPercentSum / existingItem.amount;
            existingItem.sppSum += spp;
            existingItem.spp = existingItem.sppSum / existingItem.amount;
            existingItem.totalPriceSum += totalPrice;
            existingItem.totalPriceSum += totalPrice;
            existingItem.totalPrice = existingItem.totalPriceSum / existingItem.amount;
            existingItem.forPay += forPay;
            existingItem.finishedPriceSum += finishedPrice;
            existingItem.finishedPrice = existingItem.finishedPriceSum / existingItem.amount;
            existingItem.priceWithDiscSum += priceWithDisc;
            existingItem.priceWithDisc = existingItem.priceWithDiscSum / existingItem.amount;
        } else if (shouldAddItem) {
            acc.push({
                supplierArticle,
                discountPercent,
                discountPercentSum: discountPercent,
                spp,
                sppSum: spp,
                totalPrice,
                totalPriceSum: totalPrice,
                forPay,
                finishedPrice,
                finishedPriceSum: finishedPrice,
                priceWithDisc,
                priceWithDiscSum: priceWithDisc,
                key: index,
                amount: 1,
            });
        }

        if (saleID.includes('R')) {
            console.log('return');
        }

        return acc;
    }, []);
};

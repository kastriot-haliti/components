import { FC, MouseEvent, ChangeEvent } from 'react';
import ITableColumn from '../types/ITableColumn.interface';
interface Props {
    columns: ITableColumn[];
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof ITableColumn) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy?: string;
    rowCount: number;
}
declare type Order = 'asc' | 'desc';
declare const EnhancedTableHead: FC<Props>;
export default EnhancedTableHead;

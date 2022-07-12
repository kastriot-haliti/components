import * as React from 'react';
import { ITableColumn } from '../types/ITableColumn.interface';
interface Props {
    columns: ITableColumn[];
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITableColumn) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy?: string;
    rowCount: number;
}
declare type Order = 'asc' | 'desc';
declare const EnhancedTableHead: (props: Props) => JSX.Element;
export default EnhancedTableHead;

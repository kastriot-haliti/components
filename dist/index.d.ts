import { FC, MouseEvent, ChangeEvent } from 'react';

declare enum TableCellType {
    Default = 0,
    Text = 1,
    Number = 2,
    Select = 3
}

interface ITableColumn {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    type?: TableCellType;
    disablePadding: boolean;
    show: boolean;
}

interface ITableCell {
    key: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    type?: TableCellType;
    value: string;
    columnId: string;
}

interface ITableRow {
    key: string;
    data: ITableCell[];
}

interface Props$2 {
    title?: string;
    columns?: ITableColumn[];
    rows?: ITableRow[];
    dense?: boolean;
    handleOpenAddDialog(): void;
    handleOpenFilterDialog?(): void;
    handleOpenSettingsDialog?(): void;
    handleOpenDeleteDialog?(): void;
}
declare const EnhancedTable: FC<Props$2>;

interface Props$1 {
    title?: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
}
declare const EnhancedTableToolbar: FC<Props$1>;

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

export { EnhancedTable, EnhancedTableHead, EnhancedTableToolbar, ITableCell, ITableColumn, ITableRow, TableCellType };

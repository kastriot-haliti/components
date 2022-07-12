/// <reference types="react" />
import * as React from 'react';
import { FC } from 'react';

declare const EnhancedTable: FC;

interface Props$1 {
    title: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
}
declare const EnhancedTableToolbar: (props: Props$1) => JSX.Element;

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

export { EnhancedTable, EnhancedTableHead, EnhancedTableToolbar };

import { FC, MouseEvent, ChangeEvent } from 'react';

declare enum TableCellType {
    Default = 0,
    Text = 1,
    Number = 2,
    Select = 3,
    Actions = 4
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

declare enum ActionType {
    delete = "delete",
    edit = "edit",
    checkin = "checkin",
    checkout = "checkout",
    cancel = "cancel",
    details = "details"
}

interface Props$5 {
    multiSelection?: boolean;
    title?: string;
    columns?: ITableColumn[];
    rows?: any[];
    dense?: boolean;
    handleOpenAddDialog(): void;
    handleOpenFilterDialog?(): void;
    handleOpenSettingsDialog?(): void;
    handleOpenDeleteDialog?(): void;
    handleSelectRows(selected: number[]): void;
    handleExport?(type: string): void;
    handleAction?(action: ActionType, item: any): void;
    width?: number;
    rowsPerPage?: number;
}
declare const EnhancedTable: FC<Props$5>;

interface Props$4 {
    multiSelection?: boolean;
    title?: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
    handleExport?(type: string): void;
}
declare const EnhancedTableToolbar: FC<Props$4>;

interface Props$3 {
    multiSelection?: boolean;
    title?: string;
    numSelected?: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
    children?: any;
}
declare const EnhancedTableToolbar2: FC<Props$3>;

interface Props$2 {
    multiSelection?: boolean;
    columns: ITableColumn[];
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof ITableColumn) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy?: string;
    rowCount: number;
}
declare type Order = 'asc' | 'desc';
declare const EnhancedTableHead: FC<Props$2>;

interface Props$1 {
    multiSelection?: boolean;
    title?: string;
    columns?: ITableColumn[];
    rows?: any[];
    dense?: boolean;
    handleOpenAddDialog?(): void;
    handleOpenFilterDialog?(): void;
    handleOpenSettingsDialog?(): void;
    handleOpenDeleteDialog?(): void;
    handleSelectRows?(selected: number[]): void;
    width?: number;
}
declare const EnhancedTableBody: FC<Props$1>;

interface ITableCell {
    key: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
    type?: TableCellType;
    value: string | any;
    columnId: string;
}

interface ITableRow {
    id: number;
    key: string;
    data: ITableCell[];
}

declare const enhancedTableToCsv: (columns: ITableColumn[], rows: ITableRow[]) => string[][];

declare enum FilterOptionType {
    all = 0,
    yes = 1,
    no = 2
}

interface Props {
    options?: FilterOptionType;
    onChange(filter: FilterOptionType): void;
}
declare const FilterOption: FC<Props>;

export { ActionType, EnhancedTable, EnhancedTableBody, EnhancedTableHead, EnhancedTableToolbar, EnhancedTableToolbar2, FilterOption, ITableCell, ITableColumn, ITableRow, TableCellType, enhancedTableToCsv };

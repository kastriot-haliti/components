import { FC } from 'react';
import ITableColumn from '../types/ITableColumn.interface';
import ActionType from '../enums/action-type.enum';
interface Props {
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
declare const EnhancedTable: FC<Props>;
export default EnhancedTable;

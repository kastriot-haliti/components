import { FC } from 'react';
import ITableColumn from '../types/ITableColumn.interface';
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
    width?: number;
}
declare const EnhancedTable: FC<Props>;
export default EnhancedTable;

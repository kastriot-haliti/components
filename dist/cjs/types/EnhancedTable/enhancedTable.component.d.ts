import { FC } from 'react';
import ITableColumn from '../types/ITableColumn.interface';
import ITableRow from '../types/ITableRow.interface';
interface Props {
    title?: string;
    columns?: ITableColumn[];
    rows?: ITableRow[];
    dense?: boolean;
    handleOpenAddDialog(): void;
    handleOpenFilterDialog?(): void;
    handleOpenSettingsDialog?(): void;
    handleOpenDeleteDialog?(): void;
}
declare const EnhancedTable: FC<Props>;
export default EnhancedTable;

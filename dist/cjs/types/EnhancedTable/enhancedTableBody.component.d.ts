import { FC } from 'react';
import ITableColumn from '../types/ITableColumn.interface';
interface Props {
    multiSelection?: boolean;
    title?: string;
    columns?: ITableColumn[];
    rows?: any[];
    dense?: boolean;
    handleOpenAddDialog?(): void;
    handleOpenFilterDialog?(): void;
    handleOpenSettingsDialog?(): void;
    handleOpenDeleteDialog?(): void;
    handleSelectRows?(selected: string[]): void;
    width?: number;
}
declare const EnhancedTableBody: FC<Props>;
export default EnhancedTableBody;

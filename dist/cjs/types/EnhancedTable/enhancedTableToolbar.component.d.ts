import { FC } from 'react';
interface Props {
    multiSelection?: boolean;
    title?: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(event: any): void;
    handleExport?(type: string): void;
}
declare const EnhancedTableToolbar: FC<Props>;
export default EnhancedTableToolbar;

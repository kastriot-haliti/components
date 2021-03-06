import { FC } from 'react';
interface Props {
    title?: string;
    numSelected: number;
    handleClickAdd?(): void;
    handleClickEdit?(): void;
    handleClickDelete?(): void;
    handleClickFilter?(): void;
    handleClickSettings?(): void;
}
declare const EnhancedTableToolbar: FC<Props>;
export default EnhancedTableToolbar;

import { FC } from 'react';
interface Props {
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
declare const EnhancedTableToolbar2: FC<Props>;
export default EnhancedTableToolbar2;
